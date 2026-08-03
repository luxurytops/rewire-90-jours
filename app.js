const menuButton = document.querySelector('.menu-toggle');
const menu = document.querySelector('.nav-links');

function closeMenu() {
  menuButton?.setAttribute('aria-expanded', 'false');
  menu?.classList.remove('open');
  document.body.classList.remove('menu-open');
}

menuButton?.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!open));
  menu.classList.toggle('open', !open);
  document.body.classList.toggle('menu-open', !open);
});
menu?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeMenu(); });

const reveals = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
    if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
  }), { threshold: 0.12 });
  reveals.forEach((item) => observer.observe(item));
} else {
  reveals.forEach((item) => item.classList.add('visible'));
}

const quiz = document.querySelector('#quiz');
const result = document.querySelector('#quiz-result');
const progressBar = document.querySelector('#progress-bar');
const progressLabel = document.querySelector('#progress-label');
const error = document.querySelector('#quiz-error');

function updateProgress() {
  const answered = quiz?.querySelectorAll('input:checked').length || 0;
  if (progressLabel) progressLabel.textContent = `${answered} / 6`;
  if (progressBar) progressBar.style.width = `${answered / 6 * 100}%`;
}
quiz?.addEventListener('change', updateProgress);
quiz?.addEventListener('submit', (event) => {
  event.preventDefault();
  const answers = [...quiz.querySelectorAll('input:checked')];
  if (answers.length < 6) {
    error.textContent = 'Répondez aux 6 affirmations pour afficher votre résultat.';
    const firstMissing = [...quiz.querySelectorAll('fieldset')].find((field) => !field.querySelector('input:checked'));
    firstMissing?.querySelector('input')?.focus();
    return;
  }
  error.textContent = '';
  const score = answers.reduce((sum, answer) => sum + Number(answer.value), 0);
  let title; let copy;
  if (score <= 3) {
    title = 'Votre dynamique est déjà engagée';
    copy = 'Vos réponses indiquent que vous passez plutôt facilement de l’intention à l’action. Votre enjeu peut être de consolider cette régularité et de rendre vos progrès plus visibles.';
  } else if (score <= 8) {
    title = 'Un schéma mérite d’être clarifié';
    copy = 'Vous avancez, mais certains freins semblent encore ralentir ou interrompre votre mouvement. Les identifier précisément peut vous aider à choisir une nouvelle réponse concrète.';
  } else {
    title = 'Le passage à l’action demande un nouveau cadre';
    copy = 'Plusieurs automatismes semblent peser sur vos décisions et votre régularité. Une démarche progressive, fondée sur l’expérimentation et la répétition, pourrait vous aider à créer des preuves de changement.';
  }
  result.innerHTML = `<p class="eyebrow">Votre résultat indicatif</p><p class="result-score">${score}<small>/12</small></p><h3>${title}</h3><p>${copy}</p><p><strong>Votre première piste :</strong> choisissez une action assez petite pour être réalisée dans les prochaines 24 heures, puis notez la preuve qu’elle a bien été accomplie.</p><a class="button button-gold" href="mailto:contact@deep-performance.com?subject=Mon%20diagnostic%20REWIRE%20-%20score%20${score}%2F12">Manifester mon intérêt →</a><br><button class="text-link dark" type="button" id="restart-quiz">Recommencer</button>`;
  quiz.hidden = true;
  result.hidden = false;
  result.focus();
  document.querySelector('#restart-quiz')?.addEventListener('click', () => {
    quiz.reset(); updateProgress(); result.hidden = true; quiz.hidden = false; quiz.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
});
