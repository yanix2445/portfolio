// Texte animé (Typewriter)
const title = document.querySelector('.title');
const text = "🚀 Site en Construction...";
let index = 0;

function typeWriter() {
  if (index < text.length) {
    title.textContent += text[index];
    index++;
    setTimeout(typeWriter, 100);
  }
}
typeWriter();

// Compte à rebours
let countdownValue = 10;
const countdownTimer = document.getElementById('countdown-timer');

const countdown = setInterval(() => {
  countdownValue--;
  countdownTimer.textContent = countdownValue;

  if (countdownValue <= 0) {
    clearInterval(countdown);
    document.querySelector('.subtitle').textContent = "Ça y est, prépare-toi ! 🚀";
  }
}, 1000);

// Particules animées (Canvas)
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particlesArray = [];
const colors = ['#ff00cc', '#3333ff', '#fdbb2d', '#b21f1f'];

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 5 + 1;
    this.speedX = Math.random() * 3 - 1.5;
    this.speedY = Math.random() * 3 - 1.5;
    this.color = colors[Math.floor(Math.random() * colors.length)];
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.size > 0.2) this.size -= 0.1;
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function init() {
  for (let i = 0; i < 100; i++) {
    particlesArray.push(new Particle());
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particlesArray.forEach((particle, index) => {
    if (particle.size <= 0.2) particlesArray.splice(index, 1);
    particle.update();
    particle.draw();
  });
  requestAnimationFrame(animate);
}

init();
animate();
