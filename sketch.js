// load images and audio
let heart_img;
let restart_img;
let arrow_img;
let headhit_aud;
let release_aud;
let bodyhit_aud;
let bgtrack;
let power;
function preload() {
  heart_img = loadImage('Images/Heart.png');
  restart_img = loadImage('Images/restart.png');
  arrow_img = loadImage('Images/arrow.png');
  
  release_aud= loadSound('Sounds/release.mp3');
  headhit_aud= loadSound('Sounds/hit.mp3');
  bodyhit_aud= loadSound('Sounds/bodyhit.mp3');
  bgtrack= loadSound('Sounds/bgtrack.mp3');
  power = loadSound('Sounds/power.mp3');
  
  release_aud.setVolume(0.2);
  headhit_aud.setVolume(0.2);
  bodyhit_aud.setVolume(0.2);
  bgtrack.setVolume(0.2);
  power.setVolume(0.2);
}



// setting up global varibales
let screen=0; // screen state : 0 -> start screen, 1 -> game screen, 2 -> end screen 
let main_archer = new archerLeft(16 * 70 - 150, 9 * 70 - 200);  // Player
let enemy_array;  // array for enemy archer objects
let enemy_arrowArray; // general array for all released arrows of enemies
let enemy_pos;  // array containing position numbers of enemies currently present
let positions=[]; // array containing 12 pairs of x and y coordinates representing possible enemy positions
let enemy_appear_delay=150; // will get random values for delay between new enemy appearing
let headshots=0;  // headshot counter
let kills=0;  // kill counter
let score=0; // score counter
let highscore=0;  // highscore counter
let powerup_life=2000;  // time for which powerup appears on screen
let powerup_delay=1000; // time between powerups appearing
let is_powerup=0; // switch
let powerup_pos=0;  //position number of powerup
let pivoty = 0; // will be used for controlling arrow of player
let pivotx = main_archer.pivotx;



// resets all variables when called
function restart(){
  main_archer = new archerLeft(16 * 70 - 150, 9 * 70 - 200);
  
  enemy_array = [new archerRight(positions[12]-250/2,positions[13]+2-152/2)];
  enemy_arrowArray= [new arrow(500,-500)];
  enemy_pos = [7];
  
  pivoty = 0;
  pivotx = main_archer.pivotx;
  
  enemy_appear_delay=150;
  headshots=0;
  kills=0;
  score=0;
  is_powerup=0;
  powerup_life=2000;
  powerup_delay=1000;
  powerup_pos=0;
}



// setup function runs once in beginning
function setup() {
  createCanvas(16 * 70, 9 * 70);
  textFont('Comic Sans MS');

  // filling enemy position coordinates in positions array
  for(let i= 1; i<=3; i++){
    for(let j =1; j<=4; j++){
      positions.push(i*250);
      positions.push(j*152+2);
    }
  }
}



