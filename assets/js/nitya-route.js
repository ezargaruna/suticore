/* Public adaptation of the NITYA route engine. Choices stay in page memory. */
(() => {
  "use strict";

  const routeEngine = {
  ru: {
    title: "четыре решения меняют маршрут",
    phases: [
      { title: "01 · сигнал", prompt: "С какой опоры начать сцену?", choices: [
        { id: "observation", label: "наблюдение", result: "Сначала — то, что можно заметить или проверить" },
        { id: "source", label: "источник", result: "Сначала — найти происхождение сведений" },
        { id: "symbol", label: "образ", result: "Сначала — исследовать авторский символ, не называя его фактом" },
        { id: "unknown", label: "неизвестное", result: "Сначала — обозначить пробел и не заполнять его догадкой" },
      ] },
      { title: "02 · связь", prompt: "Как отметить отношение между двумя узлами?", choices: [
        { id: "supports", label: "поддерживает", result: "Связь записана как поддерживающая и требует указанного основания" },
        { id: "tension", label: "расходится", result: "Различие сохранено; противоречие не сглаживается" },
        { id: "question", label: "пока вопрос", result: "Связь остаётся открытой до новых оснований" },
        { id: "separate", label: "развести", result: "Узлы разделены, пока связь не подтверждена" },
      ] },
      { title: "03 · ход", prompt: "Какой следующий шаг оставляет выбор обратимым?", choices: [
        { id: "draft", label: "сделать черновик", result: "Создать малый черновик и проверить его на выбранном примере" },
        { id: "ask", label: "задать вопрос", result: "Попросить недостающий контекст у подходящего человека" },
        { id: "compare", label: "сравнить варианты", result: "Сопоставить минимум две версии по явным критериям" },
        { id: "pause", label: "взять паузу", result: "Остановить ход без штрафа и вернуться по желанию" },
      ] },
      { title: "04 · след", prompt: "Что забрать из этой сессии?", choices: [
        { id: "pearl", label: "жемчужину", result: "Оставить одну переносимую формулировку" },
        { id: "question", label: "открытый вопрос", result: "Сохранить только вопрос для будущего исследования" },
        { id: "map", label: "карту связей", result: "Забрать схему связей без личных ответов" },
        { id: "nothing", label: "ничего", result: "Закрыть сессию без экспорта и без объяснений" },
      ] },
    ],
    unknownRelation: { title: "02 · открытый узел", prompt: "Оснований для связи пока нет — как сохранить этот пробел?", choices: [
      { id: "mark_unknown", label: "пометить неизвестное", result: "Связь отмечена как неизвестная; вывод не подставлен" },
      { id: "seek_source", label: "найти источник", result: "Следующий шаг — найти источник и вернуться к узлу" },
      { id: "ask_peer", label: "попросить взгляд со стороны", result: "Можно предложить вопрос для добровольного разбора" },
      { id: "separate", label: "развести узлы", result: "Узлы остаются раздельными до появления основания" },
    ] },
    back: "назад", next: "дальше", skip: "пропустить ход", finish: "собрать итог", pause: "остановить сессию", summary: "собранный маршрут", carry: "что решил игрок", skipped: "ход пропущен — решения не додумываются",
  },
  en: {
    title: "four decisions shape the route",
    phases: [
      { title: "01 · signal", prompt: "What should ground this scene first?", choices: [
        { id: "observation", label: "observation", result: "Begin with what can be noticed or checked" },
        { id: "source", label: "source", result: "Begin by tracing where the information came from" },
        { id: "symbol", label: "image", result: "Explore an authored symbol without calling it fact" },
        { id: "unknown", label: "unknown", result: "Mark the gap and leave it open" },
      ] },
      { title: "02 · relation", prompt: "How should two nodes relate on the map?", choices: [
        { id: "supports", label: "supports", result: "Record a supporting link and name its basis" },
        { id: "tension", label: "differs", result: "Keep the difference visible; do not smooth it over" },
        { id: "question", label: "open question", result: "Leave the relation open pending evidence" },
        { id: "separate", label: "separate", result: "Keep the nodes apart until a link is supported" },
      ] },
      { title: "03 · move", prompt: "Which next step keeps the route reversible?", choices: [
        { id: "draft", label: "make a draft", result: "Make a small draft and review it against one example" },
        { id: "ask", label: "ask a question", result: "Request the missing context from an appropriate person" },
        { id: "compare", label: "compare options", result: "Compare at least two versions using named criteria" },
        { id: "pause", label: "pause", result: "Stop without penalty and return only if you choose" },
      ] },
      { title: "04 · trace", prompt: "What, if anything, should leave this session?", choices: [
        { id: "pearl", label: "one pearl", result: "Keep one portable formulation" },
        { id: "question", label: "an open question", result: "Keep only a question for later inquiry" },
        { id: "map", label: "a relation map", result: "Take a map without personal answers" },
        { id: "nothing", label: "nothing", result: "Close without export or explanation" },
      ] },
    ],
    unknownRelation: { title: "02 · open node", prompt: "There is not enough basis for a link yet. How should the gap remain visible?", choices: [
      { id: "mark_unknown", label: "mark unknown", result: "The relation stays unknown; no conclusion is filled in" },
      { id: "seek_source", label: "find a source", result: "Next, locate a source and return to this node" },
      { id: "ask_peer", label: "invite another view", result: "You can invite someone to look at the question with you" },
      { id: "separate", label: "keep nodes apart", result: "Keep the nodes separate until a basis appears" },
    ] },
    back: "back", next: "continue", skip: "skip this move", finish: "build the route", pause: "stop session", summary: "route assembled", carry: "player's choice", skipped: "move skipped — no answer is inferred",
  },
  es: {
    title: "cuatro decisiones cambian la ruta",
    phases: [
      { title: "01 · señal", prompt: "¿Qué debería dar base a la escena?", choices: [
        { id: "observation", label: "observación", result: "Empezar por lo que se puede notar o comprobar" },
        { id: "source", label: "fuente", result: "Empezar por rastrear el origen de la información" },
        { id: "symbol", label: "imagen", result: "Explorar un símbolo autoral sin llamarlo hecho" },
        { id: "unknown", label: "lo desconocido", result: "Marcar el vacío y dejarlo abierto" },
      ] },
      { title: "02 · relación", prompt: "¿Cómo relacionar dos nodos del mapa?", choices: [
        { id: "supports", label: "apoya", result: "Anotar un vínculo de apoyo e indicar su fundamento" },
        { id: "tension", label: "difiere", result: "Mantener visible la diferencia, sin suavizarla" },
        { id: "question", label: "pregunta abierta", result: "Dejar abierta la relación hasta tener más fundamento" },
        { id: "separate", label: "separar", result: "Mantener los nodos separados hasta justificar el vínculo" },
      ] },
      { title: "03 · paso", prompt: "¿Qué paso conserva una ruta reversible?", choices: [
        { id: "draft", label: "hacer un borrador", result: "Crear un borrador pequeño y revisarlo con un ejemplo" },
        { id: "ask", label: "hacer una pregunta", result: "Pedir el contexto que falta a la persona adecuada" },
        { id: "compare", label: "comparar opciones", result: "Comparar al menos dos versiones con criterios explícitos" },
        { id: "pause", label: "hacer una pausa", result: "Detenerse sin penalización y volver solo si se desea" },
      ] },
      { title: "04 · rastro", prompt: "¿Qué, si acaso, quieres llevarte?", choices: [
        { id: "pearl", label: "una perla", result: "Conservar una formulación que pueda trasladarse" },
        { id: "question", label: "una pregunta", result: "Conservar solo una pregunta para investigar después" },
        { id: "map", label: "un mapa de vínculos", result: "Llevar un esquema sin respuestas personales" },
        { id: "nothing", label: "nada", result: "Cerrar sin exportar ni dar explicaciones" },
      ] },
    ],
    unknownRelation: { title: "02 · nodo abierto", prompt: "Aún no hay base suficiente para un vínculo — ¿cómo dejar visible ese vacío?", choices: [
      { id: "mark_unknown", label: "marcar lo desconocido", result: "La relación queda como desconocida; no se inventa una conclusión" },
      { id: "seek_source", label: "buscar una fuente", result: "El siguiente paso es encontrar una fuente y volver al nodo" },
      { id: "ask_peer", label: "pedir otra mirada", result: "Puedes invitar a alguien a revisar la pregunta contigo" },
      { id: "separate", label: "mantener separados los nodos", result: "Los nodos siguen separados hasta tener fundamento" },
    ] },
    back: "atrás", next: "continuar", skip: "omitir paso", finish: "crear la ruta", pause: "detener sesión", summary: "ruta reunida", carry: "elección de quien juega", skipped: "paso omitido — no se infiere ninguna respuesta",
  },
  "pt-BR": {
    title: "quatro decisões mudam o percurso",
    phases: [
      { title: "01 · sinal", prompt: "O que deve dar base à cena primeiro?", choices: [
        { id: "observation", label: "observação", result: "Começar pelo que pode ser percebido ou verificado" },
        { id: "source", label: "fonte", result: "Começar rastreando a origem da informação" },
        { id: "symbol", label: "imagem", result: "Explorar um símbolo autoral sem chamá-lo de fato" },
        { id: "unknown", label: "desconhecido", result: "Marcar a lacuna e deixá-la em aberto" },
      ] },
      { title: "02 · relação", prompt: "Como relacionar dois nós do mapa?", choices: [
        { id: "supports", label: "apoia", result: "Registrar um vínculo de apoio e indicar sua base" },
        { id: "tension", label: "diverge", result: "Manter a diferença visível, sem apagá-la" },
        { id: "question", label: "pergunta aberta", result: "Deixar a relação em aberto até haver fundamento" },
        { id: "separate", label: "separar", result: "Manter os nós separados até sustentar o vínculo" },
      ] },
      { title: "03 · movimento", prompt: "Qual próximo passo mantém o percurso reversível?", choices: [
        { id: "draft", label: "fazer um rascunho", result: "Criar um rascunho pequeno e revisá-lo com um exemplo" },
        { id: "ask", label: "fazer uma pergunta", result: "Pedir o contexto que falta à pessoa adequada" },
        { id: "compare", label: "comparar opções", result: "Comparar ao menos duas versões com critérios explícitos" },
        { id: "pause", label: "fazer uma pausa", result: "Parar sem penalidade e voltar apenas se quiser" },
      ] },
      { title: "04 · rastro", prompt: "O que, se algo, você quer levar desta sessão?", choices: [
        { id: "pearl", label: "uma pérola", result: "Guardar uma formulação que possa ser levada adiante" },
        { id: "question", label: "uma pergunta aberta", result: "Guardar apenas uma pergunta para investigar depois" },
        { id: "map", label: "um mapa de relações", result: "Levar um esquema sem respostas pessoais" },
        { id: "nothing", label: "nada", result: "Encerrar sem exportar nem se explicar" },
      ] },
    ],
    unknownRelation: { title: "02 · nó aberto", prompt: "Ainda não há base suficiente para um vínculo — como manter essa lacuna visível?", choices: [
      { id: "mark_unknown", label: "marcar como desconhecido", result: "A relação fica como desconhecida; nenhuma conclusão é inventada" },
      { id: "seek_source", label: "buscar uma fonte", result: "O próximo passo é localizar uma fonte e voltar ao nó" },
      { id: "ask_peer", label: "pedir outro olhar", result: "Você pode convidar alguém a olhar a pergunta com você" },
      { id: "separate", label: "manter os nós separados", result: "Os nós permanecem separados até haver fundamento" },
    ] },
    back: "voltar", next: "continuar", skip: "pular movimento", finish: "montar percurso", pause: "parar sessão", summary: "percurso reunido", carry: "escolha de quem joga", skipped: "movimento pulado — nenhuma resposta é inferida",
  },
};

  const labels = {
    ru: {
      start: "выбрать первый ход", pause: "пауза", resume: "продолжить", close: "завершить и очистить",
      paused: "маршрут на паузе", closed: "маршрут завершён, выборы очищены",
      privacy: "четыре коротких решения, без записи и отправки ответов. можно остановиться в любой момент",
    },
    en: {
      start: "choose the first move", pause: "pause", resume: "resume", close: "end and clear",
      paused: "route paused", closed: "route ended and choices cleared",
      privacy: "four small choices. your answers stay on this page, and you can stop at any time",
    },
    es: {
      start: "elegir el primer paso", pause: "hacer una pausa", resume: "retomar", close: "terminar y borrar",
      paused: "ruta en pausa", closed: "ruta terminada y elecciones borradas",
      privacy: "cuatro pequeñas decisiones. tus respuestas se quedan en esta página y puedes parar en cualquier momento",
    },
    "pt-BR": {
      start: "escolher o primeiro passo", pause: "fazer uma pausa", resume: "retomar", close: "encerrar e apagar",
      paused: "percurso em pausa", closed: "percurso encerrado e escolhas apagadas",
      privacy: "quatro pequenas escolhas. suas respostas ficam nesta página e você pode parar a qualquer momento",
    },
  };

  const fallback = {
    fr: "le parcours à quatre décisions est disponible en anglais",
    ar: "المسار ذو القرارات الأربعة متاح بالإنجليزية",
    "zh-Hans": "四步选择路线目前提供英文版",
    hi: "चार फ़ैसलों वाला मार्ग अंग्रेज़ी में उपलब्ध है",
    bn: "চারটি সিদ্ধান্তের পথটি ইংরেজিতে পাওয়া যায়",
    eo: "la kvarpaŝa vojo disponeblas en la angla",
    sa: "चतुर्निर्णयमार्गः आङ्ग्लभाषायाम् उपलब्धः",
    la: "iter quattuor electionum Anglice praesto est",
    yzh: "язэхъ · показан русский текст маршрута",
  };

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
      const language = Object.hasOwn(routeEngine, requested) ? requested : requested === "yzh" ? "ru" : "en";
      const wasInPanel = panel.contains(document.activeElement);
      words = routeEngine[language];
      controls = labels[language];
      details.lang = language;
      details.dir = "ltr";
      summary.textContent = words.title;
      notice.hidden = !Object.hasOwn(fallback, requested);
      if (!notice.hidden) {
        notice.lang = requested === "yzh" ? "ru" : requested;
        notice.dir = requested === "ar" ? "rtl" : "ltr";
        notice.textContent = fallback[requested];
      }
      render(wasInPanel);
    }

    const query = new URLSearchParams(location.search);
    setLanguage(document.documentElement.dataset.practiceLanguage || window.NityaPractice?.language || query.get("lang") || document.documentElement.lang || "ru");
    window.addEventListener("nitya:language", event => setLanguage(event.detail?.language || event.detail));
  });
})();
