/**
 * AMIR HAQEM - PERSONAL PORTFOLIO JAVASCRIPT
 * Handles navigation, mobile menu, project modal dialogs, service-to-contact routing,
 * and contact form validation.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // Set current year in footer
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  /* --------------------------------------------------------------------------
     1. Navigation & Scroll Spy
     -------------------------------------------------------------------------- */
  const header = document.getElementById('site-header');
  const menuToggle = document.getElementById('menu-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  const navLinks = document.querySelectorAll('.nav-link');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  const sections = document.querySelectorAll('section[id]');

  // Sticky header on scroll
  const handleScroll = () => {
    if (window.scrollY > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }

    // Scroll Spy for active nav link
    const scrollPos = window.scrollY + 120;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  /* --------------------------------------------------------------------------
     2. Mobile Menu Drawer
     -------------------------------------------------------------------------- */
  const toggleMobileMenu = (forceState) => {
    const isCurrentlyOpen = menuToggle?.classList.contains('open');
    const newState = forceState !== undefined ? forceState : !isCurrentlyOpen;

    if (newState) {
      menuToggle?.classList.add('open');
      mobileNav?.classList.add('open');
      menuToggle?.setAttribute('aria-expanded', 'true');
      mobileNav?.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    } else {
      menuToggle?.classList.remove('open');
      mobileNav?.classList.remove('open');
      menuToggle?.setAttribute('aria-expanded', 'false');
      mobileNav?.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  };

  menuToggle?.addEventListener('click', () => toggleMobileMenu());

  // Close mobile drawer on link click
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => toggleMobileMenu(false));
  });

  // Close mobile drawer on outside click
  document.addEventListener('click', (e) => {
    if (
      mobileNav?.classList.contains('open') &&
      !mobileNav.contains(e.target) &&
      !menuToggle?.contains(e.target)
    ) {
      toggleMobileMenu(false);
    }
  });

  /* --------------------------------------------------------------------------
     3. Project Modals & Detailed Case Studies
     -------------------------------------------------------------------------- */
  const projectData = {
    medicare: {
      tag: 'Academic Project | UiTM | 2026',
      title: 'Medicare Pro — Clinic Management System',
      description: 'An academic, database-driven clinic management web application built with CakePHP to support patient management, appointments, medical records, prescriptions, inventory, payments, and reporting.',
      keyWork: [
        'Designed and refined user interfaces for the clinic management system and contributed to system development, debugging, testing, and functional improvements.',
        'Refined UI/UX, navigation flow, and information organization to improve usability and visual consistency.',
        'Worked with CakePHP controllers, templates, and database interactions during development and troubleshooting.',
        'Tested system modules and collaborated on debugging and functional improvements.'
      ],
      techStack: ['CakePHP', 'PHP', 'MySQL', 'HTML5', 'CSS3', 'JavaScript', 'UI/UX Design', 'Database Modeling'],
      relevance: 'Featured academic web-development project demonstrating MVC architecture, relational database workflows, role-based access, and interface refinement.'
    },
    pantry: {
      tag: 'Capstone Project | UiTM | 2026',
      title: 'XAI Pantry — AI Meal Planner',
      description: 'A client-side capstone web application for pantry tracking and meal planning, with an explainable rule-based recommendation engine that helps users understand each meal suggestion.',
      keyWork: [
        'Implemented pantry and shopping-list workflows with client-side data persistence and CRUD interactions.',
        'Developed the recommendation interface for pantry matching, expiry awareness, preferences, allergies, cuisine, meal type, and cooking-time filtering.',
        'Presented human-readable recommendation explanations to make rule-based scoring factors understandable.',
        'Refined interfaces, tested interactive flows, and contributed to debugging and functional improvements in a collaborative capstone setting.'
      ],
      techStack: ['HTML', 'CSS', 'JavaScript', 'localStorage', 'Rule-Based Recommendation Logic', 'UI/UX Design', 'Responsive Web Design'],
      relevance: 'A strong secondary web-development project demonstrating functional client-side application architecture, explainable recommendation logic, data management, and user-focused interface design.',
      contribution: 'Contributed to web application development, UI/UX implementation, recommendation-interface development, testing, debugging, and functional improvements as part of a collaborative capstone project.'
    },
    stampass: {
      tag: 'Group Academic Project | UiTM | IMS565 | 2025–2026',
      title: 'STAMPASS — Stamp Management & Supply System',
      description: 'An academic system development and project-management project proposing a centralised stamp management and supply system for Jabatan Kastam Diraja Malaysia (JKDM).',
      keyWork: [
        'Supported system design and development activities, translating project requirements into system functionality.',
        'Contributed to tax stamp request and approval workflows, service workflows, and distribution tracking concepts.',
        'Assisted with workflow implementation, system integration, testing, and functional refinement.',
        'Collaborated with the Project Manager and System Analyst throughout the project lifecycle.'
      ],
      techStack: ['System Development', 'Workflow Design', 'System Integration', 'Testing', 'Requirements Implementation', 'Enterprise Information Systems'],
      relevance: 'Demonstrates academic system development, workflow design, requirements implementation, and collaborative project delivery without representing a deployed production system.',
      contribution: 'Contributed as the System Developer by supporting system design and development activities, workflow implementation, integration, testing, and collaborative problem-solving.'
    }
  };

  const modal = document.getElementById('project-modal');
  const modalBody = document.getElementById('modal-dynamic-content');
  const modalCloseBtn = document.getElementById('modal-close-btn');

  const openProjectModal = (projectId) => {
    const data = projectData[projectId];
    if (!data || !modal || !modalBody) return;

    modalBody.innerHTML = `
      <div class="modal-header-tag">${data.tag}</div>
      <h3 class="modal-title">${data.title}</h3>
      
      <div class="modal-section">
        <h4 class="modal-section-title">Overview</h4>
        <p class="modal-text">${data.description}</p>
      </div>

      <div class="modal-section">
        <h4 class="modal-section-title">Key Work & Responsibilities</h4>
        <ul class="modal-list">
          ${data.keyWork.map(item => `<li><i data-lucide="check-circle-2" class="icon-xs"></i> <span>${item}</span></li>`).join('')}
        </ul>
      </div>

      <div class="modal-section">
        <h4 class="modal-section-title">Relevance & Focus</h4>
        <p class="modal-text">${data.relevance}</p>
      </div>

      ${data.contribution ? `
      <div class="modal-section">
        <h4 class="modal-section-title">My Contribution</h4>
        <p class="modal-text">${data.contribution}</p>
      </div>` : ''}

      <div class="modal-section">
        <h4 class="modal-section-title">Technologies & Methods</h4>
        <div class="modal-tech-tags">
          ${data.techStack.map(tech => `<span class="tech-pill">${tech}</span>`).join('')}
        </div>
      </div>

      <div class="modal-actions">
        <a href="#contact" class="btn btn-primary btn-sm modal-contact-btn">
          <span>${projectId === 'medicare' ? 'Contact Me About a Project' : 'Discuss Similar Project'}</span>
          <i data-lucide="message-square" class="icon-xs"></i>
        </a>
      </div>
    `;

    // Refresh icons inside modal
    if (window.lucide) {
      window.lucide.createIcons();
    }

    // Attach contact trigger inside modal
    const modalContactBtn = modalBody.querySelector('.modal-contact-btn');
    modalContactBtn?.addEventListener('click', () => {
      closeProjectModal();
    });

    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeProjectModal = () => {
    if (!modal) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  document.querySelectorAll('.open-modal-btn').forEach(button => {
    button.addEventListener('click', (e) => {
      const projectId = e.currentTarget.getAttribute('data-project');
      if (projectId) {
        openProjectModal(projectId);
      }
    });
  });

  modalCloseBtn?.addEventListener('click', closeProjectModal);

  modal?.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeProjectModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal?.classList.contains('open')) {
      closeProjectModal();
    }
  });

  /* --------------------------------------------------------------------------
     3.1 Medicare Pro Screenshot Gallery Lightbox
     -------------------------------------------------------------------------- */
  const screenshotLightbox = document.getElementById('screenshot-lightbox');
  const screenshotLightboxImage = document.getElementById('screenshot-lightbox-image');
  const screenshotLightboxCaption = document.getElementById('screenshot-lightbox-caption');
  const screenshotLightboxClose = document.getElementById('screenshot-lightbox-close');

  const closeScreenshotLightbox = () => {
    if (!screenshotLightbox) return;
    screenshotLightbox.classList.remove('open');
    screenshotLightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  document.querySelectorAll('.screenshot-preview').forEach(preview => {
    preview.addEventListener('click', () => {
      if (!screenshotLightbox || !screenshotLightboxImage || !screenshotLightboxCaption) return;
      screenshotLightboxImage.src = preview.dataset.screenshot || '';
      screenshotLightboxImage.alt = preview.querySelector('img')?.alt || '';
      screenshotLightboxCaption.textContent = preview.dataset.caption || '';
      screenshotLightbox.classList.add('open');
      screenshotLightbox.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    });
  });

  screenshotLightboxClose?.addEventListener('click', closeScreenshotLightbox);

  screenshotLightbox?.addEventListener('click', (e) => {
    if (e.target === screenshotLightbox) {
      closeScreenshotLightbox();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && screenshotLightbox?.classList.contains('open')) {
      closeScreenshotLightbox();
    }
  });

  /* --------------------------------------------------------------------------
     4. Service Cards to Contact Form Auto-Select
     -------------------------------------------------------------------------- */
  const serviceLinks = document.querySelectorAll('.service-link');
  const serviceSelect = document.getElementById('project-type');
  const messageInput = document.getElementById('project-message');

  serviceLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const requestedService = link.getAttribute('data-service');
      if (requestedService && serviceSelect) {
        // Set select option matching service
        for (let i = 0; i < serviceSelect.options.length; i++) {
          if (serviceSelect.options[i].value.includes(requestedService) || serviceSelect.options[i].text.includes(requestedService)) {
            serviceSelect.selectedIndex = i;
            break;
          }
        }
        // Focus message field
        setTimeout(() => {
          messageInput?.focus();
        }, 500);
      }
    });
  });

  /* --------------------------------------------------------------------------
     5. Contact Form Validation & Feedback
     -------------------------------------------------------------------------- */
  const contactForm = document.getElementById('project-contact-form');
  const nameInput = document.getElementById('client-name');
  const emailInput = document.getElementById('client-email');
  const nameError = document.getElementById('name-error');
  const emailError = document.getElementById('email-error');
  const messageError = document.getElementById('message-error');
  const formSuccess = document.getElementById('form-success');
  const submitBtn = document.getElementById('submit-btn');

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();

    let isValid = true;

    // Validate Name
    if (!nameInput?.value.trim()) {
      nameInput?.classList.add('error');
      nameError?.classList.add('visible');
      isValid = false;
    } else {
      nameInput?.classList.remove('error');
      nameError?.classList.remove('visible');
    }

    // Validate Email
    if (!emailInput?.value.trim() || !isValidEmail(emailInput.value.trim())) {
      emailInput?.classList.add('error');
      emailError?.classList.add('visible');
      isValid = false;
    } else {
      emailInput?.classList.remove('error');
      emailError?.classList.remove('visible');
    }

    // Validate Message
    if (!messageInput?.value.trim()) {
      messageInput?.classList.add('error');
      messageError?.classList.add('visible');
      isValid = false;
    } else {
      messageInput?.classList.remove('error');
      messageError?.classList.remove('visible');
    }

    if (isValid) {
      // Provide positive user feedback
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>Message Prepared!</span>';
      }

      if (formSuccess) {
        formSuccess.style.display = 'flex';
        formSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }

      // Reset form fields after 2 seconds
      setTimeout(() => {
        contactForm.reset();
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = '<span>Send Message to Amir</span><i data-lucide="send" class="icon-sm"></i>';
          if (window.lucide) window.lucide.createIcons();
        }
      }, 3500);
    }
  });

  // Realtime clear validation errors on typing
  [nameInput, emailInput, messageInput].forEach(input => {
    input?.addEventListener('input', () => {
      input.classList.remove('error');
      if (input === nameInput) nameError?.classList.remove('visible');
      if (input === emailInput) emailError?.classList.remove('visible');
      if (input === messageInput) messageError?.classList.remove('visible');
    });
  });
});
