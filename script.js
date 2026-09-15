/*
 * SCRIPT PRINCIPAL — PORTFOLO
 *
 * Le site reste volontairement statique : aucun framework, aucune API payante
 * et aucune étape de compilation ne sont nécessaires. Le fichier orchestre
 * uniquement les interactions de l’interface et lit le catalogue global défini
 * dans projects/projects.js.
 */

/* Préférence système : les animations et le scroll fluide sont désactivés
 * lorsque l’utilisateur demande une réduction des mouvements. */
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ------------------------------
 * Navigation et menu mobile
 * ------------------------------ */
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle && navLinks) {
    const setMenuState = (isOpen) => {
        navLinks.classList.toggle('is-open', isOpen);
        menuToggle.setAttribute('aria-expanded', String(isOpen));
        menuToggle.setAttribute('aria-label', isOpen ? 'Fermer le menu' : 'Ouvrir le menu');
    };

    menuToggle.addEventListener('click', () => {
        setMenuState(!navLinks.classList.contains('is-open'));
    });

    navLinks.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => setMenuState(false));
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') setMenuState(false);
    });
}

/* Tous les liens internes utilisent un scroll cohérent, sans casser les
 * liens standards si la cible n’existe pas. */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
        const target = document.querySelector(anchor.getAttribute('href'));
        if (!target) return;
        event.preventDefault();
        target.scrollIntoView({
            behavior: prefersReducedMotion ? 'auto' : 'smooth',
            block: 'start'
        });
    });
});

/* ------------------------------
 * Catalogue des projets
 * ------------------------------ */
const projectCatalogElement = document.querySelector('#project-catalog');
const projectFilterButtons = document.querySelectorAll('[data-project-filter]');
const catalogData = window.projectCatalog || {};
const projectStatusOrder = ['production', 'development', 'future'];

/* Le catalogue est éditorial : cette protection évite qu’un caractère spécial
 * dans un futur titre soit interprété comme du HTML. */
const escapeHtml = (value = '') => String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');

const projectStatusClass = (statusKey) => `status-${statusKey}`;

const projectCardTemplate = (project, statusKey) => {
    const imageMarkup = project.image
        ? `<img src="${escapeHtml(project.image)}" alt="${escapeHtml(project.imageAlt || `Aperçu du projet ${project.title}`)}" loading="lazy">`
        : `<div class="project-placeholder" role="img" aria-label="Présentation textuelle du projet sans capture publiée"><span>&lt;/&gt;</span><small>Présentation textuelle</small></div>`;
    const externalLink = project.publicUrl
        ? `<a class="project-external-link" href="${escapeHtml(project.publicUrl)}" target="_blank" rel="noopener noreferrer">${escapeHtml(project.publicUrlLabel || 'Voir la démo')} <i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i></a>`
        : '';

    return `
        <article class="project-card ${projectStatusClass(statusKey)}" data-project-id="${escapeHtml(project.id)}" data-project-status="${escapeHtml(statusKey)}">
            <div class="project-card-visual">
                <span class="project-status-badge">${escapeHtml(project.status)}</span>
                ${imageMarkup}
            </div>
            <div class="project-card-body">
                <div class="project-card-meta"><span>${escapeHtml(project.category)}</span><span>${escapeHtml(project.visibility)}</span></div>
                <h3>${escapeHtml(project.title)}</h3>
                <p>${escapeHtml(project.summary)}</p>
                <div class="tag-row">${project.stack.map((tag) => `<span>${escapeHtml(tag)}</span>`).join('')}</div>
                <div class="project-card-actions">
                    <button class="case-link project-open" type="button" data-project-id="${escapeHtml(project.id)}">Voir la fiche <i class="fa-solid fa-arrow-right" aria-hidden="true"></i></button>
                    ${externalLink}
                </div>
            </div>
        </article>`;
};

const emptyStatusTemplate = (statusKey) => {
    const status = catalogData[statusKey];
    return `
        <div class="project-empty-state ${projectStatusClass(statusKey)}">
            <span class="project-empty-icon"><i class="fa-solid fa-plus" aria-hidden="true"></i></span>
            <div><strong>Aucun projet ${escapeHtml(status?.label?.toLowerCase() || '')} n’est publié actuellement.</strong><p>Cette catégorie sera mise à jour lorsqu’une référence publiable sera disponible.</p></div>
        </div>`;
};

