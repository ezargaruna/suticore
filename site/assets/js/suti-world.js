const STORAGE_KEY = "suti.os.style.v1";

const scopeMap = {
  person: { title: "личная конфигурация", phrase: "для индивидуального маршрута" },
  team: { title: "командная конфигурация", phrase: "для общего языка и согласованных действий" },
  system: { title: "системная конфигурация", phrase: "для связанной структуры и её правил" },
};

const intentMap = {
  language: {
    title: "голос и язык",
    phrase: "замечать оттенки и находить голос",
  },
  clarity: {
    title: "ясность ситуации",
    phrase: "видеть различие до выбора",
  },
  system: {
    title: "среда для проекта",
    phrase: "собирать форму для совместного действия",
  },
};

const densityMap = {
  quiet: { title: "просторно", phrase: "пространство для паузы" },
  balanced: { title: "сбалансированно", phrase: "один следующий ход" },
  compact: { title: "плотно и кратко", phrase: "суть без лишнего" },
};

const paletteMap = {
  linen: {
    title: "лён · тёплая земля",
    accent: "#965F45",
    accentSoft: "#DE9A73",
    focus: "#365958",
  },
  moss: {
    title: "мох · живое поле",
    accent: "#5A6355",
    accentSoft: "#DDE4E2",
    focus: "#365958",
  },
  petrol: {
    title: "петроль · цифровая глубина",
    accent: "#365958",
    accentSoft: "#DDE4E2",
    focus: "#687064",
  },
};

const rhythmMap = {
  pause: { title: "пауза", phrase: "темп остаётся спокойным", motion: "none" },
  pulse: { title: "пульс", phrase: "мягкий знак перемены", motion: "gentle" },
  still: { title: "без движения", phrase: "статичная ясность", motion: "off" },
};

const glyphMap = {
  "∴": "ядро и главное различие",
  "⧖": "пауза и наблюдение",
  "⟁": "переход к действию",
  "〄": "сборка и интеграция",
  "↺": "возврат и адаптация",
};

const form = document.querySelector("#style-form");
const documentRoot = document.documentElement;
const profileTitle = document.querySelector("#preview-title");
const profileCopy = document.querySelector("#preview-copy");
const profileGlyph = document.querySelector("#preview-glyph");
const profileStatus = document.querySelector("#profile-status");
const installButton = document.querySelector('[data-action="install"]');
const installStatus = document.querySelector("#install-status");
const installHelp = document.querySelector("#install-help");

let pendingInstall = null;

function readChoices() {
  const values = new FormData(form);
  const choices = {
    scope: values.get("scope"),
    intent: values.get("intent"),
    density: values.get("density"),
    palette: values.get("palette"),
    rhythm: values.get("rhythm"),
    glyph: values.get("glyph"),
  };

  if (
    !scopeMap[choices.scope] ||
    !intentMap[choices.intent] ||
    !densityMap[choices.density] ||
    !paletteMap[choices.palette] ||
    !rhythmMap[choices.rhythm] ||
    !glyphMap[choices.glyph]
  ) {
    return null;
  }

  return choices;
}

function buildProfile(choices) {
  const scope = scopeMap[choices.scope];
  const intent = intentMap[choices.intent];
  const density = densityMap[choices.density];
  const palette = paletteMap[choices.palette];
  const rhythm = rhythmMap[choices.rhythm];

  return {
    schema: "suti.style.profile/1",
    method: "explicit-preferences",
    title: `${scope.title} · ${intent.title} · ${density.title}`,
    summary: `${scope.phrase} · ${intent.phrase} · ${density.phrase} · ${rhythm.phrase}`,
    choices,
    mark: { glyph: choices.glyph, meaning: glyphMap[choices.glyph] },
    palette: {
      name: choices.palette,
      title: palette.title,
      tokens: {
        paper: "#F4F0E8",
        surface: "#FBF8F2",
        ink: "#40352E",
        accent: palette.accent,
        accentSoft: palette.accentSoft,
        focus: palette.focus,
      },
    },
    rhythm: { name: choices.rhythm, title: rhythm.title, motion: rhythm.motion },
    boundaries: {
      storage: "this-browser-only",
      externalTransfer: false,
      identityInference: false,
    },
  };
}

