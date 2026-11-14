(() => {
  "use strict";

  const el = id => document.getElementById(id);
  const root = document.documentElement;
  const editions = JSON.parse(el("map-copy").textContent);
  const names = {
    ru: "русский", en: "English", "es-419": "español latinoamericano",
    "pt-BR": "português brasileiro", fr: "français", ar: "العربية",
    "zh-Hans": "简体中文", hi: "हिन्दी", bn: "বাংলা", eo: "Esperanto",
    sa: "संस्कृतम्", la: "Latina", yzh: "язэхъ",
  };
  const aliases = { es: "es-419", pt: "pt-BR", "pt-br": "pt-BR", "zh-hans": "zh-Hans", "zh-cn": "zh-Hans" };
  const language = el("map-language");
  const season = el("season");
  const depth = el("depth");
  const fields = el("fields");
  const result = el("result");
  const out = el("out");
  const atlas = el("care-atlas");
  const onlineOrigin = "https://ezargaruna.github.io/suticore/";
  const framed = window !== window.parent;
  const offline = location.protocol === "file:";
  let words;

  function node(tag, content = "") {
    const element = document.createElement(tag);
    element.textContent = content;
    return element;
  }

  for (const [code, name] of Object.entries(names)) {
    const option = new Option(name, code);
    if (code !== "yzh") option.lang = code;
    option.dir = code === "ar" ? "rtl" : "ltr";
    language.add(option);
  }

  if (framed) {
    for (const link of document.links) {
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    }
  }

  const rows = editions.ru.zones.map(([, choices], index) => {
    const illustration = { 0: "shore", 8: "tide", 12: "dawn" }[index];
    if (illustration) {
      const image = node("img");
      image.src = (framed ? onlineOrigin : "") + "assets/care/" + illustration + ".png";
      image.alt = "";
      image.loading = "lazy";
      fields.append(image);
    }

    const box = node("fieldset");
    const legend = node("legend");
    const controls = node("div");
    controls.className = "actions";
    const buttons = choices.map(() => {
      const button = node("button");
      button.type = "button";
      button.setAttribute("aria-pressed", "false");
      button.addEventListener("click", () => {
        button.setAttribute("aria-pressed", button.getAttribute("aria-pressed") === "false" ? "true" : "false");
        refresh();
      });
      controls.append(button);
      return button;
    });
    box.append(legend, controls);
    const inputs = [0, 1].map(field => {
      const label = node("label");
      const textarea = node("textarea");
      textarea.id = "thread-" + (index + 1) + "-" + (field + 1);
      label.htmlFor = textarea.id;
      textarea.dir = "auto";
      textarea.spellcheck = false;
      textarea.setAttribute("autocorrect", "off");
      textarea.addEventListener("input", refresh);
      label.append(textarea);
      box.append(label);
      return { label, textarea };
    });
    fields.append(box);
    return { legend, buttons, inputs };
  });

  function note() {
    return rows.map(({ legend, buttons, inputs }) => {
      const selected = buttons.filter(button => button.getAttribute("aria-pressed") === "true");
      const responses = inputs.filter(({ label }) => !label.hidden);
      const content = [...selected.map(button => button.textContent),
        ...responses.map(({ textarea }) => textarea.value.trim())].filter(Boolean);
      return content.length ? legend.textContent + "\n" + content.join(" · ") : "";
    }).filter(Boolean).join("\n\n");
  }

  function refresh() {
    if (!result.hidden) out.textContent = note() || words.empty;
  }

  function setDepth() {
    for (const row of rows) {
      row.inputs.forEach(({ label }, index) => { label.hidden = index >= Number(depth.value); });
    }
    refresh();
  }

  function setSeason() {
    document.body.dataset.season = season.value;
    el("season-note").textContent = words.seasonPrompts[season.selectedIndex];
  }

  function applyLanguage() {
    const requested = language.value;
    const code = requested === "yzh" ? "ru" : requested;
    words = editions[code];
    root.lang = code;
    root.dir = code === "ar" ? "rtl" : "ltr";
    root.dataset.languageLayer = requested;
    document.title = words.title + " ∴ SUTI.world";

    for (const item of document.querySelectorAll("[data-copy]")) {
      item.textContent = item.dataset.copy.split(".").reduce((value, key) => value[key], words);
    }
    el("map-review").textContent = requested === "yzh" ? "язэхъ · показана русская редакция карты" : words.review;
    rows.forEach(({ legend, buttons, inputs }, index) => {
      const [title, choices, ...prompts] = words.zones[index];
      legend.textContent = new Intl.NumberFormat(code).format(index + 1) + " · " + title;
      buttons.forEach((button, option) => { button.textContent = choices[option]; });
      inputs.forEach(({ label, textarea }, field) => label.replaceChildren(prompts[field], textarea));
    });

    const atlasLanguage = offline ? "ru" : code;
    const suffix = { ru: "", "es-419": "-es", "pt-BR": "-pt" }[atlasLanguage] ?? "-" + atlasLanguage;
    atlas.href = (framed ? onlineOrigin : "") + "care-atlas" + suffix + ".html";
    atlas.hreflang = atlasLanguage;
    if (atlasLanguage !== code) {
      const marker = node("span", "русский");
      marker.lang = "ru";
      marker.dir = "ltr";
      atlas.append(" · ", marker);
    }

    el("clear-message").textContent = "";
    setSeason();
    setDepth();
  }

  language.addEventListener("change", () => {
    applyLanguage();
    if (!framed && !offline) {
      const url = new URL(location.href);
      url.searchParams.set("lang", language.value);
      history.replaceState(history.state, "", url);
    }
  });
  depth.addEventListener("change", setDepth);
  season.addEventListener("change", setSeason);
  el("build").addEventListener("click", () => {
    el("clear-message").textContent = "";
    result.hidden = false;
    refresh();
    el("result-title").focus();
  });
  el("clear").addEventListener("click", () => {
    for (const { buttons, inputs } of rows) {
      buttons.forEach(button => button.setAttribute("aria-pressed", "false"));
      inputs.forEach(({ textarea }) => { textarea.value = ""; });
    }
    result.hidden = true;
    out.textContent = "";
    depth.value = "0";
    setDepth();
    el("clear-message").textContent = words.cleared;
  });
  el("download").addEventListener("click", () => {
    const address = URL.createObjectURL(new Blob([note()], { type: "text/plain;charset=utf-8" }));
    const link = node("a");
    link.href = address;
    link.download = "care-map.txt";
    link.click();
    setTimeout(() => URL.revokeObjectURL(address), 1000);
  });

  const requested = root.dataset.mapLanguage || new URLSearchParams(location.search).get("lang");
  const slug = (requested || "").toLowerCase().replaceAll("_", "-");
  language.value = aliases[slug] || (Object.hasOwn(names, slug) ? slug : "ru");
  applyLanguage();
})();
