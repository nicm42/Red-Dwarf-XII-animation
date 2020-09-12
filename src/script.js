//Set up canvas
const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext("2d");
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

//Add stars to a small fraction of the canvas
const canvasSize = window.innerWidth * window.innerHeight;
const stars = canvasSize / 1000;
console.log(stars);

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

function random(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
