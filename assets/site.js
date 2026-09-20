(function () {
  'use strict';
  var toggle = document.querySelector('[data-menu-toggle]');
  var nav = document.querySelector('[data-nav]');
  if (toggle && nav) {
    var closeMenu = function () { toggle.setAttribute('aria-expanded', 'false'); nav.classList.remove('is-open'); };
    toggle.addEventListener('click', function () { var open = toggle.getAttribute('aria-expanded') === 'true'; toggle.setAttribute('aria-expanded', String(!open)); nav.classList.toggle('is-open', !open); if (!open && nav.querySelector('a')) nav.querySelector('a').focus(); });
    document.addEventListener('keydown', function (event) { if (event.key === 'Escape' && nav.classList.contains('is-open')) { closeMenu(); toggle.focus(); } });
    nav.querySelectorAll('a').forEach(function (link) { link.addEventListener('click', closeMenu); });
  }
  var copy = { language: ['LinguaFUSION', 'Языковая практика, персональная траектория и живая речь.', '#directions'], project: ['SUTIspace', 'Язык проекта, карта решений и смысловой интерфейс.', '#directions'], team: ['semantic alignment', 'Различения для команд и автономные решения без лишнего микроменеджмента.', '#directions'], ai: ['SUTIcore', 'Контекст, протоколы и границы для работы человека и ИИ.', 'https://github.com/ezargaruna/suticore'], research: ['SUTIcore library', 'Открытые спецификации, протоколы и исследовательские заметки.', '#library'] };
  var en = document.documentElement.lang === 'en';
  if (en) { copy.language = ['LinguaFUSION', 'Language practice, a personal trajectory and living speech.', '#directions']; copy.project = ['SUTIspace', 'Project language, decision maps and semantic interface.', '#directions']; copy.team = ['semantic alignment', 'Team distinctions and autonomous decisions with less micromanagement.', '#directions']; copy.ai = ['SUTIcore', 'Context, protocols and boundaries for human and AI work.', 'https://github.com/ezargaruna/suticore']; copy.research = ['SUTIcore library', 'Open specifications, protocols and research notes.', '#library']; }
  var buttons = document.querySelectorAll('[data-filter]'); var title = document.querySelector('[data-result-title]'); var text = document.querySelector('[data-result-text]'); var link = document.querySelector('[data-result-link]');
  buttons.forEach(function (button) { button.setAttribute('aria-pressed', button.classList.contains('is-active') ? 'true' : 'false'); });
  buttons.forEach(function (button) { button.addEventListener('click', function () { buttons.forEach(function (item) { item.classList.remove('is-active'); item.setAttribute('aria-pressed', 'false'); }); button.classList.add('is-active'); button.setAttribute('aria-pressed', 'true'); var item = copy[button.getAttribute('data-filter')]; if (!item || !title || !text || !link) return; title.textContent = item[0]; text.textContent = item[1]; link.href = item[2]; }); });
}());