// draw loops over each frame
function draw() {
  background(145, 202, 242);
  if(!bgtrack.isPlaying()){
    bgtrack.play();
  }
  
  
  // Start screen
  if(screen==0){
    push();
    rectMode(CENTER);
    textSize(50);
    fill(255);
    stroke(0);
    strokeWeight(5);
    text("Arrow Man",6.3*70,9*70/3);
    
    image(arrow_img,380,240,400,70);
    
    rect(8*70,9*70*2/3,400,70,200);
    fill(0);
    noStroke();
    textSize(40);
    text("Click to Play",8*70-115,9*70*2/3+15);
    pop();
  }

  // Game screen
  else if(screen==1){
    
    
    // Setting up powerup which appears randomly and heals 1 life

    // if delay is completed and life is not full then make a powerup appear
    if(powerup_delay==0){
      if(main_archer.lives<3){
        is_powerup=1;
        powerup_pos= Math.floor(random(1,4));
        powerup_life =2000;
      }
      powerup_delay=Math.floor(random(5000,10000));
    }
    // draws powerup
    if(is_powerup ==1){
      if(powerup_pos==1){
        image(heart_img,192,142,228/6,118/5);
      }
      else if(powerup_pos==2){
        image(heart_img,192,278,228/6,118/5);
      }
      else if(powerup_pos==3){
        image(heart_img,192,447,228/6,118/5);
      }
    }
    
    
    // if enemy appear delay is completed make a new enemy object and push to enemy array
    if(enemy_appear_delay==0){
      let p = Math.floor(random(1,13)); // generate random position from 1 to 12 for enemy
      let spacefree=1;  // switch for checking if enemy is already present at that position
      for(let i=0; i< enemy_pos.length; i++){
        if(enemy_pos[i]==p){
          spacefree=0;
        }
      }
      if(spacefree==1){
        enemy_pos.push(p);
        enemy_array.push(new archerRight(positions[2*p-2]-250/2,positions[2*p-1]+2-152/2));
        enemy_array[enemy_array.length-1].position=p;
      }
      
      enemy_appear_delay = Math.floor(random(70,150));  // set random delay for next enemy to appear
    }
    

    // if player dies show endscreen
    if(main_archer.lifespan>=0){
      main_archer.show();
    }
    else{
      screen = 2;
    }


    // Iterating through player arrows
    for(let i = main_archer.arrowArray.length - 1; i >= 0; i--){

      // iterating through all enemies to check if arrow hit
      for(let j=0; j<enemy_array.length; j++){
        // checking body hit
        if(main_archer.arrowArray[i].headx<enemy_array[j].pivotx+15 &&
           main_archer.arrowArray[i].headx>enemy_array[j].pivotx-15 &&
           main_archer.arrowArray[i].heady<enemy_array[j].pivoty+55 &&
           main_archer.arrowArray[i].heady>enemy_array[j].pivoty-15)
          {
            if(main_archer.arrowArray[i].is_arrow_hit==0){  // when arrow hits
              main_archer.arrowArray[i].stop(); // stop arrow
              main_archer.arrowArray[i].disappear=1;  // set it to disappear
              enemy_array[j].lives--; // reduce life of enemy by 1
              main_archer.arrowArray[i].is_arrow_hit=1;
              bodyhit_aud.play();
            }
            if(main_archer.arrowArray[i].is_arrow_hit==1){
              // set arrow lifespan to lifespan of enemy so that it doesnt disappears before enemy dies
              main_archer.arrowArray[i].lifespan= enemy_array[j].lifespan-2;  
              }
          } 
        // checking head hit
          if(main_archer.arrowArray[i].headx<enemy_array[j].pivotx+15 &&
             main_archer.arrowArray[i].headx>enemy_array[j].pivotx-15 &&
             main_archer.arrowArray[i].heady<enemy_array[j].pivoty-15 &&
             main_archer.arrowArray[i].heady>enemy_array[j].pivoty-55)
          {
            if(main_archer.arrowArray[i].is_arrow_hit==0){
              main_archer.arrowArray[i].stop();
              main_archer.arrowArray[i].disappear=1;
              enemy_array[j].lives -= 2;  // reduce life by 2 for headshot
              main_archer.arrowArray[i].is_arrow_hit=1;
              headhit_aud.play();
            }     
            if(main_archer.arrowArray[i].is_arrow_hit==1){
              main_archer.arrowArray[i].lifespan= enemy_array[j].lifespan-2;
              }
            enemy_array[j].head_hit=1;
          }

          }
      
      // checking if arrow has hit powerup
      if(is_powerup==1){
        if(powerup_pos==1){
          if(main_archer.arrowArray[i].headx<192+228/6 &&
              main_archer.arrowArray[i].headx>192 &&
              main_archer.arrowArray[i].heady<142+118/5 &&
              main_archer.arrowArray[i].heady>142){
              if(main_archer.lives<3) main_archer.lives++;  // increment life by 1 if powerup is hit
              is_powerup=0;
              power.play();
          }
        }
        else if(powerup_pos==2){
          if(main_archer.arrowArray[i].headx<192+228/6 &&
             main_archer.arrowArray[i].headx>192 &&
             main_archer.arrowArray[i].heady<278+118/5 &&
             main_archer.arrowArray[i].heady>278){
              if(main_archer.lives<3)main_archer.lives++;
              is_powerup=0;
            }
        }
        else if(powerup_pos==3){
          if(main_archer.arrowArray[i].headx<192+228/6 &&
             main_archer.arrowArray[i].headx>192 &&
             main_archer.arrowArray[i].heady<447+118/5 &&
             main_archer.arrowArray[i].heady>447){
              if(main_archer.lives<3)main_archer.lives++;
              is_powerup=0;
            }
        }
      }

      // showing arrows on screen
      main_archer.arrowArray[i].show();

      // stop and set arrows which are out of screen or on ground to disappear after a delay
      if (
        main_archer.arrowArray[i].x < -50 ||  // out of left boundary
        main_archer.arrowArray[i].heady > 9 * 70 - 20 // on ground
      ) {
        main_archer.arrowArray[i].stop();
        main_archer.arrowArray[i].disappear = 1;
      }
      
      // remove arrows whose lifespan is completed
      if (main_archer.arrowArray[i].lifespan <= 0) {
        main_archer.arrowArray.splice(i, 1);
      }
    }
    
    
    
    // Iterating through enemy arrows
    for(let i = enemy_arrowArray.length - 1; i >= 0; i--){

      // checking body hit 
      if(enemy_arrowArray[i].headx<main_archer.pivotx+15 &&
         enemy_arrowArray[i].headx>main_archer.pivotx-15 &&
         enemy_arrowArray[i].heady<main_archer.pivoty+55 &&
         enemy_arrowArray[i].heady>main_archer.pivoty-15){
        if(enemy_arrowArray[i].is_arrow_hit==0){
          enemy_arrowArray[i].stop();
          main_archer.lives-=1;
          enemy_arrowArray[i].is_arrow_hit=1;
          bodyhit_aud.play();
          enemy_arrowArray[i].disappear=1;
        }
      }
      
      // checking head hit
      if(enemy_arrowArray[i].headx<main_archer.pivotx+15 &&
         enemy_arrowArray[i].headx>main_archer.pivotx-15 &&
         enemy_arrowArray[i].heady<main_archer.pivoty-15 &&
         enemy_arrowArray[i].heady>main_archer.pivoty-55){
        if(enemy_arrowArray[i].is_arrow_hit==0){
          enemy_arrowArray[i].stop();
          main_archer.lives-=2;
          enemy_arrowArray[i].is_arrow_hit=1;
          headhit_aud.play();
          enemy_arrowArray[i].disappear=1;
        }
      }

      // showing arrows
      enemy_arrowArray[i].show();

      // stop and set arrows which are out of screen or on ground to disappear after a delay
      if (
        enemy_arrowArray[i].x > 16*70+50 ||
        enemy_arrowArray[i].heady > 9 * 70 - 20
      ) {
        enemy_arrowArray[i].stop();
        enemy_arrowArray[i].disappear = 1;
      }
      if (enemy_arrowArray[i].lifespan < 0) {
        enemy_arrowArray.splice(i, 1);
      }
    }
   
    
    // Iterate through enemy array and update them 
    for(let k = enemy_array.length-1; k>=0; k--){
      enemy_array[k].take_arrow();
      enemy_array[k].load_arrow();
      enemy_array[k].load_angle();
      enemy_array[k].release_arrow();
      enemy_array[k].show();

      // if delay is completed release arrow
      if (enemy_array[k].delay4==0){  
      // copy properties of main arrow of enemy to a new arrow object and push it to general array of enemy arrows
      enemy_arrowArray.push(new arrow(enemy_array[k].main_arrow.x,enemy_array[k].main_arrow.y));
      enemy_arrowArray[enemy_arrowArray.length-1].angle = enemy_array[k].main_arrow.angle;
      enemy_arrowArray[enemy_arrowArray.length-1].release(27);
      }
      
      // remove enemies whose lifespan is 0
      if(enemy_array[k].lifespan<=0){
        kills++;
        if(enemy_array[k].head_hit==1) headshots++;
        for(let i=0; i<enemy_pos.length-1;i++){ //removing position of enemy from pos array
          if(enemy_pos[i]== enemy_array[k].position){
            enemy_pos.splice(i,1);
          }
        }
        enemy_array.splice(k,1);  //removing enemy
      }
    }


    if(main_archer.lives<=0){
      main_archer.disappear=1;
    }
    
    // draw ground
    push();
    fill("black");
    rect(-500, height - 20, width + 1000, 20);
    pop();
    
    // display kills, headshots and score on screen
    push();
    textSize(20);
    text("Kills            :" , 806, 56);
    text(kills, 1024,56);
    text("Headshots  :",806,86);
    text(headshots, 1024,86);
    score = headshots*100+kills*100;
    text("Score         :",806,116);
    text(score, 1024,116);
    pop();
      
    // decrement counters
    enemy_appear_delay--;
    powerup_delay--;
    if(is_powerup){
      powerup_life--;
    }
    if(powerup_life==0){
      is_powerup=0;
    }
      
    }  


  // End screen
  else if(screen==2){
    push();
    rectMode(CENTER);
    textSize(50);
    push();
    fill(255);
    stroke(0);
    strokeWeight(5);
    text("Game Over!",431,114);
    pop();
    
    textSize(40);
    text("Kills             :" , 400, 215);
    text(kills, 674,215);
    text("Headshots   :",400,285);
    text(headshots, 674,285);
    score = headshots*100+kills*100;
    text("Score          :",400,355);
    text(score, 674,355);
    
    if(score>highscore){
      highscore = score;
    }
    text("High Score  :",400,425);
    text(highscore, 674,425);
    
    circle(571,537,100);
    image(restart_img,571-30,537-30,60,60);
    pop();
  }
  

}



// gets called when mouse is clicked
function mousePressed(){
  if(screen==0){
    // Click to play button
    if(mouseX>8*70-200 && mouseX<8*70+200 && mouseY<420+35 && mouseY>420-35 ){
       screen=1;
       restart();
       }
  }
  else if(screen==2){
    // restart button
    if((mouseX-571)*(mouseX-571)+(mouseY-537)*(mouseY-537)<2500){
      screen=0;
    }
  }
}



// Mechanism for shoot arrows using mouse

// gets called each time mouse is dragged
function mouseDragged() {
  // if mouse is dragged when its to the left of player then take arrow
  if (mouseX <= main_archer.pivotx) {
    main_archer.take_arrow();
  }
  // when its dragged to the right load arrow and angle
  else if (mouseX > main_archer.pivotx + 50) {
    if (pivoty == 0) {
      pivoty = mouseY;
    }
    main_archer.load_arrow();
    main_archer.load_angle(
    Math.atan(((mouseY - pivoty) * 1.0) / (mouseX - pivotx))
    );
  }
}

// gets called each time mouse is released
function mouseReleased() {
  // release arrow
  main_archer.release_arrow(27);
  pivoty = 0;
}