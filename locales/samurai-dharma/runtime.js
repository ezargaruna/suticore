(() => {
  "use strict";

  const el = id => document.getElementById(id);
  const root = document.documentElement;
  const editions = JSON.parse(el("samurai-copy").textContent);
  const names = {
    ru: "русский", en: "English", "es-419": "español latinoamericano",
    "pt-BR": "português brasileiro", fr: "français", ar: "العربية",
    "zh-Hans": "简体中文", hi: "हिन्दी", bn: "বাংলা", eo: "Esperanto",
    sa: "संस्कृतम्", la: "Latina", yzh: "язэхъ",
  };
  const aliases = { es: "es-419", pt: "pt-BR", "pt-br": "pt-BR", "zh-hans": "zh-Hans", "zh-cn": "zh-Hans" };
  const picker = el("samurai-language");
  const status = el("copy-status");
  const prompt = el("practice-prompt");
  const framed = window !== window.parent;
  const publicOrigin = "https://ezargaruna.github.io/suticore/";
  let words;

  for (const [code, name] of Object.entries(names)) {
    const option = new Option(name, code);
    if (code !== "yzh") option.lang = code;
    option.dir = code === "ar" ? "rtl" : "ltr";
    picker.add(option);
  }

  if (framed) {
    for (const link of document.querySelectorAll("a[href]")) {
      link.href = new URL(link.getAttribute("href"), publicOrigin).href;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    }
  }

  function applyLanguage() {
    const requested = picker.value;
    const code = requested === "yzh" ? "ru" : requested;
    words = editions[code];
    root.lang = code;
    root.dir = code === "ar" ? "rtl" : "ltr";
    root.dataset.languageLayer = requested;
    document.title = "∴ " + words.t002 + " · SUTI.world";
    document.querySelector("meta[name=description]").content = words.t003;
    for (const node of document.querySelectorAll("[data-copy]")) node.textContent = words[node.dataset.copy];
    el("language-label").textContent = words.language;
    el("language-review").textContent = requested === "yzh" ? "язэхъ · показана русская редакция" : words.review;
    el("game-route").setAttribute("aria-label", words.route);
    el("download-prompt").href = "data:text/markdown;charset=utf-8," +
      encodeURIComponent("# " + words.t204 + "\n\n" + prompt.textContent.trim() + "\n");
    for (const link of document.querySelectorAll("[data-home-link]")) {
      const url = new URL(framed ? "https://suti.world/" : "index.html", document.baseURI);
      url.searchParams.set("lang", requested);
      if (link.dataset.homeLink) url.hash = link.dataset.homeLink;
      link.href = url.href;
    }
    status.textContent = "";
  }

  picker.addEventListener("change", () => {
    applyLanguage();
    if (!framed) {
      const url = new URL(location.href);
      url.searchParams.set("lang", picker.value);
      history.replaceState(history.state, "", url);
    }
  });

  el("copy-prompt").addEventListener("click", async () => {
    const content = prompt.textContent.trim();
    try {
      await navigator.clipboard.writeText(content);
      status.textContent = words.copied;
    } catch {
      const area = document.createElement("textarea");
      area.value = content;
      area.style.position = "fixed";
      area.style.opacity = "0";
      document.body.append(area);
      area.select();
      try {
        status.textContent = document.execCommand("copy") ? words.copied : words.copyFailed;
      } catch {
        status.textContent = words.copyFailed;
      } finally {
        area.remove();
        el("copy-prompt").focus();
      }
    }
  });

  const requested = root.dataset.samuraiLanguage || new URLSearchParams(location.search).get("lang");
  const slug = (requested || "").toLowerCase().replaceAll("_", "-");
  picker.value = aliases[slug] || (Object.hasOwn(names, slug) ? slug : "ru");
  applyLanguage();
})();