function applyProfile(profile, announce = true) {
  if (!profile) return;

  documentRoot.dataset.palette = profile.palette.name;
  documentRoot.dataset.density = profile.choices.density;
  documentRoot.dataset.rhythm = profile.choices.rhythm;
  documentRoot.style.setProperty("--accent", profile.palette.tokens.accent);
  documentRoot.style.setProperty("--signal", profile.palette.tokens.accentSoft);
  documentRoot.style.setProperty("--focus", profile.palette.tokens.focus);
  profileGlyph.textContent = profile.mark.glyph;
  profileTitle.textContent = profile.title;
  profileCopy.textContent = `${profile.palette.title} · ${profile.summary}`;

  if (announce) profileStatus.textContent = "предпросмотр обновлён · выбор пока не сохранён";
}

function profileFromForm() {
  const choices = readChoices();
  if (!choices) return null;
  return buildProfile(choices);
}

function setRadio(name, value) {
  const option = form.querySelector(`input[name="${name}"][value="${CSS.escape(value)}"]`);
  if (option) option.checked = true;
}

function loadSavedProfile() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    if (!saved || saved.schema !== "suti.style.profile/1" || !saved.choices) {
      applyProfile(profileFromForm(), false);
      return;
    }

    for (const [name, value] of Object.entries(saved.choices)) {
      const field = form.elements.namedItem(name);
      if (!field) continue;
      if (field instanceof RadioNodeList) setRadio(name, value);
      else if (field.tagName === "SELECT" && [...field.options].some((option) => option.value === value)) field.value = value;
    }

    const profile = profileFromForm();
    if (profile) {
      applyProfile(profile, false);
      profileStatus.textContent = "сохранённая конфигурация загружена из этого браузера";
    }
  } catch {
    profileStatus.textContent = "не удалось прочитать сохранённый стиль · выбери настройки заново";
  }
}

function cssTokens(profile) {
  const tokens = profile.palette.tokens;
  return `:root {\n  --suti-paper: ${tokens.paper};\n  --suti-surface: ${tokens.surface};\n  --suti-ink: ${tokens.ink};\n  --suti-accent: ${tokens.accent};\n  --suti-accent-soft: ${tokens.accentSoft};\n  --suti-focus: ${tokens.focus};\n  --suti-mark: "${profile.mark.glyph}";\n}`;
}