const renderProjects = (filter = 'all') => {
    if (!projectCatalogElement) return;

    const statuses = filter === 'all' ? projectStatusOrder : [filter];
    projectCatalogElement.innerHTML = statuses.map((statusKey) => {
        const status = catalogData[statusKey];
        if (!status) return '';
        const cards = status.projects.length
            ? status.projects.map((project) => projectCardTemplate(project, statusKey)).join('')
            : emptyStatusTemplate(statusKey);
        return `<div class="project-status-group" data-status-group="${statusKey}"><div class="project-status-heading"><div><span class="section-kicker">${escapeHtml(status.shortLabel)}</span><h3>${escapeHtml(status.label)}</h3></div><p>${escapeHtml(status.description)}</p></div><div class="project-grid">${cards}</div></div>`;
    }).join('');

    bindProjectButtons();
};

/* Les boutons sont recréés à chaque filtre : les événements sont donc liés
 * après chaque rendu plutôt qu’une seule fois au chargement. */
const bindProjectButtons = () => {
    document.querySelectorAll('.project-open').forEach((button) => {
        button.addEventListener('click', () => openProjectModal(button.dataset.projectId, button));
    });
};

projectFilterButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const filter = button.dataset.projectFilter;
        projectFilterButtons.forEach((item) => {
            const isActive = item === button;
            item.classList.toggle('is-active', isActive);
            item.setAttribute('aria-pressed', String(isActive));
        });
        renderProjects(filter);
    });
});

renderProjects();

/* ------------------------------
 * Modales accessibles
 * ------------------------------ */
const projectModal = document.querySelector('#project-modal');
const projectModalTitle = document.querySelector('#project-modal-title');
const projectModalStatus = document.querySelector('#project-modal-status');
const projectModalSummary = document.querySelector('#project-modal-summary');
const projectModalRole = document.querySelector('#project-modal-role');
const projectModalProof = document.querySelector('#project-modal-proof');
const projectModalStack = document.querySelector('#project-modal-stack');
const projectModalConfidentiality = document.querySelector('#project-modal-confidentiality');
const projectModalLink = document.querySelector('#project-modal-link');
const projectModalClose = document.querySelector('.project-modal-close');
const modal = document.querySelector('#case-modal');
const modalTitle = document.querySelector('#modal-title');
const modalDescription = document.querySelector('#modal-description');
const modalArchitecture = document.querySelector('#modal-architecture');
const modalControl = document.querySelector('#modal-control');
const modalClose = document.querySelector('.modal-close:not(.project-modal-close)');
const demoButtons = document.querySelectorAll('[data-case], .demo-trigger');
let activeModal = null;
let lastModalTrigger = null;
let previousBodyOverflow = '';

const getFocusableElements = (dialog) => [...dialog.querySelectorAll(
    'a[href], area[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
)].filter((element) => element.offsetParent !== null);

const setBackgroundInert = (isInert) => {
    const main = document.querySelector('main');
    const header = document.querySelector('header');
    const footer = document.querySelector('footer');
    [header, main, footer].filter(Boolean).forEach((element) => {
        if ('inert' in element) element.inert = isInert;
        if (isInert) element.setAttribute('aria-hidden', 'true');
        else element.removeAttribute('aria-hidden');
    });
};

const openAccessibleModal = (dialog, trigger = null) => {
    if (!dialog) return;
    if (activeModal && activeModal !== dialog) closeAccessibleModal(activeModal);
    activeModal = dialog;
    lastModalTrigger = trigger;
    previousBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    setBackgroundInert(true);
    dialog.classList.add('is-open');
    dialog.setAttribute('aria-hidden', 'false');
    const firstFocusable = getFocusableElements(dialog)[0];
    (firstFocusable || dialog).focus();
};

const closeAccessibleModal = (dialog = activeModal) => {
    if (!dialog) return;
    dialog.classList.remove('is-open');
    dialog.setAttribute('aria-hidden', 'true');
    if (dialog === activeModal) {
        activeModal = null;
        document.body.style.overflow = previousBodyOverflow;
        setBackgroundInert(false);
        if (lastModalTrigger && document.contains(lastModalTrigger)) lastModalTrigger.focus();
        lastModalTrigger = null;
    }
};

