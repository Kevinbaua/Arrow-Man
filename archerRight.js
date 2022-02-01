// class for enemy archers which are facing right

class archerRight {
  constructor(x, y) {
    // pivot coodinates about which bow and arrow will rotate
    this.pivotx = x;
    this.pivoty = y;

    this.bow_angle = 0;

    // creates main arrow which will be in bow
    this.main_arrow = new arrow(this.pivotx + 30, this.pivoty);

    // makes 4 random numbers between timemin and timemax
    // these will be random delays for enemy to take arrow,load arrow,load angle and release arrow
    this.timemin = 50;
    this.timemax = 150;
    this.rand1 = Math.floor(random(this.timemin, this.timemax));
    this.rand2 = Math.floor(random(this.timemin, this.timemax));
    this.rand3 = Math.floor(random(this.timemin, this.timemax-50));
    this.rand4 = Math.floor(random(this.timemin, this.timemax));
    this.delay1 = this.rand1;
    this.delay2 = this.rand1 + this.rand2;
    this.delay3 = this.rand1 + this.rand2 + this.rand3;
    this.delay4 = this.rand1 + this.rand2 + this.rand3 + this.rand4;

    this.lives= 2;
    this.lifespan=50;

    // switches
    this.is_arrow = 0;
    this.is_arrow_loaded = 0;
    this.disappear=0;
    this.head_hit=0;  // will be used for counting headshots in main sketch
    this.position =0; // will be used for assigning position number on main screen
  }


  // takes arrow in bow if delay time is complete otherwise decrements its delay in each frame its called
  take_arrow() {
    if (this.delay1 == 0) {
      this.main_arrow.x = this.pivotx + 30;
      this.main_arrow.y = this.pivoty;
      this.main_arrow.angle = 0;
      this.is_arrow = true;
    }
    this.delay1--;
  }


  // loads arrow if delay time is complete otherwise decrements its delay in each frame its called
  load_arrow() {
    if (this.delay2 == 0) {
      this.main_arrow.x -= 30;
      this.is_arrow_loaded = true;
    }
    this.delay2--;
  }


  // loads angle if delay time is complete otherwise decrements its delay in each frame its called
  load_angle(angle) {
    if (this.delay3 == 0) {
      this.main_arrow.angle = random(-1* Math.PI / 4, Math.PI / 4);
    }
    this.delay3--;
  }


  // releases arrow if delay time is complete otherwise decrements its delay in each frame its called
  // and resets the delays again for next arrow
  // main sketch will use main_arrow properties here to add aa new arrow to main enemy arrow array
  release_arrow(v) {
    if (this.delay4 == 0) {
      this.is_arrow = false;
      this.is_arrow_loaded = false;
      this.delay1 = this.rand1;
      this.delay2 = this.rand1 + this.rand2;
      this.delay3 = this.rand1 + this.rand2 + this.rand3;
      this.delay4 = this.rand1 + this.rand2 + this.rand3 + this.rand4;
    }
    this.delay4--;
  }
  

  // displays enemy's body, bow, bowstring and main arrow
  // all released enemy arrows will be displayed by main sketch
  show() {
    
    // body
    push();
    fill(0);
    rectMode(CENTER);
    rect(this.pivotx, this.pivoty + 20, 30, 70);
    circle(this.pivotx, this.pivoty - 35, 40);
    pop();
    
    // bow and string
    this.bow_angle = this.main_arrow.angle;
    push();
    translate(this.pivotx,this.pivoty);
    rotate(this.bow_angle);
    fill(255);
    stroke(255);
    if(this.is_arrow_loaded){
      line(-40,0,35/2,60.62/2); //string
      line(-40,0,35/2,-60.62/2);
    }
    else if(this.is_arrow){
      line(-10,0,35/2,60.62/2);
      line(-10,0,35/2,-60.62/2);
    }
    else{
      line(35/2,-60.62/2, 35/2,60.62/2);
    }
    strokeWeight(8);
    stroke(123,69,24);
    noFill();
    arc(  //bow
      0,
      0,
      70,
      70,
      - Math.PI / 3,
      Math.PI / 3
    );
    pop();
    
    // shows main arrow in bow
    if(this.is_arrow || this.is_arrow_loaded){
      this.main_arrow.show();
    }
    
    if(this.lives<=0) this.disappear=1;
    if(this.disappear==1) this.lifespan--;
  }
  
  
}
