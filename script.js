document.addEventListener('DOMContentLoaded', () => {
    const skillCards = document.querySelectorAll('.skill-card');
    const demoCode = document.getElementById('demoCode');
    const demoContent = document.querySelector('.demo-content');

    let activeSkill = null;
    let typingInterval = null;

    function typeCode(code) {
        let i = 0;
        clearInterval(typingInterval);
        demoCode.textContent = '';
        typingInterval = setInterval(() => {
            if (i < code.length) {
                demoCode.textContent += code.charAt(i);
                i++;
                demoContent.scrollTop = demoContent.scrollHeight;
            } else {
                clearInterval(typingInterval);
            }
        }, 20);
    }

    skillCards.forEach(card => {
        card.addEventListener('click', () => {
            skillCards.forEach(c => c.classList.remove('active'));
            card.classList.add('active');
            activeSkill = card.dataset.skill;
            demoCode.textContent = `# Hover over the code area to see ${activeSkill} in action!`;
        });

        card.addEventListener('mouseenter', () => {
            card.style.transform = `scale(1.1) rotate(${Math.random() * 10 - 5}deg)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'scale(1) rotate(0deg)';
        });
    });

    demoContent.addEventListener('mouseenter', () => {
        if (activeSkill) {
            const code = document.querySelector(`.skill-card[data-skill="${activeSkill}"]`).dataset.code;
            typeCode(code);
        }
    });

    demoContent.addEventListener('mouseleave', () => {
        clearInterval(typingInterval);
        if (activeSkill) {
            demoCode.textContent = `# Hover over the code area to see ${activeSkill} in action!`;
        } else {
            demoCode.textContent = '# Click on a skill and hover here to see the magic!';
        }
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when a nav item is clicked
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            // Get the target element
            const targetId = this.getAttribute('href').substring(1); // Remove the '#' from the href
            const targetElement = document.getElementById(targetId);

            // Check if target element exists before scrolling
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            } else {
                console.warn(`No element found with id: ${targetId}`);
            }
        });
    });

    document.addEventListener('DOMContentLoaded', () => {
        const canvas = document.getElementById('particle-canvas');
        const ctx = canvas.getContext('2d');
        
        // Particle Network Setup
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    
        const particles = [];
        const particleCount = 100;
        const connectionDistance = 100;
    
        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.radius = Math.random() * 3 + 1;
                this.speedX = (Math.random() - 0.5) * 2;
                this.speedY = (Math.random() - 0.5) * 2;
            }
    
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
    
                // Bounce off walls
                if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
                if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
            }
    
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(78, 205, 196, 0.5)';
                ctx.fill();
            }
        }
    
        // Initialize particles
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    
        // Animate particles
        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
    
            // Draw connections
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
    
                    if (distance < connectionDistance) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(78, 205, 196, ${1 - distance / connectionDistance})`;
                        ctx.stroke();
                    }
                }
            }
    
            // Update and draw particles
            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });
    
            requestAnimationFrame(animateParticles);
        }
    
        animateParticles();
    
        // Responsive canvas
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    
        // Typed Text Effect
        const typedTextElement = document.querySelector('.typed-text');
        const text = "Creative Developer";
        let index = 0;
    
        function typeText() {
            if (index < text.length) {
                typedTextElement.textContent += text.charAt(index);
                index++;
                setTimeout(typeText, 150);
            }
        }
    
        typeText();
    });
    // Cursor follower effect
    const cursorFollower = document.querySelector('.cursor-follower');
    document.addEventListener('mousemove', (e) => {
        cursorFollower.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    });

    document.addEventListener('DOMContentLoaded', () => {
        const skillCards = document.querySelectorAll('.skill-card');
        const demoCode = document.getElementById('demoCode');
        const demoContent = document.querySelector('.demo-content');
    
        let activeSkill = null;
        let typingInterval = null;
    
        function typeCode(code) {
            let i = 0;
            clearInterval(typingInterval);
            demoCode.textContent = '';
            typingInterval = setInterval(() => {
                if (i < code.length) {
                    demoCode.textContent += code.charAt(i);
                    i++;
                    demoContent.scrollTop = demoContent.scrollHeight;
                } else {
                    clearInterval(typingInterval);
                }
            }, 20);
        }
    
        skillCards.forEach(card => {
            card.addEventListener('click', () => {
                skillCards.forEach(c => c.classList.remove('active'));
                card.classList.add('active');
                activeSkill = card.dataset.skill;
                demoCode.textContent = `# Hover over the code area to see ${activeSkill} in action!`;
            });
    
            card.addEventListener('mouseenter', () => {
                card.style.transform = `scale(1.1) rotate(${Math.random() * 10 - 5}deg)`;
            });
    
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'scale(1) rotate(0deg)';
            });
        });
    
        demoContent.addEventListener('mouseenter', () => {
            if (activeSkill) {
                const code = document.querySelector(`.skill-card[data-skill="${activeSkill}"]`).dataset.code;
                typeCode(code);
            }
        });
    
        demoContent.addEventListener('mouseleave', () => {
            clearInterval(typingInterval);
            if (activeSkill) {
                demoCode.textContent = `# Hover over the code area to see ${activeSkill} in action!`;
            } else {
                demoCode.textContent = '# Click on a skill and hover here to see the magic!';
            }
        });
    });


    document.addEventListener('DOMContentLoaded', () => {
        const projectItems = document.querySelectorAll('.project-item');
        const projectContents = document.querySelectorAll('.project-content');
    
        function setActiveProject(projectId) {
            projectItems.forEach(item => item.classList.remove('active'));
            projectContents.forEach(content => content.classList.remove('active'));
    
            const activeItem = document.querySelector(`.project-item[data-project="${projectId}"]`);
            const activeContent = document.getElementById(`project-${projectId}`);
    
            activeItem.classList.add('active');
            activeContent.classList.add('active');
        }
    
        projectItems.forEach(item => {
            item.addEventListener('click', () => {
                const projectId = item.getAttribute('data-project');
                setActiveProject(projectId);
            });
        });
    
        // Initialize with the first project active
        setActiveProject('1');
    
        // Add hover effect for project images
        const projectImages = document.querySelectorAll('.project-image');
        projectImages.forEach(image => {
            image.addEventListener('mousemove', (e) => {
                const { left, top, width, height } = image.getBoundingClientRect();
                const x = (e.clientX - left) / width;
                const y = (e.clientY - top) / height;
    
                image.style.transform = `scale(1.1) translate(${x * 10}px, ${y * 10}px)`;
            });
    
            image.addEventListener('mouseleave', () => {
                image.style.transform = 'scale(1) translate(0, 0)';
            });
        });
    
        // Add parallax effect to the background
        const projectsSection = document.querySelector('.projects');
        window.addEventListener('scroll', () => {
            const scrollPosition = window.pageYOffset;
            projectsSection.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
        });
    });

    // Append this at the end of script.js
    document.addEventListener("DOMContentLoaded", () => {
        console.log("DOM fully loaded and parsed");
        const codeDisplay = document.querySelector("#contactSection #codeDisplay");
        const contactForm = document.querySelector("#contactSection #contactForm");
        const compilingScreen = document.querySelector("#contactSection #compilingScreen");
        const container = document.querySelector("#contactSection .container");
    
        const codeLines = [
            "/* Contact Section Code */",
            "form {",
            "  display: flex;",
            "  flex-direction: column;",
            "  gap: 15px;",
            "}",
            "",
            "// Adding input fields...",
            '<label for="name">Name:</label>',
            '<input type="text" id="name" name="name" required>',
            "",
            '<label for="email">Email:</label>',
            '<input type="email" id="email" name="email" required>',
            "",
            '<label for="message">Message:</label>',
            '<textarea id="message" name="message" required></textarea>',
            "",
            "// Adding a submit button...",
            '<button type="submit">Send Message</button>',
        ];
    
        let i = 0; // Line counter for code typing
    
        function typeCode() {
            console.log("Typing code...");
            if (i < codeLines.length) {
                const currentLine = codeLines[i];
                codeDisplay.textContent += currentLine + "\n"; // Append current line
                codeDisplay.scrollTop = codeDisplay.scrollHeight; // Scroll to the bottom
                i++;
                setTimeout(typeCode, 300); // Delay between lines
            } else {
                showCompilingScreen(); // Show compiling screen after typing
            }
        }
    
        function showCompilingScreen() {
            console.log("Showing compiling screen...");
            container.classList.add("blurred"); // Blur the background
            compilingScreen.classList.add("active"); // Show compiling screen
            setTimeout(() => hideCompilingScreen(), 1000); // Hide after 1 second
        }
    
        function hideCompilingScreen() {
            console.log("Hiding compiling screen...");
            compilingScreen.classList.remove("active"); // Hide compiling screen
            container.classList.remove("blurred"); // Remove blur
            codeDisplay.style.display = "none"; // Hide code display
            contactForm.classList.remove("hidden"); // Show the contact form
        }
    
        function initializeCodeAnimation() {
            console.log("Initializing code animation...");
            codeDisplay.style.display = "block"; // Ensure code display is visible
            codeDisplay.textContent = ""; // Clear any existing content
            i = 0; // Reset line counter
            typeCode(); // Start typing animation
        }
    
        initializeCodeAnimation(); // Initialize typing animation
    });
    
    

    

});