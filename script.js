

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

document.addEventListener('DOMContentLoaded', () => {
    const output = document.getElementById('terminal-output');
    const userInput = document.getElementById('terminal-userInput');
    let stage = 0;

    const scenarios = [
        {
            text: [
                "// Welcome to My Interactive Portfolio Terminal",
                "// Press Enter to continue...",
                "console.log('Initializing contact protocol...');"
            ],
            input: true
        },
        {
            text: [
                "// Scanning developer credentials...",
                "const portfolioOwner = {",
                "  name: 'Gautam Chaudhari',",
                "  role: 'Full Stack Developer',",
                "  interests: ['Web Tech', 'AI']",
                "};",
                "",
                "// Would you like to connect? (yes/no)"
            ],
            input: true
        },
        {
            text: [
                "// Preparing contact form...",
                "function initiateConnection() {",
                "  const contactDetails = {"
            ],
            form: [
                { type: 'text', name: 'name', placeholder: 'Your Name', required: true },
                { type: 'email', name: 'email', placeholder: 'Your Email', required: true },
                { type: 'textarea', name: 'message', placeholder: 'Your Message', required: true }
            ]
        }
    ];

    function typeText(lines, callback) {
        let currentLine = 0;

        function typeLine() {
            if (currentLine < lines.length) {
                const line = lines[currentLine];
                let charIndex = 0;

                function typeChar() {
                    if (charIndex < line.length) {
                        output.textContent += line[charIndex];
                        charIndex++;
                        setTimeout(typeChar, 30);
                    } else {
                        output.textContent += '\n';
                        currentLine++;
                        setTimeout(typeLine, 200);
                    }
                }

                typeChar();
            } else if (callback) {
                callback();
            }
        }

        typeLine();
    }

    function renderForm() {
        const currentScenario = scenarios[stage];
        if (currentScenario.form) {
            output.innerHTML += "  // Please fill out the contact form:\n";

            const formContainer = document.createElement('div');
            formContainer.id = 'formContainer';

            currentScenario.form.forEach(field => {
                const inputContainer = document.createElement('div');
                inputContainer.classList.add('input-group');

                const inputElement = document.createElement(
                    field.type === 'textarea' ? 'textarea' : 'input'
                );
                inputElement.type = field.type;
                inputElement.name = field.name;
                inputElement.placeholder = field.placeholder;
                inputElement.classList.add('form-input');
                inputElement.required = field.required;

                const errorMessage = document.createElement('div');
                errorMessage.classList.add('error-message');
                errorMessage.id = `${field.name}-error`;

                inputContainer.appendChild(inputElement);
                inputContainer.appendChild(errorMessage);
                formContainer.appendChild(inputContainer);
            });

            const submitBtn = document.createElement('button');
            submitBtn.textContent = 'Send Message';
            submitBtn.classList.add('submit-btn');
            submitBtn.disabled = true;

            formContainer.appendChild(submitBtn);
            output.appendChild(formContainer);

            // Validation logic
            const inputs = formContainer.querySelectorAll('.form-input');
            const errorMessages = formContainer.querySelectorAll('.error-message');

            function validateInputs() {
                let isValid = true;

                inputs.forEach((input, index) => {
                    const errorMessage = errorMessages[index];
                    if (input.required && input.value.trim() === '') {
                        input.classList.add('error');
                        errorMessage.textContent = '// Error: This field is required';
                        isValid = false;
                    } else if (input.type === 'email') {
                        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                        if (!emailRegex.test(input.value)) {
                            input.classList.add('error');
                            errorMessage.textContent = '// Error: Invalid email format';
                            isValid = false;
                        } else {
                            input.classList.remove('error');
                            errorMessage.textContent = '';
                        }
                    } else {
                        input.classList.remove('error');
                        errorMessage.textContent = '';
                    }
                });

                submitBtn.disabled = !isValid;
                return isValid;
            }

            inputs.forEach(input => {
                input.addEventListener('input', validateInputs);
            });

            submitBtn.addEventListener('click', () => {
                if (validateInputs()) {
                    output.innerHTML += "\n  // Message sent successfully! 🚀\n";
                    output.innerHTML += "  console.log('Thanks for connecting!');\n";
                }
            });
        }
    }

    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const input = userInput.value.trim().toLowerCase();

            switch (stage) {
                case 0:
                    output.textContent += `> ${userInput.value}\n`;
                    stage++;
                    typeText(scenarios[stage].text);
                    break;
                case 1:
                    output.textContent += `> ${userInput.value}\n`;
                    if (['yes', 'y'].includes(input)) {
                        stage++;
                        typeText(scenarios[stage].text, renderForm);
                    } else {
                        output.innerHTML += "// Connection aborted. Goodbye! 👋\n";
                    }
                    break;
                case 2:
                    output.textContent += `> ${userInput.value}\n`;
                    break;
            }

            userInput.value = '';
        }
    });

    // Start the interaction
    typeText(scenarios[stage].text);
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


    

    // Append this at the end of script.js
    
    
    

    

});