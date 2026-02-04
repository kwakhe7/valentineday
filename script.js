document.addEventListener('DOMContentLoaded', () => {
    const yesBtn = document.getElementById('yes-btn');
    const noBtn = document.getElementById('no-btn');
    const questionContainer = document.getElementById('question-container');
    const successContainer = document.getElementById('success-container');
    const confettiCanvas = document.getElementById('confetti-canvas');

    // YES Button Click Event
    yesBtn.addEventListener('click', () => {
        questionContainer.classList.add('hidden');
        successContainer.classList.remove('hidden');
        startConfetti();
    });

    // NO Button Hover Event (Desktop)
    noBtn.addEventListener('mouseover', moveButton);
    
    // NO Button Touch Event (Mobile) - optional but good for mobile users trying to tap it
    noBtn.addEventListener('touchstart', (e) => {
        e.preventDefault(); // Prevent clicking
        moveButton();
    });

    function moveButton() {
        // Get the viewport dimensions
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const btnRect = noBtn.getBoundingClientRect();

        // Calculate max allowed positions
        const maxX = viewportWidth - btnRect.width;
        const maxY = viewportHeight - btnRect.height;

        // Generate random positions
        const randomX = Math.floor(Math.random() * maxX);
        const randomY = Math.floor(Math.random() * maxY);

        // Apply new position
        noBtn.style.position = 'fixed'; // Use fixed to position relative to viewport
        noBtn.style.left = randomX + 'px';
        noBtn.style.top = randomY + 'px';
        
        // Ensure it stays on top
        noBtn.style.zIndex = '1000';
    }

    // Confetti Effect
    function startConfetti() {
        const ctx = confettiCanvas.getContext('2d');
        confettiCanvas.width = window.innerWidth;
        confettiCanvas.height = window.innerHeight;

        const particles = [];
        const particleCount = 150;
        const colors = ['#ff4d6d', '#ff9a9e', '#d63384', '#ffffff', '#ffd700'];

        class Particle {
            constructor() {
                this.x = Math.random() * confettiCanvas.width;
                this.y = Math.random() * confettiCanvas.height - confettiCanvas.height;
                this.size = Math.random() * 10 + 5;
                this.color = colors[Math.floor(Math.random() * colors.length)];
                this.speedY = Math.random() * 3 + 2;
                this.speedX = Math.random() * 2 - 1;
                this.rotation = Math.random() * 360;
                this.rotationSpeed = Math.random() * 2 - 1;
            }

            update() {
                this.y += this.speedY;
                this.x += this.speedX;
                this.rotation += this.rotationSpeed;

                if (this.y > confettiCanvas.height) {
                    this.y = -10;
                    this.x = Math.random() * confettiCanvas.width;
                }
            }

            draw() {
                ctx.save();
                ctx.translate(this.x, this.y);
                ctx.rotate(this.rotation * Math.PI / 180);
                ctx.fillStyle = this.color;
                ctx.fillRect(0, 0, this.size, this.size);
                ctx.restore();
            }
        }

        function init() {
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        }

        function animate() {
            ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            requestAnimationFrame(animate);
        }

        init();
        animate();

        // Resize canvas on window resize
        window.addEventListener('resize', () => {
            confettiCanvas.width = window.innerWidth;
            confettiCanvas.height = window.innerHeight;
        });
    }
});
