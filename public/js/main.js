$(document).ready(function() {
  console.log('All systems Go')


//ANIMATION
//http://gamedevelopment.tutsplus.com/tutorials/an-introduction-to-spritesheet-animation--gamedev-13099

const leftPull = document.getElementById('left-pull');
const ctxL = leftPull.getContext('2d');

const rightPull = document.getElementById('right-pull');
const ctxR = rightPull.getContext('2d');
function SpriteSheet(path, frameWidth, frameHeight, frameSpeed, endFrame) {

   var image = new Image();
   var framesPerRow;

   // calculate the number of frames in a row after the image loads
   var self = this;
   image.onload = function() {
      framesPerRow = Math.floor(image.width / frameWidth);
   };

   image.src = path;

   var currentFrame = 0;  // the current frame to draw
  var counter = 0;       // keep track of frame rate

  // Update the animation
  this.update = function() {

    // update to the next frame if it is time
    if (counter == (frameSpeed - 1))
      currentFrame = (currentFrame + 1) % endFrame;

    // update the counter
    counter = (counter + 1) % frameSpeed;
    }

    // Draw the current frame
   this.drawL = function(x, y) {
      // get the row and col of the frame
      var row = Math.floor(currentFrame / framesPerRow);
      var col = Math.floor(currentFrame % framesPerRow);

      ctxL.drawImage(
         image,
         col * frameWidth, row * frameHeight,
         frameWidth, frameHeight,
         x, y,
         frameWidth, frameHeight);
      };


   // Draw the current frame
   this.drawR = function(x, y) {
      // get the row and col of the frame
      var row = Math.floor(currentFrame / framesPerRow);
      var col = Math.floor(currentFrame % framesPerRow);

      ctxR.drawImage(
         image,
         col * frameWidth, row * frameHeight,
         frameWidth, frameHeight,
         x, y,
         frameWidth, frameHeight);
      };

}

var requestAnimFrame = (function(){
    return  window.requestAnimationFrame       ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame    ||
            window.oRequestAnimationFrame      ||
            window.msRequestAnimationFrame     ||
            function(callback, element){
              window.setTimeout(callback, 1000 / 60);
            };
  })();

spritesheetL = new SpriteSheet('../images/horsepull2.png', 625, 600, 4, 12);
spritesheetR = new SpriteSheet('../images/pullingHorse.png', 710, 600, 5, 12);


function animateL() {
   requestAnimFrame( animateL );
   ctxL.clearRect(0, 0, 650, 650);
   spritesheetL.update();
   spritesheetL.drawL(12.5, 12.5);
}

function animateR() {
   requestAnimFrame( animateR );
   ctxR.clearRect(0, 0, 750, 750);
   spritesheetR.update();
   spritesheetR.drawR(12.5, 12.5);
}

animateL();
animateR();
//End File
});
