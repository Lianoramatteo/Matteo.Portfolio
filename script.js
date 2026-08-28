console.log('Portfolio loaded');

document.addEventListener('DOMContentLoaded', () => {

    const revealEls = document.querySelectorAll('.reveal');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduceMotion || !('IntersectionObserver' in window)) {
        revealEls.forEach(el => el.classList.add('in-view'));
    } else {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

        revealEls.forEach(el => revealObserver.observe(el));
    }

    const glow = document.getElementById('bgGlow');
    if (glow && !reduceMotion && window.matchMedia('(pointer: fine)').matches) {
        window.addEventListener('mousemove', (e) => {
            glow.style.left = e.clientX + 'px';
            glow.style.top = e.clientY + 'px';
        });
    }

    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            const isOpen = navLinks.classList.toggle('open');
            navToggle.classList.toggle('open', isOpen);
            navToggle.setAttribute('aria-expanded', String(isOpen));
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('open');
                navToggle.classList.remove('open');
                navToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    const sections = document.querySelectorAll('section[id], header[id]');
    const navAnchors = document.querySelectorAll('.nav-links a[data-nav]');

    if (sections.length && navAnchors.length && 'IntersectionObserver' in window) {
        const navObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    navAnchors.forEach(a => {
                        a.classList.toggle('active', a.getAttribute('href') === `#${id}`);
                    });
                }
            });
        }, { threshold: 0.4 });

        sections.forEach(sec => navObserver.observe(sec));
    }

    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxClose = document.getElementById('lightboxClose');

    function openLightbox(imgEl) {
        if (!lightbox || !lightboxImg || !imgEl) return;
        lightboxImg.src = imgEl.src;
        lightboxImg.alt = imgEl.alt;
        lightbox.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        if (!lightbox) return;
        lightbox.classList.remove('open');
        document.body.style.overflow = '';
    }

    document.getElementById('openProfileLightbox')?.addEventListener('click', function () {
        openLightbox(this.querySelector('img'));
    });

    document.getElementById('openAboutLightbox')?.addEventListener('click', function () {
        openLightbox(this.querySelector('img'));
    });

    lightboxClose?.addEventListener('click', closeLightbox);
    lightbox?.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    const skillDetails = {
        'teamwork': {
            icon: 'fa-people-group',
            title: 'Teamwork and Collaboration',
            desc: 'Comfortable working in group projects and design sprints — dividing tasks, giving and receiving feedback, and keeping everyone aligned toward one goal.'
        },
        'communication': {
            icon: 'fa-comments',
            title: 'Communication',
            desc: 'Able to explain design decisions clearly to both technical and non-technical people, present work confidently, and listen to feedback without getting defensive about it.'
        },
        'critical-thinking': {
            icon: 'fa-lightbulb',
            title: 'Critical Thinking',
            desc: 'Breaks problems down before jumping to a solution — questioning assumptions, weighing trade-offs, and choosing the option that actually fits the user\'s need.'
        },
        'ui-ux': {
            icon: 'fa-pen-ruler',
            title: 'UI/UX Design',
            desc: 'Designs clean, user-friendly interfaces in Figma — from wireframes and prototypes to polished mockups, with attention to spacing, hierarchy, and usability.'
        },
        'system-analyst': {
            icon: 'fa-diagram-project',
            title: 'System Analyst',
            desc: 'Studies how a system should work end-to-end — mapping requirements, spotting gaps, and translating them into a structure developers and designers can build from.'
        }
    };

    const skillModal = document.getElementById('skillModal');
    const skillModalTitle = document.getElementById('skillModalTitle');
    const skillModalDesc = document.getElementById('skillModalDesc');
    const skillModalIcon = document.getElementById('skillModalIcon');
    const skillModalClose = document.getElementById('skillModalClose');

    function openSkillModal(key) {
        const data = skillDetails[key];
        if (!data || !skillModal) return;
        skillModalTitle.textContent = data.title;
        skillModalDesc.textContent = data.desc;
        skillModalIcon.innerHTML = `<i class="fas ${data.icon}"></i>`;
        skillModal.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function closeSkillModal() {
        if (!skillModal) return;
        skillModal.classList.remove('open');
        document.body.style.overflow = '';
    }

    document.querySelectorAll('.skill-card').forEach(card => {
        card.addEventListener('click', () => openSkillModal(card.dataset.skill));
    });

    skillModalClose?.addEventListener('click', closeSkillModal);
    skillModal?.addEventListener('click', (e) => {
        if (e.target === skillModal) closeSkillModal();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeLightbox();
            closeSkillModal();
        }
    });

    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            backToTop.classList.toggle('visible', window.scrollY > 500);
        });
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
        });
    }

    const mainNav = document.getElementById('mainNav');
    if (mainNav) {
        window.addEventListener('scroll', () => {
            mainNav.style.padding = window.scrollY > 40 ? '10px 8%' : '16px 8%';
        });
    }

});
