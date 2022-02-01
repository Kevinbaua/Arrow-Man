class arrow{ 
  constructor(x, y){

    // Arrow center coordinates
    this.x = x;
    this.y = y;

    // Arrow angle by default facing right
    this.angle = 0.00;

    // Arrow point coordinates
    this.headx = this.x+ 35*Math.cos(this.angle);
    this.heady = this.y + 35*Math.sin(this.angle);

    // total velocity, its components and gravity
    this.v = 0;
    this.vx = 0;
    this.vy = 0;
    this.g=0;

    this.width = 80;
    this.thickness = 4;
    
    // switches
    this.dirLeft = 0              //is direction of arrow left?
    this.is_arrow_released = 0;  
    this.is_arrow_hit=0; 
    this.disappear = 0;     //set to 1 to start decrementing lifespan and when lifespan becomes 0 remove arrow
    
    // No. of frames after which arrow disappears
    this.lifespan=255;  
  }
  

  // Gets Called when arrow is released from bow to give it v and g
  release(v){
    this.v = v;
    this.vx = this.v * Math.cos(this.angle);
    this.vy = this.v * Math.sin(this.angle);
    this.g = 0.5;
    this.is_arrow_released = 1;
  }
  

  // Gets Called when arrow needs to stop
  stop(){
    this.v=0; this.vx=0; this.vy=0; this.g=0;
    this.is_arrow_released = 0;
  }
  

  // Gets called each frame to display the arrow
  show(){

    // Draws arrow on screen
    push();
    noStroke();
    rectMode(CENTER);
    translate(this.x, this.y);
    rotate(this.angle);
    fill("brown");

    stroke(0,0,0);
    strokeWeight(1);
    rect(0, 0, this.width-30, this.thickness);
    
    fill("gray");
    triangle((this.width-40)/2,8,(this.width-40)/2,-8,this.width/2,0);
    
    fill("white");
    triangle(-(this.width-38)/2,0,(-(this.width-40)/2)-10,8,(-(this.width-40)/2)-10,-8);
    triangle((-(this.width-38)/2)-8,0,(-(this.width-38)/2)-18,8,(-(this.width-40)/2)-18,-8);
    pop();
    
    // updating coordinates and angle
    this.x += this.vx;
    this.y += this.vy;
    this.vy += this.g;

    if(this.is_arrow_released == 1){
        this.angle = Math.atan(this.vy*1.0/this.vx);
        if(this.dirLeft == 1) this.angle += Math.PI;
    }
    
    this.headx = this.x+ 35*Math.cos(this.angle);
    this.heady = this.y + 35*Math.sin(this.angle);
    
    // decrement lifespan if its set to disappear
    if(this.disappear == 1){
      this.lifespan--;
    }
    
  }


}