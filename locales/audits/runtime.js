(() => {
  "use strict";
  const el = id => document.getElementById(id);
  const root = document.documentElement;
  const editions = JSON.parse(el("audit-locales").textContent);
  const source = root.lang;
  const mirror = "https://ezargaruna.github.io/suticore/";
  const customDomain = new URL(document.baseURI).hostname === "suti.world";
  const practice = el("pick");
  const practiceCards = [...document.querySelectorAll(".mirror-case")];
  let paused = false;
  let renderedCopy;
  const suffixes = {
    en: "", ru: "-ru", "es-419": "-es", "pt-BR": "-pt", fr: "-fr",
    ar: "-ar", "zh-Hans": "-zh-Hans", hi: "-hi", bn: "-bn", eo: "-eo", sa: "-sa", la: "-la",
  };
  const picker = el("audit-language");
  const framed = window !== window.parent;
  const names = {
    ru: "русский", en: "English", "es-419": "español latinoamericano",
    "pt-BR": "português brasileiro", fr: "français", ar: "العربية",
    "zh-Hans": "简体中文", hi: "हिन्दी", bn: "বাংলা", eo: "Esperanto",
    sa: "संस्कृतम्", la: "Latina", yzh: "язэхъ",
  };
  const aliases = { es: "es-419", pt: "pt-BR", "pt-br": "pt-BR", "zh-hans": "zh-Hans", "zh-cn": "zh-Hans" };
  const themes = [...document.querySelectorAll("button[data-theme]")];
  const sizes = [...document.querySelectorAll("button[data-size]")];

  for (const [code, name] of Object.entries(names)) {
    const option = new Option(name, code);
    if (code !== "yzh") option.lang = code;
    option.dir = code === "ar" ? "rtl" : "ltr";
    picker.add(option);
  }

  if (framed) {
    addEventListener("keydown", event => {
      if (event.key === "Escape" && !event.defaultPrevented && document.activeElement !== picker) {
        window.parent.postMessage({type: "suti:audit-dismiss"}, "*");
      }
    });
    el("audit-skip")?.addEventListener("click", event => {
      event.preventDefault();
      el("main").focus();
      el("main").scrollIntoView({block: "start", behavior: "instant"});
    });
  }
  for (const link of document.querySelectorAll("a[href]:not([href^='#'])")) {
    link.dataset.originalHref = link.getAttribute("href");
    if (framed && !link.hasAttribute("download")) {
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      if (link.dataset.auditPage) link.addEventListener("click", event => {
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        event.preventDefault();
        window.parent.postMessage({
          type: "suti:audit-navigate",
          page: link.dataset.auditPage,
          language: picker.value,
        }, "*");
      });
    }
  }

  function applyLanguage() {
    const requested = picker.value;
    const language = requested === "yzh" ? source : requested;
    const copy = editions[language];
    root.lang = language;
    root.dir = language === "ar" ? "rtl" : "ltr";
    root.dataset.languageLayer = requested;
    for (const node of document.querySelectorAll("[data-copy]")) node.textContent = copy[node.dataset.copy];
    for (const name of ["aria-label", "data-label", "content"]) {
      for (const node of document.querySelectorAll("[data-copy-" + name + "]")) {
        node.setAttribute(name, copy[node.getAttribute("data-copy-" + name)]);
      }
    }
    if (framed) window.parent.postMessage({
      type: "suti:audit-title",
      title: document.title,
      language,
    }, "*");
    el("audit-language-label").textContent = copy.language;
    const review = el("audit-review");
    review.lang = requested === "yzh" ? "ru" : language;
    review.dir = requested === "yzh" ? "ltr" : root.dir;
    review.textContent = requested === "yzh"
      ? "язэхъ · авторская редакция ожидается · показан " + (source === "ru" ? "русский" : "английский") + " исходник"
      : copy.review;

    for (const link of document.querySelectorAll("[data-original-href]")) {
      const suffix = suffixes[language];
      const asset = link.hasAttribute("data-openai-archive") || link.hasAttribute("data-clear-water");
      const url = new URL(link.dataset.originalHref, asset && customDomain ? mirror : document.baseURI);
      if (link.hasAttribute("data-openai-archive")) {
        url.pathname = url.pathname.replace(/audit-crystal\.zip$/, "downloads/openai-crystal/" + language + ".zip");
        link.hreflang = language;
      } else if (link.hasAttribute("data-constellation") || link.hasAttribute("data-clear-water")) {
        url.pathname = url.pathname.replace(/\.html$/, suffix + ".html");
        link.hreflang = language;
      } else if (link.hasAttribute("data-localized-destination")) {
        url.searchParams.set("lang", requested);
        if (link.dataset.auditPage) link.hreflang = requested === "yzh" ? "en" : language;
      }
      link.href = url.href;
    }
    renderedCopy = copy;
    if (practice) renderPractice();
  }

  function renderPractice() {
    practiceCards.forEach((card, index) => {
      card.hidden = paused || (practice.value !== "all" && practice.value !== String(index));
    });
    el("rest").textContent = paused ? renderedCopy.returned : renderedCopy.pause;
    el("pausemsg").textContent = paused ? renderedCopy.status : "";
  }

  if (practice) {
    practice.addEventListener("change", () => {
      paused = false;
      renderPractice();
    });
    el("rest").addEventListener("click", () => {
      paused = !paused;
      renderPractice();
    });
  }

  function applyTheme(theme) {
    root.dataset.theme = theme;
    themes.forEach(control => control.setAttribute("aria-pressed", String(control.dataset.theme === theme)));
  }
  themes.forEach(button => button.addEventListener("click", () => applyTheme(button.dataset.theme)));
  sizes.forEach(button => button.addEventListener("click", () => {
    root.style.setProperty("--scale", button.dataset.size);
    sizes.forEach(control => control.setAttribute("aria-pressed", String(control === button)));
  }));
  picker.addEventListener("change", () => {
    applyLanguage();
    if (!framed && location.protocol !== "file:") {
      const url = new URL(location.href);
      url.searchParams.set("lang", picker.value);
      history.replaceState(history.state, "", url);
    }
  });

  const requested = root.dataset.auditLanguage || new URLSearchParams(location.search).get("lang");
  const slug = (requested || "").toLowerCase().replaceAll("_", "-");
  picker.value = aliases[slug] || (Object.hasOwn(names, slug) ? slug : source);
  applyTheme(root.dataset.theme);
  applyLanguage();
})();