function downloadProfile(profile) {
  const file = new Blob([`${JSON.stringify(profile, null, 2)}\n`], {
    type: "application/json",
  });
  const url = URL.createObjectURL(file);
  const link = document.createElement("a");
  link.href = url;
  link.download = "suti-style-profile.json";
  document.body.append(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

const punctumResult = document.querySelector("#punctum-result");
const punctumStatus = document.querySelector("#punctum-status");
const routeResult = document.querySelector("#route-result");
const routeMap = {
  language: {
    title: "LinguaFUSION",
    detail: "язык, культура и коммуникация — через живые ситуации и практику.",
    href: "#lingua",
  },
  person: {
    title: "Fusion",
    detail: "от одного вопроса и Snapshot — к целостной карте перехода.",
    href: "#fusion",
  },
  project: {
    title: "semantic architecture",
    detail: "от аудита терминов и текста — к языку проекта и бренда.",
    href: "#semantic",
  },
  system: {
    title: "SUTI Architecture",
    detail: "роли, решения, процессы и AI-контур — в проверяемую структуру.",
    href: "#semantic",
  },
};

document.querySelector('[data-action="punctum"]').addEventListener("click", () => {
  const phrase = document.querySelector("#punctum-input").value.trim();
  if (!phrase) {
    punctumStatus.textContent = "добавь одну фразу, чтобы начать";
    return;
  }

  document.querySelector("#punctum-observation").textContent = phrase;
  punctumResult.hidden = false;
  routeResult.hidden = true;
  document.querySelectorAll('input[name="route"]').forEach((input) => { input.checked = false; });
  punctumStatus.textContent = "первый черновик собран только в этой вкладке · ничего не сохранено и не отправлено";
  document.querySelector("#punctum-result-title").focus();
});

document.querySelectorAll('input[name="route"]').forEach((input) => {
  input.addEventListener("change", (event) => {
    const route = routeMap[event.currentTarget.value];
    if (!route) return;
    routeResult.replaceChildren();
    const title = document.createElement("strong");
    title.textContent = route.title;
    const detail = document.createElement("p");
    detail.textContent = route.detail;
    const link = document.createElement("a");
    link.href = route.href;
    link.textContent = "посмотреть направление ↓";
    routeResult.append(title, detail, link);
    routeResult.hidden = false;
  });
});

form.addEventListener("change", () => applyProfile(profileFromForm()));

document.querySelector('[data-action="save-profile"]').addEventListener("click", () => {
  const profile = profileFromForm();
  if (!profile) return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    applyProfile(profile, false);
    profileStatus.textContent = "стиль сохранён только в этом браузере";
  } catch {
    profileStatus.textContent = "хранилище недоступно · скачай стиль отдельным файлом";
  }
});

document.querySelector('[data-action="export-profile"]').addEventListener("click", () => {
  const profile = profileFromForm();
  if (!profile) return;
  downloadProfile(profile);
  profileStatus.textContent = "файл стиля подготовлен на этом устройстве";
});

document.querySelector('[data-action="copy-tokens"]').addEventListener("click", async () => {
  const profile = profileFromForm();
  if (!profile) return;

  try {
    await navigator.clipboard.writeText(cssTokens(profile));
    profileStatus.textContent = "CSS-токены скопированы · применяй их вручную";
  } catch {
    downloadProfile(profile);
    profileStatus.textContent = "буфер недоступен · файл JSON подготовлен вместо него";
  }
});

document.querySelector('[data-action="reset-profile"]').addEventListener("click", () => {
  form.reset();
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // The default preview still resets when browser storage is unavailable.
  }
  documentRoot.removeAttribute("data-contrast");
  document.querySelector('[data-action="contrast"]').setAttribute("aria-pressed", "false");
  documentRoot.style.removeProperty("--accent");
  documentRoot.style.removeProperty("--signal");
  documentRoot.style.removeProperty("--focus");
  applyProfile(profileFromForm(), false);
  profileStatus.textContent = "настройки сброшены · данные удалены из этого браузера";
});

document.querySelector('[data-action="contrast"]').addEventListener("click", (event) => {
  const button = event.currentTarget;
  const enabled = button.getAttribute("aria-pressed") !== "true";
  button.setAttribute("aria-pressed", String(enabled));
  documentRoot.dataset.contrast = String(enabled);
});

document.querySelector('[data-action="install"]').addEventListener("click", async () => {
  if (!pendingInstall) return;

  pendingInstall.prompt();
  const choice = await pendingInstall.userChoice;
  installStatus.textContent = choice.outcome === "accepted"
    ? "установка подтверждена браузером"
    : "можно установить позже из меню браузера";
  pendingInstall = null;
  installButton.hidden = true;
  installHelp.hidden = false;
});

window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  pendingInstall = event;
  installButton.hidden = false;
  installHelp.hidden = true;
  installStatus.textContent = "установится как отдельное веб-приложение";
});

window.addEventListener("appinstalled", () => {
  installButton.hidden = true;
  installHelp.hidden = true;
  installStatus.textContent = "SUTI.OS добавлен на это устройство";
});

if (window.matchMedia("(display-mode: standalone)").matches) {
  installStatus.textContent = "SUTI.OS открыт как отдельное приложение";
  installHelp.hidden = true;
}

loadSavedProfile();

if ("serviceWorker" in navigator && (location.protocol === "https:" || location.hostname === "localhost" || location.hostname === "127.0.0.1")) {
  navigator.serviceWorker.register("./service-worker.js", { scope: "./" }).catch(() => {
    installStatus.textContent = "установка офлайн-версии недоступна в этой вкладке";
  });
}
