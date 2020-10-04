//Only play animations once everything has loaded
//From https://css-tricks.com/making-animations-wait/
document.body.classList.add('js-loading');
window.addEventListener('load', playAnimations);

function playAnimations() {
  document.body.classList.remove('js-loading'); 
}

function addCanvas() {
  const canvas = document.getElementById('canvas');
  const canvasWidth = window.innerWidth;
  const canvasHeight = window.innerHeight;

  //In case we're resizing, first remove all the stars
  removeStars();

  addStars(canvas, canvasWidth, canvasHeight);
}

function addEllipseCanvas() {
  const ellipseCanvas = document.getElementById('inner-canvas');
  const positionInfo = document.querySelector('.ellipse-black')
  //Take a bit off to make sure none of the stars go on the red ellipse
  const ellipseCanvasWidth = positionInfo.offsetWidth - 50;
  const ellipseCanvasHeight = positionInfo.offsetHeight - 50;

  addStars(ellipseCanvas, ellipseCanvasWidth, ellipseCanvasHeight);
}

function removeStars() {
  const previousStars = document.getElementsByClassName('star');
  while (previousStars.length > 0) {
    previousStars[0].parentNode.removeChild(previousStars[0]);
  }
}

function addStars(parentDiv, canvasWidth, canvasHeight) {
  //Add stars to a small fraction of the canvas
  const canvasSize = canvasWidth * canvasHeight;
  const stars = canvasSize / 2000;
  for (let i = 0; i < stars; i++) {
    //Set up random elements
    let xPos = random(2, canvasWidth - 2);
    let yPos = random(2, canvasHeight - 2);
    let alpha = random(.5, 1);
    let size = random(1, 2);

    let star = document.createElement('div');
    star.classList.add('star');
    parentDiv.appendChild(star);
    star.style.backgroundColor = '#ffffff';
    star.style.opacity = alpha;
    star.style.top = yPos + 'px';
    star.style.left = xPos + 'px';
    star.style.width = size + 'px';
    star.style.height = size + 'px';
  }

}

function random(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function setFontSize() {
  /* Setting up font size for text */
  //Every 100px the size of main goes up, we want to go up by 20px
  //So we want to know how many multiples of 5px main is from 425px
  //Then adjust font size by that much
  const main = document.querySelector('main');
  const mainWidth = main.offsetWidth;
  const line1 = document.querySelector('.line1');
  const line2 = document.querySelector('.line2');

  let difference = (mainWidth - 425) / 5;
  let fontSize = 75 + difference;

  line1.style.fontSize = fontSize + 'px';
  line2.style.fontSize = fontSize + 'px';
}

addCanvas();
addEllipseCanvas();
setFontSize();

window.addEventListener('resize', addCanvas);
window.addEventListener('resize', addEllipseCanvas);
window.addEventListener('resize', setFontSize);
