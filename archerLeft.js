// Class for archer of player which is facing to the left

class archerLeft {
  constructor(x, y) {
    // pivot coodinates about which bow and arrow will rotate
    this.pivotx = x;
    this.pivoty = y;

    // Array for all arrow made by player
    this.arrowArray = [];

    // turn arrow to face left
    this.bow_angle = Math.PI;

    // switches for arrow in bow
    this.is_arrow = 0;
    this.is_arrow_loaded = 0;  //loading gets ready for release

    this.main_arrow = null;
    
    this.lives = 3;           

    this.lifespan = 50;
    this.disappear = 0;
    
  }


  // takes arrow in bow if arrow is not already present
  take_arrow() {
    if (this.is_arrow == false) {
      this.arrowArray.push(new arrow(this.pivotx - 30, this.pivoty));  //add new arrow object at end of array
      this.arrowArray[this.arrowArray.length - 1].dirLeft = 1;  //make it face left
      this.arrowArray[this.arrowArray.length - 1].angle = Math.PI;
      this.is_arrow = true;
    }
  }


  // loads arrow if arrow is present but not loaded
  load_arrow() {
    if (this.is_arrow_loaded == false && this.is_arrow == true) {
      this.arrowArray[this.arrowArray.length - 1].x += 30;
      this.is_arrow_loaded = true;
    }
  }

  
  // loads angle if arrow is loaded
  load_angle(angle) {
    if (this.is_arrow_loaded == true) {
      this.arrowArray[this.arrowArray.length - 1].angle = Math.PI + angle;
    }
  }


  // releases loaded arrow
  release_arrow(v) {
    if (this.is_arrow_loaded == true) {
      this.arrowArray[this.arrowArray.length - 1].release(v);
      this.is_arrow = false;
      this.is_arrow_loaded = false;
      release_aud.play();
    }
  }


  // displays player's body, bow and bowstring
  show() {

    // displays body
    push();
    strokeWeight(4);
    fill(255);
    rectMode(CENTER);
    rect(this.pivotx, this.pivoty + 20, 30, 70);
    circle(this.pivotx, this.pivoty - 35, 40);
    pop();

    // displays bow and string
    if (this.is_arrow == true) {
      this.bow_angle = this.arrowArray[this.arrowArray.length - 1].angle;
    }
    push();
    translate(this.pivotx, this.pivoty);
    rotate(this.bow_angle);
    fill(255);
    stroke(0);
    strokeWeight(1);
    if (this.is_arrow_loaded) {
      line(-40, 0, 35 / 2, 60.62 / 2);  //string
      line(-40, 0, 35 / 2, -60.62 / 2);
    } else if (this.is_arrow) {
      line(-10, 0, 35 / 2, 60.62 / 2);
      line(-10, 0, 35 / 2, -60.62 / 2);
    } else {
      line(35 / 2, -60.62 / 2, 35 / 2, 60.62 / 2);
    }
    strokeWeight(8);
    stroke(123, 69, 24);
    noFill();
    arc(    //bow
      0,
      0,
      70,
      70,
      - Math.PI / 3,
      Math.PI / 3
    );
    pop();

    // displays lives below player in hearts
    if (this.lives > 0) {
      image(
        heart_img,
        this.pivotx - (228 * 3) / 6 / 2 - 10,
        this.pivoty + 70,
        228 / 6,
        118 / 5
      );
    }
    if (this.lives > 1) {
      image(
        heart_img,
        this.pivotx - 228 / 6 / 2,
        this.pivoty + 70,
        228 / 6,
        118 / 5
      );
    }
    if (this.lives > 2) {
      image(
        heart_img,
        this.pivotx + 228 / 6 / 2 + 10,
        this.pivoty + 70,
        228 / 6,
        118 / 5
      );
    }
    
    if (this.lives <= 0) this.disappear = 1;
    if (this.disappear == 1) this.lifespan--;
  }


}
