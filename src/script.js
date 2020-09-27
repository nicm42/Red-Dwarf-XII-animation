function addCanvas() {
  //Set up canvas
  const canvas = document.querySelector('#canvas');
  const ctx = canvas.getContext("2d");
  ctx.canvas.width = window.innerWidth;
  ctx.canvas.height = window.innerHeight;

  //Add stars to a small fraction of the canvas
  const canvasSize = ctx.canvas.width * ctx.canvas.height;
  const stars = canvasSize / 1000;

  for(let i = 0; i < stars; i++) {
    //Set up random elements
    let xPos = random(2, canvas.width - 2);
    let yPos = random(2, canvas.height - 2);
    let alpha = random(.5, 1);
    let size = random(1, 2);

    //Add stars
    ctx.fillStyle = '#ffffff';
    ctx.globalAlpha = alpha;
    ctx.fillRect(xPos, yPos, size, size);
  }

  //Set up inner canvas to go on black ellipse
  const innerCanvas = document.querySelector('#inner-canvas');
  const ctxInner = innerCanvas.getContext("2d");
  const positionInfo = document.querySelector('.ellipse-black')
  //Take a bit off to make sure none of the stars go on the red ellipse
  ctxInner.canvas.width = positionInfo.offsetWidth - 50;
  ctxInner.canvas.height = positionInfo.offsetHeight - 50;

  //Add stars to a small fraction of the canvas
  const innerCanvasSize = ctxInner.canvas.width * ctxInner.canvas.height;
  const innerStars = innerCanvasSize / 1000;

  for (let j = 0; j < innerStars; j++) {
    //Set up random elements
    let xPosInner = random(2, innerCanvas.width - 2);
    let yPosInner = random(2, innerCanvas.height - 2);
    let alphaInner = random(.5, 1);
    let sizeInner = random(1, 2);

    //Add stars
    ctxInner.fillStyle = '#ffffff';
    ctxInner.globalAlpha = alphaInner;
    ctxInner.fillRect(xPosInner, yPosInner, sizeInner, sizeInner);
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
  let fontSize = 80 + difference;

  line1.style.fontSize = fontSize + 'px';
  line2.style.fontSize = fontSize + 'px';
}

addCanvas();
setFontSize();

window.addEventListener('resize', setFontSize);