let portfolioData;

fetch('assets/data.json')
  .then(response => {
    if (!response.ok) throw new Error('Failed to load JSON');
    return response.json();
  })
  .then(data => {
    portfolioData = data;
    console.log('Portfolio Data Loaded:', portfolioData);

    loadSkills();
    loadFeatured();
    loadProjects();
  })
  .catch(error => console.error('Error loading portfolio data:', error));

// load skills
function loadSkills() {
  const skillsContainer = document.getElementById('skills-container');
  if (!portfolioData?.skills) return;

  const fragment = document.createDocumentFragment();

  portfolioData.skills.forEach(skill => {
    const skillItem = document.createElement('div');
    skillItem.className = 'skill__item';
    skillItem.innerHTML = `
      <img src="${skill.image}" alt="${skill.name}">
      <span class="skill__name">${skill.name}</span>
    `;
    fragment.appendChild(skillItem);
  });

  skillsContainer.appendChild(fragment);
}

//load featured
function loadFeatured() {
  const featuredContainer = document.getElementById('featured-container');
  if (!portfolioData?.featured) return;

  const fragment = document.createDocumentFragment();
  Object.entries(portfolioData.featured).forEach(([key, item]) => {
    const card = document.createElement('div');
    card.className = 'featured__card';
    card.innerHTML = `
      <div class="featured__icon">
        <img src="${item.image}" alt="${key}">
      </div>
      <h3 class="featured__title">${key}</h3>
      <p class="featured__description">${item.description}</p>
      <a href="${item.link}" target="_blank" class="button featured__link">Visit ${key}</a>
    `;
    fragment.appendChild(card);
  });
  featuredContainer.appendChild(fragment);
}

//load projects
function loadProjects() {
  const projectsContainer = document.getElementById('projects-container');
  if (!portfolioData?.projects) return;

  const fragment = document.createDocumentFragment();
  portfolioData.projects.forEach(project => {
    const card = document.createElement('div');
    card.className = 'project__card';
    card.innerHTML = `
      <img src="${project.image}" alt="${project.title}" class="project__image">
      <div class="project__content">
        <h3 class="project__title">${project.title}</h3>
        <p class="project__description">${project.description}</p>
        <a href="${project.link}" target="_blank" class="project__link">
          View Project <i class="ri-arrow-right-line"></i>
        </a>
      </div>
    `;
    fragment.appendChild(card);
  });
  projectsContainer.appendChild(fragment);
}

const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');

if (navToggle) {
  navToggle.addEventListener('click', () => navMenu.classList.add('show-menu'));
}
if (navClose) {
  navClose.addEventListener('click', () => navMenu.classList.remove('show-menu'));
}

document.querySelectorAll('.nav__link').forEach(link =>
  link.addEventListener('click', () => navMenu.classList.remove('show-menu'))
);

// contact Form
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const subject = document.getElementById('subject').value;
  const message = document.getElementById('message').value;

  // Construct the Gmail compose URL
  const gmailURL = `https://mail.google.com/mail/?view=cm&fs=1&to=mhrushikesh0105@gmail.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\n\n${message}`
  )}`;

  // Open Gmail compose in a new tab
  window.open(gmailURL, '_blank');
});
