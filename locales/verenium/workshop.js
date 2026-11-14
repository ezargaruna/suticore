(() => {
  "use strict";
  const el = id => document.getElementById(id);
  const root = document.documentElement;
  const editions = JSON.parse(el("workshop-locales").textContent);
  const names = {
    ru: "русский", en: "English", "es-419": "español latinoamericano",
    "pt-BR": "português brasileiro", fr: "français", ar: "العربية",
    "zh-Hans": "简体中文", hi: "हिन्दी", bn: "বাংলা", eo: "Esperanto",
    sa: "संस्कृतम्", la: "Latina", yzh: "язэхъ",
  };
  const aliases = { es: "es-419", pt: "pt-BR", "pt-br": "pt-BR", "zh-hans": "zh-Hans", "zh-cn": "zh-Hans" };
  const modes = ["care", "order", "council", "setup"];
  const notes = [...document.querySelectorAll(".note textarea")];
  const copyNodes = [...document.querySelectorAll("[data-copy]")];
  const picker = el("entrylang");
  const route = el("route");
  const depth = el("depth");
  const nickname = el("alias");
  const restore = el("restore");
  const atlas = el("care-atlas");
  const base = "https://ezargaruna.github.io/suticore/";
  const framed = window !== window.parent;
  const offline = location.protocol === "file:";
  let message = "";
  let applied = false;
  let restoreRequest = 0;

  function normalize(value) {
    const slug = (value || "").toLowerCase().replaceAll("_", "-");
    return aliases[slug] || (Object.hasOwn(names, slug) ? slug : "ru");
  }

  for (const [code, name] of Object.entries(names)) {
    const option = new Option(name, code);
    if (code !== "yzh") option.lang = code;
    option.dir = code === "ar" ? "rtl" : "ltr";
    picker.add(option);
  }

  if (framed) {
    for (const link of document.links) {
      if (!/^https?:/.test(link.getAttribute("href"))) link.href = new URL(link.getAttribute("href"), base).href;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    }
  }

  function updateLanguage() {
    const requested = picker.value;
    const language = requested === "yzh" ? "ru" : requested;
    const words = editions[language];
    root.lang = language;
    root.dir = language === "ar" ? "rtl" : "ltr";
    root.dataset.languageLayer = requested;
    document.title = words.title;
    for (const node of copyNodes) {
      node.textContent = node.dataset.copy.split(".").reduce((item, key) => item[key], words);
      if (node.hasAttribute("data-ru-link") && language !== "ru") {
        const tag = document.createElement("span");
        tag.lang = "ru";
        tag.dir = "ltr";
        tag.textContent = names.ru;
        node.append(" · ", tag);
      }
    }
    for (const link of document.querySelectorAll("[data-care-map]")) {
      link.href = (framed ? base : "") + "care-map.html?lang=" + encodeURIComponent(requested);
      link.hreflang = language;
    }
    const atlasLanguage = offline ? "ru" : language;
    const suffix = { ru: "", "es-419": "-es", "pt-BR": "-pt" }[atlasLanguage] ?? "-" + atlasLanguage;
    atlas.setAttribute("href", (framed ? base : "") + "care-atlas" + suffix + ".html");
    atlas.hreflang = atlasLanguage;
    if (atlasLanguage !== language) {
      const tag = document.createElement("span");
      tag.lang = "ru";
      tag.dir = "ltr";
      tag.textContent = names.ru;
      atlas.append(" · ", tag);
    }
    el("reflection-language").textContent = requested === "yzh"
      ? "язэхъ · пока показана русская редакция"
      : words.review;
  }

  function show() {
    const words = editions[root.lang];
    const level = Number(depth.value);
    const mode = modes.indexOf(route.value);
    el("reflection-title").textContent = words.cues[mode][0];
    el("cue").textContent = words.cues[mode][level];
    el("voice").textContent = (nickname.value || "Verenium") + " · " + words.pace;
    for (const id of ["order", "council"]) {
      el(id).querySelectorAll(".note").forEach((field, index) => { field.hidden = level < 2 && index > level; });
    }
    for (const id of modes) el(id).hidden = id !== route.value;
    el("applied").textContent = applied ? words.applied : "";
    el("msg").textContent = message ? words[message] : "";
  }

  picker.addEventListener("change", () => {
    updateLanguage();
    show();
    if (!framed && !offline) {
      const url = new URL(location.href);
      url.searchParams.set("lang", picker.value);
      history.replaceState(history.state, "", url);
    }
  });
  for (const input of [route, depth]) input.addEventListener("change", show);
  nickname.addEventListener("input", show);

  el("apply").addEventListener("click", () => {
    nickname.value = "Verenium";
    route.value = "care";
    depth.value = "0";
    applied = true;
    show();
  });

  el("save").addEventListener("click", () => {
    const profile = { v: 2, depth: depth.value, name: nickname.value, mode: route.value, notes: notes.map(node => node.value) };
    const address = URL.createObjectURL(new Blob([JSON.stringify(profile, null, 2)], { type: "application/json" }));
    const link = document.createElement("a");
    link.href = address;
    link.download = "virenium-private.json";
    link.click();
    setTimeout(() => URL.revokeObjectURL(address), 1000);
    message = "saved";
    show();
  });

  restore.addEventListener("change", async () => {
    const file = restore.files[0];
    if (!file) return;
    const request = ++restoreRequest;
    try {
      const profile = JSON.parse(await file.text());
      if (request !== restoreRequest) return;
      if (![1, 2].includes(profile.v) || (profile.v === 2 && !["0", "1", "2"].includes(profile.depth)) ||
          !modes.includes(profile.mode) || typeof profile.name !== "string" ||
          !Array.isArray(profile.notes) || profile.notes.length !== notes.length ||
          !profile.notes.every(note => typeof note === "string")) throw new Error("Invalid profile");
      depth.value = profile.v === 1 ? "2" : profile.depth;
      route.value = profile.mode;
      nickname.value = profile.name;
      notes.forEach((node, index) => { node.value = profile.notes[index]; });
      message = "restored";
    } catch {
      if (request !== restoreRequest) return;
      message = "invalid";
    } finally {
      if (request === restoreRequest) {
        restore.value = "";
        show();
      }
    }
  });

  const requested = root.dataset.workshopLanguage || new URLSearchParams(location.search).get("lang");
  const fragment = root.dataset.workshopAnchor || location.hash.slice(1);
  picker.value = normalize(requested);
  if (modes.includes(fragment)) route.value = fragment;
  updateLanguage();
  show();
  if (fragment === "activate") el("activation").scrollIntoView();
  else if (modes.includes(fragment)) el(fragment).scrollIntoView();
})();
