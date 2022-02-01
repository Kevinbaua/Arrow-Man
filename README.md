# Arrow-Man
This is a game called Arrow Man that I made for Game Dev Hackathon 2022 by WnCC and DevCom IITB.

Game Link : https://kevinbaua.github.io/Arrow-Man/  
On p5.js : game - https://editor.p5js.org/KevinBaua/full/3rkjAftFf   
code - https://editor.p5js.org/KevinBaua/sketches/3rkjAftFf

## GamePlay :

The aim of the game is to shoot as many enemies as possible with arrows before they shoot you down and get a high score.  
You have 3 lives and enemies have 2 lives. Each body hit reduces 1 life whereas each Headshot reduces 2 lives. So, a headshot is insta-kill for enemies.  
Each kill gives you 100 points and each headshot give 100 points bonus. So, a kill with headshot gives 200 points.   
Heal powerup will appear randomly on screen, if you shoot it your 1 life is restored.  

In order to shoot click and drag from left side of your archer to right side then aim an angle and release click to shoot arrow.  

Enjoy!  

## About Code :

I wrote this code using the p5.js library only.  
The arrow.js file contains arrow class.  
The archerLeft.js file contains class for player's archer.  
The archerRight.js file contains class fro enemy archers.  
And the sketch.js file contains the main program.  

There are arrays containing players arrows, enemys and enemy arrows.   
In each frame program iterates through all the player's arrows and if hit is detected the arrow is stopped and life of enemy is reduced, if arrow hits powerup then life of player is incremented, if arrow is out of screen its removed from array.  
Similarly it iterates through enemy arrows array.  
Then it iterates through enemy array and if life of any enemy is 0 that enemy is removed from array after some delay and kills,headshots and score counters are updated.  

Rest of the code is implementing mechanisms to make this work.  
