const canvas = document.getElementById('stars');
const ctx = canvas.getContext('2d');
let w = window.innerWidth;
let h = window.innerHeight;
canvas.width = w;
canvas.height = h;

function randomStar() {
  return {
    x: Math.random() * w,
    y: Math.random() * h,
    r: Math.random() * 1.5 + 0.5,
    speed: Math.random() * 0.5 + 0.2,
    angle: Math.random() * Math.PI * 2
  };
}

let stars = Array.from({length: 120}, randomStar);

function drawStars() {
  ctx.clearRect(0, 0, w, h);
  for (let star of stars) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
    ctx.fillStyle = 'white';
    ctx.shadowColor = '#fff';
    ctx.shadowBlur = 8;
    ctx.globalAlpha = 0.8;
    ctx.fill();
    ctx.restore();
  }
}

function moveStars() {
  for (let star of stars) {
    star.x += Math.cos(star.angle) * star.speed;
    star.y += Math.sin(star.angle) * star.speed;
    if (star.x < 0 || star.x > w || star.y < 0 || star.y > h) {
      Object.assign(star, randomStar());
    }
  }
}

function animate() {
  moveStars();
  drawStars();
  requestAnimationFrame(animate);
}

window.addEventListener('resize', () => {
  w = window.innerWidth;
  h = window.innerHeight;
  canvas.width = w;
  canvas.height = h;
  stars = Array.from({length: 120}, randomStar);
});

animate();
