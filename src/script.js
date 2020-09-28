function addCanvas() {
  const canvas = document.getElementById('canvas');

  //In case we're resizing, first remove all the stars
  const previousStars = document.getElementsByClassName('star');
  while (previousStars.length > 0) {
    previousStars[0].parentNode.removeChild(previousStars[0]);
  }

  const canvasWidth = window.innerWidth;
  const canvasHeight = window.innerHeight;

  //Add stars to a small fraction of the canvas
  const canvasSize = canvasWidth * canvasHeight;
  const stars = canvasSize / 2000;
  for (let i = 0; i < stars; i++) {
    //Set up random elements
    let xPos = random(2, canvasWidth - 2);
    let yPos = random(2, canvasHeight - 2);
    let alpha = random(.5, 1);
    let size = random(1, 2);

    if(i == 0){
      console.log(xPos, yPos);
    }

    let star = document.createElement('div');
    star.classList.add('star');
    canvas.appendChild(star);
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
  let fontSize = 80 + difference;

  line1.style.fontSize = fontSize + 'px';
  line2.style.fontSize = fontSize + 'px';
}

addCanvas();
setFontSize();

window.addEventListener('resize', setFontSize);
window.addEventListener('resize', addCanvas);