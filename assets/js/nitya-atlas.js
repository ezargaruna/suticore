(() => {
  'use strict';
  const top = document.querySelector('[data-atlas-top]');
  const paths = document.querySelector('[data-atlas-paths]');
  const editions = JSON.parse(document.getElementById('nitya-atlas-copy').textContent);
  const pages = 'https://ezargaruna.github.io/suticore/';
  const github = 'https://github.com/ezargaruna/';
  const modules = [
    ['.vault', github + 'SUTI.os/releases/latest'],
    ['.os', 'system/{locale}/SUTI.os/living-system.html'],
    ['.lab', 'system/{locale}/SUTI.lab/living-system.html'],
    ['.uni', 'system/{locale}/SUTI.uni/living-system.html'],
    ['.game', 'system/{locale}/SUTI.game/living-system.html'],
    ['.nitya', '#nitya-90-day-practice'],
    ['.sreteniya', 'app/docs/sreteniya-manifest.md'],
    ['.12dar', 'meta/modules/12_gifts.md'],
    ['.7lum', 'meta/modules/divas_7_lights.md'],
    ['.kolozar', 'meta/modules/kolozar.md'],
    ['.luna', 'meta/lunar.md'],
    ['.astro', 'meta/stellar.md'],
    ['.alcharion', null],
    ['.ignem', null],
    ['.synaura', 'modules/synaura/guide/{locale}.html'],
    ['.syntaxium', 'modules/suti/syntaxium-2026.11.en.html'],
  ];
  const source = github + 'suticore/blob/main/';
  let dateValue = '';

  function el(tag, text, attrs = {}) {
    const node = document.createElement(tag);
    if (text) node.textContent = text;
    for (const [key, value] of Object.entries(attrs)) node.setAttribute(key, value);
    return node;
  }

  function link(label, href, attrs = {}) {
    const a = el('a', label, { href, ...attrs });
    if (window.parent !== window && href.startsWith('https://')) {
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
    }
    return a;
  }

  function disclosure(label, kind, ...content) {
    const details = el('details', '', { 'data-atlas-panel': kind });
    details.append(el('summary', label), ...content);
    return details;
  }

  function cards(records) {
    const list = el('ul', '', { class: 'atlas-cards' });
    for (const [label, prompt] of records) {
      const item = el('li');
      item.append(el('h3', label), el('p', prompt));
      list.append(item);
    }
    return list;
  }

  function render({ language = 'ru', contentLanguage = 'ru', direction = 'ltr' } = {}) {
    const edition = editions[contentLanguage] || editions.ru;
    const locale = ({ 'es-419': 'es', 'zh-Hans': 'zh-hans' })[contentLanguage] || contentLanguage.toLowerCase();
    const guideLocale = language === 'yzh' ? 'yzh' : locale;
    const systemLocale = locale === 'ru' ? '_techne/human/collective-living-system-v1/ru' : locale;
    const open = new Set([...document.querySelectorAll('[data-atlas-panel][open]')].map(x => x.dataset.atlasPanel));
    top.lang = paths.lang = contentLanguage;
    top.dir = paths.dir = direction;
    top.dataset.language = language;
    document.title = 'NITYA · ' + edition.title;
    document.querySelector('meta[name="description"]').content = edition.intro;

    const counter = el('p', '', { id: 'atlas-countdown-status', role: 'status' });
    const date = el('input', '', { type: 'date', id: 'atlas-countdown-date', 'aria-describedby': counter.id });
    date.value = dateValue;
    const count = () => {
      if (!dateValue) {
        counter.textContent = '';
        return;
      }
      const now = new Date();
      const today = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
      const days = Math.round((Date.parse(dateValue) - today) / 86400000);
      counter.textContent = days > 0
        ? edition.countdown + ' · ' + new Intl.NumberFormat(contentLanguage).format(days) + ' ' + edition.days
        : edition.started;
    };
    date.addEventListener('change', () => { dateValue = date.value; count(); });
    count();
    const clearCountdown = el('button', edition.clearCountdown, { type: 'button' });
    clearCountdown.addEventListener('click', () => { dateValue = ''; date.value = ''; count(); date.focus(); });
    const setup = disclosure(edition.personalCount, 'countdown',
      el('label', edition.dateLabel, { for: date.id }), date, clearCountdown, counter);
    const season = disclosure(edition.seasonTitle, 'season', el('p', edition.seasonText));
    const links = el('nav', '', { class: 'atlas-links', 'aria-label': edition.title });
    for (const [name, href, attrs] of [
      ['practice', '#nitya-90-day-practice'], ['care', '#care-questionnaire'],
      ['verenium', pages + 'downloads/Verenium.zip'],
      ['veche', pages + 'system/' + systemLocale + '/SUTI.veche/living-system.html'],
      ['archive', github + 'SUTI.os/releases/latest'],
      ['prices', source + 'docs/commercial-catalog.v1.md', { hreflang: 'en' }],
    ]) links.append(link(edition.nav[name], href, attrs));
    top.replaceChildren(el('p', edition.finist, { class: 'atlas-kicker' }),
      el('h1', edition.title), el('p', edition.intro, { class: 'atlas-lead' }), links,
      el('p', edition.unknownStart), setup, season,
      el('p', language === 'yzh' ? 'язэхъ · показана русская редакция' : edition.review, { class: 'atlas-review' }));
    const quest = el('section', '', { 'aria-labelledby': 'atlas-quest' });
    quest.append(el('h2', edition.questTitle, { id: 'atlas-quest' }), el('p', edition.questIntro));
    const steps = el('ol', '', { class: 'atlas-cards' });
    const follow = el('p');
    for (const [label, prompt] of edition.questSteps) {
      const item = el('li');
      const turn = el('details');
      turn.append(el('summary', label), el('p', prompt));
      item.append(turn);
      steps.append(item);
    }
    follow.append(document.createTextNode(edition.questEnd + ' · '), link(edition.questContinue, '#nitya-90-day-practice'));
    quest.append(steps, follow);
    const audience = disclosure(edition.audienceTitle, 'audience', cards(Object.values(edition.audiences)));
    const geography = disclosure(edition.geographyTitle, 'geography', el('p', edition.geographyNote),
      cards(Object.values(edition.regions)), el('p', edition.tartaryNote));
    const shelf = el('ul', '', { class: 'atlas-modules' });
    for (const [name, ref] of modules) {
      const item = el('li');
      if (!ref) {
        item.append(el('span', name + ' · HOLD', { lang: 'en' }));
      } else {
        const href = ref.startsWith('https:') || ref.startsWith('#') ? ref
          : (ref.endsWith('.md') ? source : pages) + ref.replace('{locale}', ref.includes('/guide/') ? guideLocale : systemLocale);
        const attrs = ref.endsWith('.md') ? { hreflang: ['.luna', '.astro'].includes(name) ? 'en' : 'ru' } : {};
        item.append(link(name, href, attrs));
      }
      shelf.append(item);
    }
    const editionSource = link(edition.sources, source + 'docs/language-layers.md', { hreflang: 'en' });
    paths.replaceChildren(quest, el('p', edition.openNote), audience, geography, disclosure(edition.moduleTitle, 'modules', shelf, editionSource));
    for (const panel of document.querySelectorAll('[data-atlas-panel]')) panel.open = open.has(panel.dataset.atlasPanel);
  }

  window.addEventListener('nitya:language', event => render(event.detail));
})();
