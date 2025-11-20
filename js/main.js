document.addEventListener('DOMContentLoaded', () => {
    // Load Data
    loadProfileData();

    // Initialize Animations
    initAnimations();

    // Smooth Scrolling
    initSmoothScroll();

    // Modal Logic
    initModal();
});

function loadProfileData() {
    try {
        // Hero
        document.getElementById('hero-name').textContent = profileData.name;
        document.getElementById('hero-headline').textContent = profileData.headline;

        // About
        document.getElementById('about-text').textContent = profileData.about;

        // Experience
        const experienceList = document.getElementById('experience-list');
        profileData.experience.forEach(exp => {
            const item = document.createElement('div');
            item.className = 'timeline-item';
            item.innerHTML = `
                <span class="timeline-date">${exp.duration}</span>
                <h3>${exp.role}</h3>
                <h4>${exp.company}</h4>
                <p>${exp.location}</p>
                <p>${exp.description}</p>
            `;
            experienceList.appendChild(item);
        });

        // Skills
        const skillsList = document.getElementById('skills-list');
        profileData.skills.forEach(skill => {
            const item = document.createElement('span');
            item.className = 'skill-tag';
            item.textContent = skill;
            skillsList.appendChild(item);
        });

        // Projects
        const projectsList = document.getElementById('projects-list');
        profileData.projects.forEach(project => {
            const item = document.createElement('div');
            item.className = 'project-card';
            item.style.cursor = 'pointer'; // Make it look clickable

            const techStack = project.tech.map(t => `<span class="tech-badge">${t}</span>`).join('');

            item.innerHTML = `
                <div class="project-content">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <div class="project-tech">
                        ${techStack}
                    </div>
                </div>
            `;

            // Add click event to open modal
            item.addEventListener('click', () => openModal(project));

            projectsList.appendChild(item);
        });

        // Contact
        const emailBtn = document.getElementById('contact-email');
        emailBtn.href = `mailto:${profileData.contact.email}`;
        document.getElementById('contact-linkedin').href = profileData.contact.linkedin;

        // Add copy to clipboard functionality for email
        emailBtn.addEventListener('click', (e) => {
            // Optional: prevent default if you ONLY want copy, but usually better to allow both
            // e.preventDefault(); 

            navigator.clipboard.writeText(profileData.contact.email).then(() => {
                const originalText = emailBtn.textContent;
                emailBtn.textContent = "Email Copied!";
                setTimeout(() => {
                    emailBtn.textContent = originalText;
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy email:', err);
            });
        });
    } catch (error) {
        console.error("Error in loadProfileData:", error);
        // Also alert for visibility during manual check if needed, but console is better for subagent
        document.body.setAttribute('data-error', error.message);
    }
}

function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
}

function initSmoothScroll() {
    // Only select links that are internal anchors (start with #) AND are not just "#"
    document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}

function initModal() {
    const modal = document.getElementById('project-modal');
    const closeBtn = document.querySelector('.close-modal');

    closeBtn.addEventListener('click', () => {
        modal.classList.remove('visible');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('visible');
            setTimeout(() => {
                modal.style.display = 'none';
            }, 300);
        }
    });
}

function openModal(project) {
    const modal = document.getElementById('project-modal');
    const title = document.getElementById('modal-title');
    const desc = document.getElementById('modal-description');
    const tech = document.getElementById('modal-tech');

    title.textContent = project.title;
    // Use extended description if available, otherwise standard description
    desc.textContent = project.extendedDescription || project.description;

    tech.innerHTML = project.tech.map(t => `<span class="tech-badge">${t}</span>`).join('');

    modal.style.display = 'flex';
    // Small delay to allow display:flex to apply before adding visible class for transition
    setTimeout(() => {
        modal.classList.add('visible');
    }, 10);
}