const handleModalKeydown = (event) => {
    if (!activeModal) return;
    if (event.key === 'Escape') {
        event.preventDefault();
        closeAccessibleModal();
        return;
    }
    if (event.key !== 'Tab') return;
    const focusable = getFocusableElements(activeModal);
    if (!focusable.length) {
        event.preventDefault();
        activeModal.focus();
        return;
    }
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
    }
};

document.addEventListener('keydown', handleModalKeydown);

const findProject = (projectId) => projectStatusOrder
    .flatMap((statusKey) => (catalogData[statusKey]?.projects || []).map((project) => ({ project, statusKey })))
    .find(({ project }) => project.id === projectId);

const closeProjectModal = () => closeAccessibleModal(projectModal);

function openProjectModal(projectId, trigger = null) {
    const result = findProject(projectId);
    if (!projectModal || !result) return;
    const { project } = result;
    projectModalTitle.textContent = project.title;
    projectModalStatus.textContent = `${project.status} · ${project.category}`;
    projectModalSummary.textContent = project.summary;
    projectModalRole.textContent = project.role;
    projectModalProof.textContent = project.proof;
    projectModalStack.innerHTML = project.stack.map((tag) => `<span>${escapeHtml(tag)}</span>`).join('');
    projectModalConfidentiality.textContent = `Publication : ${project.confidentiality}`;
    if (project.publicUrl) {
        projectModalLink.hidden = false;
        projectModalLink.href = project.publicUrl;
    } else {
        projectModalLink.hidden = true;
        projectModalLink.removeAttribute('href');
    }
    openAccessibleModal(projectModal, trigger);
}

projectModalClose?.addEventListener('click', closeProjectModal);
projectModal?.querySelectorAll('[data-close-project-modal]').forEach((element) => element.addEventListener('click', closeProjectModal));

const caseStudies = {
    research: {
        title: 'Research Orchestrator',
        description: 'Un workflow de recherche qui transforme une question ouverte en rapport actionnable. Le système découpe le brief, assigne les sous-tâches, confronte les sorties et conserve les traces utiles à la décision.',
        architecture: 'Planner → Research agents → Source checker → Synthesis',
        control: 'Validation humaine avant la synthèse finale'
    },
    inbox: {
        title: 'Inbox Intelligence',
        description: 'Un pipeline de qualification qui extrait les informations importantes, classe la demande et prépare une réponse sans effectuer d’action silencieuse.',
        architecture: 'Classifier → Extractor → Priority scorer → Draft',
        control: 'Aucune réponse externe sans approbation'
    },
    ops: {
        title: 'Ops Copilot',
        description: 'Une interface de pilotage qui expose les étapes, les outils appelés et les points de décision afin que l’équipe puisse comprendre le système et intervenir au bon moment.',
        architecture: 'Intent → Plan → Tools → Trace → Review',
        control: 'Permissions explicites et checkpoint humain'
    }
};

const closeCaseModal = () => closeAccessibleModal(modal);
const openCaseModal = (key, trigger = null) => {
    if (!modal || !caseStudies[key]) return;
    const item = caseStudies[key];
    modalTitle.textContent = item.title;
    modalDescription.textContent = item.description;
    modalArchitecture.textContent = item.architecture;
    modalControl.textContent = item.control;
    openAccessibleModal(modal, trigger);
};

demoButtons.forEach((button) => button.addEventListener('click', () => openCaseModal(button.dataset.case || button.dataset.demo, button)));
modalClose?.addEventListener('click', closeCaseModal);
modal?.querySelectorAll('[data-close-modal]').forEach((element) => element.addEventListener('click', closeCaseModal));

/* ------------------------------
 * Animation d’apparition au défilement
 * ------------------------------ */
const revealItems = document.querySelectorAll('.system-card, .case-card, .project-card, .project-status-group, .method-step, .capability-row, .about-copy, .code-card, .contact-copy, .contact-form');
if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    revealItems.forEach((item) => item.classList.add('reveal-item'));
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -35px' });
    revealItems.forEach((item) => revealObserver.observe(item));
}

/* ------------------------------
 * Formulaire Netlify Forms
 * ------------------------------ */
const contactForm = document.querySelector('.contact-form');
const formStatus = document.querySelector('.form-status');
contactForm?.addEventListener('submit', () => {
    if (formStatus) formStatus.textContent = 'Envoi du message en cours…';
});

/* Marque le footer comme prêt pour faciliter un éventuel contrôle automatisé. */
const currentYear = document.querySelector('.site-footer');
if (currentYear) currentYear.setAttribute('data-ready', 'true');
