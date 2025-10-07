// Create confetti animation
        function createConfetti() {
            const container = document.getElementById('confetti-container');
            const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
            
            for (let i = 0; i < 100; i++) {
                const confetti = document.createElement('div');
                confetti.className = 'confetti';
                confetti.style.left = Math.random() * 100 + 'vw';
                confetti.style.animationDelay = Math.random() * 5 + 's';
                confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.width = Math.random() * 10 + 5 + 'px';
                confetti.style.height = confetti.style.width;
                container.appendChild(confetti);
            }
        }
        
        // Function to simulate going back to home
        function goHome() {
          window.location.href = '../menu.html';
        }
        
        // Initialize confetti when page loads
        window.onload = createConfetti;