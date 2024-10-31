const canvas = document.getElementById('fireworksCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Firework {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.particles = [];
        this.size = Math.random() * 3 + 2;
        this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
        this.exploded = false;
        this.alpha = 1;
    }

    update() {
        if (!this.exploded) {
            this.y -= 5; // Move up
            if (Math.random() < 0.02) this.explode(); // Random chance to explode
        } else {
            for (let particle of this.particles) {
                particle.update();
            }
            this.alpha -= 0.01; // Fade out
        }
    }

    explode() {
        this.exploded = true;
        for (let i = 0; i < 100; i++) {
            this.particles.push(new Particle(this.x, this.y, this.color));
        }
    }

    draw() {
        ctx.globalAlpha = this.alpha;
        if (!this.exploded) {
            ctx.fillStyle = 'white';
            ctx.fillRect(this.x, this.y, this.size, this.size);
        } else {
            for (let particle of this.particles) {
                particle.draw();
            }
        }
        ctx.globalAlpha = 1; // Reset alpha
    }
}

class Particle {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 5 + 2;
        this.color = color;
        this.speed = Math.random() * 4 + 1;
        this.angle = Math.random() * Math.PI * 2;
        this.velX = Math.cos(this.angle) * this.speed;
        this.velY = Math.sin(this.angle) * this.speed;
        this.alpha = 1;
    }

    update() {
        this.x += this.velX;
        this.y += this.velY;
        this.velY += 0.1; // Gravity
        this.alpha -= 0.02; // Fade out
    }

    draw() {
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1; // Reset alpha
    }
}

let fireworks = [];

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let firework of fireworks) {
        firework.update();
        firework.draw();
    }
    fireworks = fireworks.filter(firework => firework.alpha > 0);
    requestAnimationFrame(animate);
}

function createFirework() {
    const x = Math.random() * canvas.width;
    const y = canvas.height;
    fireworks.push(new Firework(x, y));
}

// Increase firework frequency
setInterval(createFirework, 300);
animate();
