/* Public adaptation of the NITYA route engine. Choices stay in page memory. */
(() => {
  "use strict";

  const editions = JSON.parse(document.getElementById("nitya-route-copy").textContent);
  const atlas = JSON.parse(document.getElementById("nitya-atlas-copy").textContent);
  const sourceNotice = "язэхъ · показана русская редакция маршрута";

  const aliases = {
    "es-419": "es", pt: "pt-BR", "pt-br": "pt-BR", zh: "zh-Hans", "zh-hans": "zh-Hans", "zh-cn": "zh-Hans",
  };

  function normalizeLanguage(value) {
    const code = typeof value === "string" ? value.trim().toLowerCase() : "";
    return Object.hasOwn(aliases, code) ? aliases[code] : code;
  }

  function element(tag, value, attributes = {}) {
    const node = document.createElement(tag);
    if (value) node.textContent = value;
    for (const [key, attribute] of Object.entries(attributes)) node.setAttribute(key, attribute);
    return node;
  }

  document.querySelectorAll("[data-nitya-route]").forEach((mount, index) => {
    const details = element("details");
    const summary = element("summary");
    const notice = element("p", "", { class: "nitya-route__notice" });
    const panel = element("div", "", { class: "nitya-route__panel" });
    details.append(summary, panel);
    mount.append(notice, details);

    let choices = [];
    let phase = 0;
    let state = "ready";
    let words;
    let controls;

    function phaseAt(index) {
      return index === 1 && choices[0] === "unknown" ? words.unknownRelation : words.phases[index];
    }

    function control(label, action, handler) {
      const button = element("button", label, { type: "button", "data-route-action": action });
      button.addEventListener("click", handler);
      return button;
    }

    function moveTo(next) {
      phase = next;
      state = phase === words.phases.length ? "summary" : "active";
      render(true);
    }

    function recordChoice(id) {
      if (id === choices[phase]) return;
      choices[phase] = id;
      choices.fill(null, phase + 1);
    }

    function render(focus = false) {
      mount.dataset.routeState = state;
      panel.replaceChildren();
      const actions = element("div", "", { class: "nitya-route__actions" });
      let heading;

      if (state === "ready" || state === "closed") {
        const text = state === "ready" ? controls.privacy : controls.closed;
        heading = element("p", text, { tabindex: "-1" });
        panel.append(heading);
        actions.append(control(controls.start, "start", () => {
          choices = Array(words.phases.length).fill(null);
          moveTo(0);
        }));
      } else if (state === "paused") {
        heading = element("h3", controls.paused, { tabindex: "-1" });
        panel.append(heading);
        actions.append(control(controls.resume, "resume", () => moveTo(phase)));
      } else if (state === "summary") {
        heading = element("h3", words.summary, { tabindex: "-1" });
        const list = element("ol");
        words.phases.forEach((_, index) => {
          const step = phaseAt(index);
          const choice = step.choices.find(item => item.id === choices[index]);
          const entry = element("li");
          entry.append(element("strong", step.title), element("p", choice?.result || words.skipped));
          list.append(entry);
        });
        panel.append(heading, list);
        actions.append(control(words.back, "back", () => moveTo(phase - 1)));
      } else {
        const step = phaseAt(phase);
        heading = element("h3", step.title, { tabindex: "-1" });
        const group = element("fieldset");
        group.append(element("legend", step.prompt));
        const next = control(phase === words.phases.length - 1 ? words.finish : words.next, "next", () => moveTo(phase + 1));
        next.disabled = choices[phase] === null;
        for (const choice of step.choices) {
          const label = element("label", "", { class: "nitya-route__choice" });
          const radio = element("input", "", { type: "radio", name: "nitya-route-" + index, value: choice.id });
          radio.checked = choice.id === choices[phase];
          radio.addEventListener("change", () => {
            recordChoice(choice.id);
            next.disabled = false;
          });
          label.append(radio, document.createTextNode(choice.label));
          group.append(label);
        }
        panel.append(heading, group);
        if (phase > 0) actions.append(control(words.back, "back", () => moveTo(phase - 1)));
        actions.append(next, control(words.skip, "skip", () => {
          recordChoice(null);
          moveTo(phase + 1);
        }), control(controls.pause, "pause", () => {
          state = "paused";
          render(true);
        }));
      }

      if (state !== "ready" && state !== "closed") {
        actions.append(control(controls.close, "close", () => {
          state = "closed";
          choices = [];
          phase = 0;
          render(true);
        }));
      }
      panel.append(actions);
      if (focus && details.open) heading.focus();
    }

    function setLanguage(value) {
      const requested = normalizeLanguage(value);
      const language = Object.hasOwn(editions, requested) ? requested : "ru";
      const contentLanguage = language === "es" ? "es-419" : language;
      const direction = contentLanguage === "ar" ? "rtl" : "ltr";
      const wasInPanel = panel.contains(document.activeElement);
      ({ engine: words, labels: controls } = editions[language]);
      mount.lang = contentLanguage;
      mount.dir = direction;
      summary.textContent = words.title;
      const review = editions[language].review || atlas[contentLanguage].review;
      notice.textContent = requested === "yzh" ? sourceNotice : review;
      render(wasInPanel);
    }

    const query = new URLSearchParams(location.search);
    setLanguage(document.documentElement.dataset.practiceLanguage || window.NityaPractice?.language || query.get("lang") || document.documentElement.lang || "ru");
    window.addEventListener("nitya:language", event => setLanguage(event.detail?.language || event.detail));
  });
})();
