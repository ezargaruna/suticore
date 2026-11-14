(() => {
  "use strict";
  const root = document.documentElement;
  const {editions, languages} = JSON.parse(document.getElementById("public-editions").textContent);
  const picker = document.querySelector("[data-edition-picker]");
  const review = document.querySelector("[data-edition-review]");
  const label = document.querySelector("[data-edition-label]");
  const embedded = window.parent !== window;
  const aliases = {es: "es-419", pt: "pt-BR", "zh-cn": "zh-Hans"};
  const lang = new URLSearchParams(location.search).get("lang");
  const requested = (root.dataset.editionLanguage || lang || "ru").toLowerCase().replaceAll("_", "-");

  for (const [slug, lang, name] of languages) {
    const code = slug === "yzh" ? slug : lang;
    const option = new Option(name, code);
    option.lang = lang;
    option.dir = lang === "ar" ? "rtl" : "ltr";
    picker.add(option);
    if (requested === slug || requested === code.toLowerCase() || aliases[requested] === code) picker.value = code;
  }

  function apply() {
    const code = picker.value;
    const lang = code === "yzh" ? "ru" : code;
    const words = editions[lang];
    root.lang = lang;
    root.dir = lang === "ar" ? "rtl" : "ltr";
    root.dataset.languageLayer = code;
    for (const node of document.querySelectorAll("[data-copy]")) node.textContent = words[node.dataset.copy];
    for (const name of ["aria-label", "content"]) {
      for (const node of document.querySelectorAll("[data-copy-" + name + "]")) {
        node.setAttribute(name, words[node.getAttribute("data-copy-" + name)]);
      }
    }
    label.textContent = words.language;
    review.textContent = code === "yzh"
      ? "язэхъ · авторская редакция ожидается · показан русский исходник"
      : words.review;
    for (const link of document.querySelectorAll("[data-edition-link]")) {
      const url = new URL(link.getAttribute("href"), document.baseURI);
      url.searchParams.set("lang", code);
      link.href = url.href;
      link.hreflang = lang;
    }
    const guide = document.querySelector("[data-guide-link]");
    if (guide) {
      const slug = languages.find(([slug, tag]) => code === "yzh" ? slug === code : tag === lang)[0];
      guide.href = new URL("modules/synaura/guide/" + slug + ".html", document.baseURI).href;
      guide.hreflang = lang;
    }
    if (embedded) window.parent.postMessage({type:"suti:edition-title", title:document.title, language:lang}, "*");
  }

  function focusSection(id) {
    const section = document.getElementById(id);
    if (!section) return;
    section.focus({preventScroll:true});
    section.scrollIntoView({block:"start", behavior:"instant"});
  }

  if (embedded) {
    for (const link of document.querySelectorAll("a[href]")) {
      const local = link.getAttribute("href");
      if (local.startsWith("#")) {
        link.addEventListener("click", event => {
          event.preventDefault();
          focusSection(local.slice(1));
        });
      } else if (local === "synaura-modules.html") {
        link.addEventListener("click", event => {
          if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
          event.preventDefault();
          window.parent.postMessage({type:"suti:edition-modules", language:picker.value}, "*");
        });
        link.target = "_blank";
        link.rel = "noopener noreferrer";
      } else {
        link.target = "_blank";
        link.rel = "noopener noreferrer";
      }
    }
    addEventListener("keydown", event => {
      if (event.key === "Escape" && !event.defaultPrevented && document.activeElement !== picker) {
        window.parent.postMessage({type:"suti:edition-dismiss"}, "*");
      }
    });
  }

  picker.addEventListener("change", () => {
    apply();
    if (!embedded && location.protocol !== "file:") {
      const url = new URL(location.href);
      url.searchParams.set("lang", picker.value);
      history.replaceState(history.state, "", url);
    }
  });

  apply();
  if (embedded && root.dataset.editionAnchor) focusSection(root.dataset.editionAnchor);
})();
