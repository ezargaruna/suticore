(() => {
  'use strict';

  const mount = document.querySelector('[data-nitya-practice]');
  if (!mount) return;

  // Public adaptation of the local NITYA 90-day practice. A session lives in this page.
  const coreCopy = {
    ru: {
      kicker: "NITYA × ангелы заботы · добровольная практика", title: "90 дней маленьких ходов",
      lead: "твой день 1 может быть сегодня. выбери посильный ход на 3-10 минут; можно менять темп, пропускать дни и завершать без долга",
      privacy: "это локальная практика: ответы, выбранный контекст и дата начала не сохраняются и не отправляются. подключение сервиса, уведомлений и сети участников здесь не выполняется",
      contexts: "выбрать контекст · необязательно",
      contextHelp: "ничего не выбрано заранее. это контекст чтения, а не проверка возраста или возрастная сертификация. 21+, 33+ и 55+ не назначают человеку свойства и потребности",
      caregiver: "для родителя, опекуна или педагога: совместный офлайн-ход через вымышленную сцену. детская ветвь требует местной проверки защиты и согласий; не просите данные, фотографии или личные истории ребёнка",
      education: "для ответственного взрослого: подростковый маршрут применяется в подходящей образовательной или семейной среде после местной проверки защиты, согласий и правил площадки. личные сообщения и раскрытие частных историй не нужны",
      adult: "взрослый сам выбирает тему, язык и темп. для всех взрослых доступны одинаковые ходы; можно пользоваться общим маршрутом и не указывать возраст",
      childLabel: "0+ · для взрослого рядом", teenLabel: "12+ · с ответственным взрослым",
      start: "попробовать день 1 сегодня", window: "окно из 90 календарных дней", topic: "какой ход выбрать?",
      topics: { language: "язык", care: "забота", world: "мир" },
      prompts: { language: "придумай две ясные фразы, которыми вымышленный персонаж может попросить больше времени", care: "выбери одну небольшую вещь, которую удобно вернуть на место, или просто сделай паузу", world: "вообрази тихий сад и одно правило, которое позволяет каждому свободно выйти" },
      childPrompts: { language: "взрослый предлагает герою фразу «можно сделать паузу?»; ответ можно не давать", care: "взрослый и ребёнок могут вместе заметить один цвет рядом, без фотографий и записи ответов", world: "взрослый предлагает придумать сад с удобным выходом; можно только послушать или пропустить" },
      result: "результат можно оставить себе или не формулировать. здесь нет счёта, серии, регистрации и обязательства делиться",
      pause: "пауза", resume: "вернуться к ходу", skip: "пропустить", exit: "завершить", restart: "открыть заново",
      paused: "пауза · ничего не продолжится само", skipped: "ход пропущен · догонять не нужно", closed: "маршрут завершён · выборы этого экрана очищены",
      samurai: "Samurai Dharma · другой игровой маршрут", angels: "как устроены ангелы заботы",
      review: "русская исходная редакция", campaign: "95 календарных дней: 90 ходов и 5 необязательных дней завершения",
      cadence: "90 ходов · не обязательно проходить ежедневно · счётчик сбрасывается при закрытии или перезагрузке страницы",
      turnLabel: "ход {turn} из 90", completeTurn: "завершить ход", completed: "90 ходов завершены · твои ответы не сохранялись; можно остановиться здесь",
    },
    en: {
      kicker: "NITYA × Angels of Care · optional practice", title: "90 days of small turns",
      lead: "your day 1 can be today. choose a manageable 3-10 minute turn; change the pace, skip days, or finish without a backlog",
      privacy: "this is a local practice: answers, context choice, and start date are neither saved nor sent. it does not connect a service, notifications, or a participant network",
      contexts: "choose a context · optional",
      contextHelp: "nothing is preselected. this is a reading context, not age verification or age certification. 21+, 33+, and 55+ do not assign traits or needs",
      caregiver: "for a parent, guardian, or educator: a shared offline turn using fiction. the child-facing route requires local safeguarding and consent review; do not request children's data, photographs, or personal stories",
      education: "for the responsible adult: use the teen route in an appropriate educational or family setting after local safeguarding, consent, and platform-rule review. private messages and personal disclosures are unnecessary",
      adult: "adults choose topic, language, and pace. the same turns are available to all adults; use the general route without stating an age if you prefer",
      childLabel: "0+ · for the adult alongside", teenLabel: "12+ · with a responsible adult",
      start: "try day 1 today", window: "90-calendar-day window", topic: "which turn would you like?",
      topics: { language: "language", care: "care", world: "world" },
      prompts: { language: "imagine two clear phrases a fictional character could use to ask for more time", care: "choose one small thing that is easy to put back in place, or simply pause", world: "imagine a quiet garden and one rule that lets everyone leave freely" },
      childPrompts: { language: "the adult offers a character the phrase “may I pause?”; no answer is needed", care: "an adult and child may notice one nearby color together, without photographs or recording answers", world: "the adult suggests imagining a garden with an easy exit; listening or skipping is fine" },
      result: "keep the result to yourself or leave it unspoken. there is no score, streak, registration, or obligation to share",
      pause: "pause", resume: "return to the turn", skip: "skip", exit: "finish", restart: "open again",
      paused: "paused · nothing continues on its own", skipped: "turn skipped · no catching up needed", closed: "route finished · this screen's choices have been cleared",
      samurai: "Samurai Dharma · another game route", angels: "how Angels of Care work",
      review: "English editorial edition · independent language review pending", campaign: "95 calendar days: 90 turns and 5 optional closing days",
      cadence: "90 turns · no daily streak is required · the counter resets when this page is closed or reloaded",
      turnLabel: "turn {turn} of 90", completeTurn: "complete this turn", completed: "90 turns complete · your answers were not saved; you can stop here",
    },
    es: {
      kicker: "NITYA × ángeles del cuidado · práctica opcional", title: "90 días de pequeños pasos",
      lead: "tu día 1 puede ser hoy. elige un paso posible de 3-10 minutos; cambia el ritmo, omite días o termina sin acumular pendientes",
      privacy: "es una práctica local: las respuestas, el contexto y la fecha de inicio no se guardan ni se envían. aquí no se conecta un servicio, notificaciones ni una red de participantes",
      contexts: "elegir contexto · opcional",
      contextHelp: "no hay selección previa. es un contexto de lectura, no una verificación ni certificación de edad. 21+, 33+ y 55+ no atribuyen rasgos ni necesidades",
      caregiver: "para madre, padre, tutor o docente: un paso compartido sin conexión mediante ficción. la ruta infantil requiere revisión local de protección y consentimiento; no pedir datos, fotos ni historias personales de menores",
      education: "para la persona adulta responsable: usar la ruta adolescente en un entorno educativo o familiar adecuado, tras revisar protección, consentimiento y reglas de la plataforma. no hacen falta mensajes privados ni relatos personales",
      adult: "cada adulto elige tema, idioma y ritmo. los mismos pasos están disponibles para todos los adultos; puedes usar la ruta general sin indicar edad",
      childLabel: "0+ · para la persona adulta", teenLabel: "12+ · con una persona adulta responsable",
      start: "probar el día 1 hoy", window: "ventana de 90 días naturales", topic: "¿qué paso eliges?",
      topics: { language: "lenguaje", care: "cuidado", world: "mundo" },
      prompts: { language: "imagina dos frases claras con las que un personaje ficticio pueda pedir más tiempo", care: "elige una cosa pequeña que resulte fácil devolver a su lugar, o haz una pausa", world: "imagina un jardín tranquilo y una regla que permita a cualquiera salir libremente" },
      childPrompts: { language: "la persona adulta propone a un personaje «¿puedo hacer una pausa?»; no es necesario responder", care: "una persona adulta y una niña o niño pueden observar un color cercano, sin fotos ni registro de respuestas", world: "la persona adulta propone imaginar un jardín con salida fácil; se puede escuchar o pasar" },
      result: "guarda el resultado para ti o no lo expreses. no hay puntuación, rachas, registro ni obligación de compartir",
      pause: "pausa", resume: "volver al paso", skip: "omitir", exit: "terminar", restart: "abrir de nuevo",
      paused: "en pausa · nada continúa por sí solo", skipped: "paso omitido · no hace falta recuperar", closed: "ruta terminada · se borraron las elecciones de esta pantalla",
      samurai: "Samurai Dharma · otra ruta de juego", angels: "cómo funcionan los ángeles del cuidado",
      review: "edición en español · revisión editorial independiente pendiente", campaign: "95 días naturales: 90 pasos y 5 días opcionales de cierre",
      cadence: "90 pasos · no hace falta avanzar a diario · el contador se reinicia al cerrar o recargar esta página",
      turnLabel: "paso {turn} de 90", completeTurn: "completar este paso", completed: "90 pasos completados · tus respuestas no se guardaron; puedes terminar aquí",
    },
    "pt-BR": {
      kicker: "NITYA × anjos do cuidado · prática opcional", title: "90 dias de pequenos passos",
      lead: "seu dia 1 pode ser hoje. escolha um passo possível de 3-10 minutos; mude o ritmo, pule dias ou termine sem acumular pendências",
      privacy: "é uma prática local: respostas, contexto e data de início não são salvos nem enviados. aqui não se conecta serviço, notificações ou rede de participantes",
      contexts: "escolher contexto · opcional",
      contextHelp: "nada vem selecionado. é um contexto de leitura, não verificação nem certificação etária. 21+, 33+ e 55+ não atribuem características ou necessidades",
      caregiver: "para pais, responsáveis ou educadores: um passo compartilhado fora da tela, com ficção. a rota infantil requer revisão local de proteção e consentimento; não peça dados, fotos ou histórias pessoais da criança",
      education: "para o adulto responsável: use a rota adolescente em contexto educativo ou familiar adequado, após revisar proteção, consentimento e regras da plataforma. mensagens privadas e relatos pessoais não são necessários",
      adult: "cada adulto escolhe tema, idioma e ritmo. os mesmos passos estão disponíveis para todos os adultos; é possível usar a rota geral sem informar idade",
      childLabel: "0+ · para o adulto ao lado", teenLabel: "12+ · com adulto responsável",
      start: "experimentar o dia 1 hoje", window: "janela de 90 dias corridos", topic: "qual passo você escolhe?",
      topics: { language: "linguagem", care: "cuidado", world: "mundo" },
      prompts: { language: "imagine duas frases claras com que um personagem fictício possa pedir mais tempo", care: "escolha uma coisa pequena que seja fácil devolver ao lugar, ou simplesmente faça uma pausa", world: "imagine um jardim tranquilo e uma regra que permita a qualquer pessoa sair livremente" },
      childPrompts: { language: "o adulto propõe a um personagem “posso fazer uma pausa?”; não é preciso responder", care: "adulto e criança podem observar uma cor próxima juntos, sem fotos nem registro de respostas", world: "o adulto sugere imaginar um jardim com uma saída fácil; pode apenas ouvir ou pular" },
      result: "guarde o resultado para si ou deixe sem palavras. não há pontuação, sequência, cadastro nem obrigação de compartilhar",
      pause: "pausa", resume: "voltar ao passo", skip: "pular", exit: "terminar", restart: "abrir novamente",
      paused: "em pausa · nada continua sozinho", skipped: "passo pulado · não é preciso compensar", closed: "rota encerrada · as escolhas desta tela foram limpas",
      samurai: "Samurai Dharma · outra rota de jogo", angels: "como funcionam os anjos do cuidado",
      review: "edição em português · revisão editorial independente pendente", campaign: "95 dias corridos: 90 passos e 5 dias opcionais de encerramento",
      cadence: "90 passos · não é preciso avançar todos os dias · o contador reinicia ao fechar ou recarregar esta página",
      turnLabel: "passo {turn} de 90", completeTurn: "concluir este passo", completed: "90 passos concluídos · suas respostas não foram salvas; você pode parar aqui",
    },
  };

  const additionalCopy = {
    "zh-Hans": {
      "kicker": "NITYA × 关怀天使 · 自愿练习",
      "title": "90天的小小行动",
      "lead": "今天可以是你的第1天。选择一个3–10分钟的小行动；可以调整节奏、跳过或结束，无需补做。",
      "privacy": "此练习在本地进行：回答、情境选择和开始日期不会保存或发送。此处不连接服务、通知或参与者网络。",
      "contexts": "选择情境 · 可选",
      "contextHelp": "没有预先选择。这是阅读情境，不是年龄核验或认证。年龄标签不会定义任何人的特征或需求。",
      "caregiver": "供家长、监护人或教育者使用：通过虚构情景进行线下共同练习。儿童路线需先完成本地保护与同意审查；不要索取儿童资料、照片或个人故事。",
      "education": "由负责的成年人在适当的教育或家庭环境中使用青少年路线，并先审查保护、同意和平台规则。无需私信或个人披露。",
      "adult": "成年人自行选择主题、语言和节奏。所有成年人都可使用同样的练习，也可不说明年龄。",
      "childLabel": "0+ · 由身边成年人陪同",
      "teenLabel": "12+ · 由负责的成年人陪同",
      "start": "今天尝试第1天",
      "window": "个人90天窗口",
      "topic": "你想选择哪种行动？",
      "topics": {
        "language": "语言",
        "care": "关怀",
        "world": "世界"
      },
      "prompts": {
        "language": "想象一个虚构角色可以用哪两句清楚的话请求更多时间。",
        "care": "选择一件容易归位的小物，或只是暂停片刻。",
        "world": "想象一座安静的花园，以及一条让每个人都能自由离开的规则。"
      },
      "childPrompts": {
        "language": "成年人向角色提出“我可以暂停一下吗？”这句话；不必回答。",
        "care": "成年人和孩子可以一起留意附近的一种颜色，不拍照、不记录回答。",
        "world": "成年人邀请想象一座有方便出口的花园；只听或跳过都可以。"
      },
      "result": "结果可以留给自己，也可以不说出来。没有分数、连续打卡、注册或分享义务。",
      "pause": "暂停",
      "resume": "继续",
      "skip": "跳过",
      "exit": "结束",
      "restart": "重新打开",
      "paused": "已暂停 · 不会自动继续",
      "skipped": "已跳过 · 无需补做",
      "closed": "路线已结束 · 本页选择已清除",
      "samurai": "Samurai Dharma · 另一条游戏路线",
      "angels": "了解关怀天使",
      "review": "中文译稿 · 独立编辑审校待完成",
      "campaign": "95个日历日：90次行动和5个可选收尾日",
      "cadence": "90次行动 · 无需每天进行 · 关闭或重新加载页面后计数会清零",
      "turnLabel": "第 {turn} 次，共90次",
      "completeTurn": "完成这一步",
      "completed": "90次行动已完成 · 你的回答没有保存；可以在这里结束"
    },
    "hi": {
      "kicker": "NITYA × देखभाल के फ़रिश्ते · वैकल्पिक अभ्यास",
      "title": "छोटे कदमों के 90 दिन",
      "lead": "आज तुम्हारा पहला दिन हो सकता है। 3–10 मिनट का सहज कदम चुनो; गति बदलो, दिन छोड़ो या बिना भरपाई के रुक जाओ।",
      "privacy": "यह स्थानीय अभ्यास है: उत्तर, संदर्भ और आरंभ की तारीख सहेजे या भेजे नहीं जाते। कोई सेवा, सूचना या प्रतिभागी नेटवर्क जुड़ा नहीं है।",
      "contexts": "संदर्भ चुनें · वैकल्पिक",
      "contextHelp": "कुछ पहले से नहीं चुना गया है। यह पढ़ने का संदर्भ है, उम्र की जाँच या प्रमाणन नहीं। उम्र के संकेत किसी के गुण या ज़रूरत तय नहीं करते।",
      "caregiver": "माता-पिता, अभिभावक या शिक्षक के लिए: काल्पनिक दृश्य के साथ ऑफ़लाइन साझा अभ्यास। बच्चों वाला मार्ग स्थानीय सुरक्षा और सहमति समीक्षा के बाद ही; बच्चे का डेटा, फोटो या निजी कहानी न माँगें।",
      "education": "ज़िम्मेदार वयस्क उपयुक्त शिक्षा या पारिवारिक परिवेश में सुरक्षा, सहमति और मंच के नियम जाँचकर किशोर मार्ग चुनें। निजी संदेश या निजी अनुभव बताना ज़रूरी नहीं।",
      "adult": "हर वयस्क विषय, भाषा और गति स्वयं चुनता है। सभी वयस्क समान अभ्यास कर सकते हैं; उम्र बताना आवश्यक नहीं।",
      "childLabel": "0+ · साथ में वयस्क",
      "teenLabel": "12+ · ज़िम्मेदार वयस्क के साथ",
      "start": "आज पहला दिन आज़माएँ",
      "window": "व्यक्तिगत 90-दिन की अवधि",
      "topic": "कौन-सा कदम चुनोगे?",
      "topics": {
        "language": "भाषा",
        "care": "देखभाल",
        "world": "दुनिया"
      },
      "prompts": {
        "language": "सोचो, कोई काल्पनिक पात्र अधिक समय माँगने के लिए कौन-से दो साफ़ वाक्य कह सकता है।",
        "care": "एक छोटी चीज़ चुनो जिसे आसानी से जगह पर रखा जा सके, या बस थोड़ा ठहरो।",
        "world": "एक शांत बगीचे और ऐसे नियम की कल्पना करो जिससे हर कोई आसानी से बाहर जा सके।"
      },
      "childPrompts": {
        "language": "वयस्क पात्र को वाक्य सुझाए: “क्या मैं थोड़ा रुक सकता/सकती हूँ?” जवाब देना ज़रूरी नहीं।",
        "care": "वयस्क और बच्चा पास का एक रंग साथ में देख सकते हैं; न तस्वीर, न जवाब का लेखा।",
        "world": "वयस्क आसान निकास वाले बगीचे की कल्पना सुझाए; सुनना या छोड़ना दोनों ठीक हैं।"
      },
      "result": "नतीजा अपने पास रखो या शब्दों में न कहो। कोई अंक, लगातार दिन, पंजीकरण या साझा करने की बाध्यता नहीं।",
      "pause": "ठहरें",
      "resume": "वापस आएँ",
      "skip": "छोड़ें",
      "exit": "समाप्त करें",
      "restart": "फिर खोलें",
      "paused": "रुका हुआ · कुछ अपने आप आगे नहीं बढ़ेगा",
      "skipped": "कदम छोड़ा · भरपाई की ज़रूरत नहीं",
      "closed": "मार्ग समाप्त · इस स्क्रीन के चुनाव साफ़ कर दिए गए",
      "samurai": "Samurai Dharma · खेल का दूसरा मार्ग",
      "angels": "देखभाल के फ़रिश्ते कैसे काम करते हैं",
      "review": "हिन्दी अनुवाद मसौदा · स्वतंत्र संपादकीय समीक्षा बाकी",
      "campaign": "95 कैलेंडर दिन: 90 कदम और 5 वैकल्पिक समापन दिवस",
      "cadence": "90 कदम · रोज़ करना ज़रूरी नहीं · पृष्ठ बंद या फिर से लोड करने पर गिनती मिट जाती है",
      "turnLabel": "90 में से कदम {turn}",
      "completeTurn": "यह कदम पूरा करें",
      "completed": "90 कदम पूरे · तुम्हारे उत्तर सहेजे नहीं गए; यहीं रुक सकते हो"
    },
    "fr": {
      "kicker": "NITYA × Anges de la bienveillance · pratique libre",
      "title": "90 jours de petits pas",
      "lead": "Ton premier jour peut être aujourd’hui. Choisis un pas de 3 à 10 minutes ; change de rythme, passe un jour ou arrête sans rattrapage.",
      "privacy": "Cette pratique reste locale : réponses, contexte et date de début ne sont ni enregistrés ni envoyés. Aucun service, rappel ou réseau de participants n’est connecté ici.",
      "contexts": "Choisir un contexte · facultatif",
      "contextHelp": "Aucun choix n’est fait à l’avance. Il s’agit d’un contexte de lecture, pas d’une vérification ou certification d’âge. Les tranches d’âge ne définissent ni traits ni besoins.",
      "caregiver": "Pour un parent, un tuteur ou un éducateur : une activité hors ligne autour d’une fiction. Le parcours enfant exige une vérification locale de la protection et du consentement ; ne demandez ni données, ni photos, ni récits personnels d’enfant.",
      "education": "L’adulte responsable n’utilise le parcours ado que dans un cadre éducatif ou familial adapté, après vérification de la protection, du consentement et des règles de la plateforme. Aucun message privé ni récit intime n’est nécessaire.",
      "adult": "Chaque adulte choisit son thème, sa langue et son rythme. Les mêmes activités sont ouvertes à tous ; l’âge n’a pas à être indiqué.",
      "childLabel": "0+ · avec un adulte",
      "teenLabel": "12+ · avec un adulte responsable",
      "start": "Essayer le jour 1 aujourd’hui",
      "window": "Fenêtre personnelle de 90 jours",
      "topic": "Quel pas choisis-tu ?",
      "topics": {
        "language": "langue",
        "care": "attention",
        "world": "monde"
      },
      "prompts": {
        "language": "Imagine deux phrases claires qu’un personnage fictif pourrait dire pour demander plus de temps.",
        "care": "Choisis une petite chose facile à remettre en place, ou prends simplement une pause.",
        "world": "Imagine un jardin calme et une règle qui permet à chacun de sortir librement."
      },
      "childPrompts": {
        "language": "L’adulte propose à un personnage : « Puis-je faire une pause ? » Aucune réponse n’est requise.",
        "care": "Un adulte et un enfant peuvent remarquer ensemble une couleur proche, sans photo ni note des réponses.",
        "world": "L’adulte invite à imaginer un jardin avec une sortie facile ; écouter ou passer, c’est bien aussi."
      },
      "result": "Garde le résultat pour toi ou laisse-le sans mots. Pas de score, de série, d’inscription ni d’obligation de partager.",
      "pause": "pause",
      "resume": "reprendre",
      "skip": "passer",
      "exit": "terminer",
      "restart": "rouvrir",
      "paused": "en pause · rien ne continue seul",
      "skipped": "pas passé · rien à rattraper",
      "closed": "parcours terminé · les choix de cet écran sont effacés",
      "samurai": "Samurai Dharma · autre parcours de jeu",
      "angels": "comment fonctionnent les Anges de la bienveillance",
      "review": "Version française · relecture éditoriale indépendante à faire",
      "campaign": "95 jours calendaires : 90 pas et 5 jours de clôture facultatifs",
      "cadence": "90 pas · aucun rythme quotidien obligatoire · le compteur revient à zéro quand la page est fermée ou rechargée",
      "turnLabel": "pas {turn} sur 90",
      "completeTurn": "terminer ce pas",
      "completed": "90 pas terminés · tes réponses n’ont pas été enregistrées ; tu peux t’arrêter ici"
    },
    "ar": {
      "kicker": "NITYA × ملائكة الرعاية · ممارسة اختيارية",
      "title": "تسعون يومًا من الخطوات الصغيرة",
      "lead": "يمكن أن يكون اليوم يومك الأول. اختر خطوة من 3 إلى 10 دقائق؛ غيّر الإيقاع أو تجاوز يومًا أو توقّف من دون تعويض.",
      "privacy": "هذه ممارسة محلية: لا تُحفظ الإجابات أو اختيارات السياق أو تاريخ البداية ولا تُرسل. لا توجد هنا خدمة أو إشعارات أو شبكة مشاركين متصلة.",
      "contexts": "اختر سياقًا · اختياري",
      "contextHelp": "لا يوجد اختيار مسبق. هذا سياق للقراءة، وليس تحققًا من العمر أو شهادة عمرية. الفئات لا تحدد صفات الأشخاص أو احتياجاتهم.",
      "caregiver": "للأهل أو الأوصياء أو المعلّمين: نشاط مشترك خارج الشاشة باستخدام قصة متخيّلة. يحتاج مسار الأطفال إلى مراجعة محلية للحماية والموافقة؛ لا تطلب بيانات الأطفال أو صورهم أو قصصهم الشخصية.",
      "education": "يستخدم البالغ المسؤول مسار اليافعين في بيئة تعليمية أو أسرية مناسبة بعد مراجعة الحماية والموافقة وقواعد المنصة. لا حاجة إلى رسائل خاصة أو إفصاحات شخصية.",
      "adult": "يختار كل بالغ الموضوع واللغة والإيقاع بنفسه. الخطوات نفسها متاحة للجميع، ولا يلزم ذكر العمر.",
      "childLabel": "0+ · برفقة بالغ",
      "teenLabel": "12+ · مع بالغ مسؤول",
      "start": "جرّب اليوم الأول اليوم",
      "window": "نافذة شخصية من 90 يومًا",
      "topic": "أي خطوة تختار؟",
      "topics": {
        "language": "اللغة",
        "care": "الرعاية",
        "world": "العالم"
      },
      "prompts": {
        "language": "تخيّل عبارتين واضحتين يمكن لشخصية خيالية استخدامهما لطلب مزيد من الوقت.",
        "care": "اختر شيئًا صغيرًا يسهل إعادته إلى مكانه، أو خذ استراحة فحسب.",
        "world": "تخيّل حديقة هادئة وقاعدة تتيح لكل شخص المغادرة بحرية."
      },
      "childPrompts": {
        "language": "يقترح البالغ على الشخصية عبارة «هل يمكنني التوقف قليلًا؟» ولا يلزم الرد.",
        "care": "يمكن لبالغ وطفل ملاحظة لون قريب معًا، بلا صور أو تدوين للإجابات.",
        "world": "يقترح البالغ تخيّل حديقة ذات مخرج سهل؛ يمكن الاكتفاء بالاستماع أو التخطي."
      },
      "result": "احتفظ بالنتيجة لنفسك أو لا تصغها. لا نقاط ولا سلسلة أيام ولا تسجيل ولا التزام بالمشاركة.",
      "pause": "توقّف مؤقتًا",
      "resume": "تابع",
      "skip": "تخطَّ",
      "exit": "أنه",
      "restart": "افتح من جديد",
      "paused": "متوقف مؤقتًا · لن يستمر شيء تلقائيًا",
      "skipped": "تم التخطي · لا حاجة للتعويض",
      "closed": "انتهى المسار · مُسحت اختيارات هذه الشاشة",
      "samurai": "Samurai Dharma · مسار لعب آخر",
      "angels": "كيف تعمل ملائكة الرعاية",
      "review": "مسودة عربية · المراجعة التحريرية المستقلة معلّقة",
      "campaign": "95 يومًا تقويميًا: 90 خطوة و5 أيام اختيارية للختام",
      "cadence": "90 خطوة · لا يلزم التقدّم يوميًا · يُعاد ضبط العدّاد عند إغلاق الصفحة أو إعادة تحميلها",
      "turnLabel": "الخطوة {turn} من 90",
      "completeTurn": "أكمل هذه الخطوة",
      "completed": "اكتملت 90 خطوة · لم تُحفظ إجاباتك؛ يمكنك التوقف هنا"
    },
    "bn": {
      "kicker": "NITYA × যত্নের দেবদূত · ঐচ্ছিক অনুশীলন",
      "title": "ছোট ছোট পদক্ষেপের ৯০ দিন",
      "lead": "আজই তোমার প্রথম দিন হতে পারে। ৩–১০ মিনিটের একটি সহজ পদক্ষেপ বেছে নাও; গতি বদলাও, দিন বাদ দাও বা কোনো বকেয়া ছাড়াই থেমে যাও।",
      "privacy": "এটি স্থানীয় অনুশীলন: উত্তর, প্রসঙ্গ ও শুরুর তারিখ সংরক্ষণ বা পাঠানো হয় না। এখানে কোনো পরিষেবা, বিজ্ঞপ্তি বা অংশগ্রহণকারী নেটওয়ার্ক যুক্ত নেই।",
      "contexts": "প্রসঙ্গ বেছে নাও · ঐচ্ছিক",
      "contextHelp": "আগে থেকে কিছু বাছাই করা নেই। এটি পড়ার প্রসঙ্গ, বয়স যাচাই বা সনদ নয়। বয়সের পরিসর কারও বৈশিষ্ট্য বা প্রয়োজন নির্ধারণ করে না।",
      "caregiver": "অভিভাবক বা শিক্ষকের জন্য: কল্পিত গল্প নিয়ে অফলাইন যৌথ অনুশীলন। শিশুর পথ ব্যবহারের আগে স্থানীয় সুরক্ষা ও সম্মতি পর্যালোচনা জরুরি; শিশুর তথ্য, ছবি বা ব্যক্তিগত গল্প চাইবে না।",
      "education": "দায়িত্বশীল প্রাপ্তবয়স্ক উপযুক্ত শিক্ষা বা পারিবারিক পরিবেশে সুরক্ষা, সম্মতি ও প্ল্যাটফর্মের নিয়ম যাচাই করে কিশোর পথ ব্যবহার করবেন। ব্যক্তিগত বার্তা বা অভিজ্ঞতা বলা জরুরি নয়।",
      "adult": "প্রত্যেক প্রাপ্তবয়স্ক বিষয়, ভাষা ও গতি নিজে বেছে নেন। একই পদক্ষেপ সবার জন্য; বয়স জানাতে হয় না।",
      "childLabel": "0+ · পাশে প্রাপ্তবয়স্ক",
      "teenLabel": "12+ · দায়িত্বশীল প্রাপ্তবয়স্কের সঙ্গে",
      "start": "আজ প্রথম দিনটি চেষ্টা করো",
      "window": "ব্যক্তিগত ৯০ দিনের সময়সীমা",
      "topic": "কোন পদক্ষেপটি বেছে নেবে?",
      "topics": {
        "language": "ভাষা",
        "care": "যত্ন",
        "world": "বিশ্ব"
      },
      "prompts": {
        "language": "ভাবো, কাল্পনিক চরিত্রটি আরও সময় চাইতে কোন দুটি স্পষ্ট বাক্য বলতে পারে।",
        "care": "সহজে জায়গায় ফেরানো যায় এমন ছোট একটি জিনিস বেছে নাও, অথবা একটু থামো।",
        "world": "একটি শান্ত বাগান ও এমন নিয়ম কল্পনা করো যাতে সবাই স্বাধীনভাবে বের হতে পারে।"
      },
      "childPrompts": {
        "language": "প্রাপ্তবয়স্ক চরিত্রটিকে বলে: ‘আমি কি একটু বিরতি নিতে পারি?’ উত্তর দেওয়ার দরকার নেই।",
        "care": "প্রাপ্তবয়স্ক ও শিশু কাছের একটি রং একসঙ্গে খেয়াল করতে পারে; ছবি বা উত্তর লিখে রাখা নয়।",
        "world": "প্রাপ্তবয়স্ক সহজ বেরোনোর পথসহ বাগান কল্পনা করতে বলেন; শোনা বা বাদ দেওয়া দুটোই ঠিক।"
      },
      "result": "ফল নিজের কাছে রাখো বা না বললেও চলে। কোনো নম্বর, ধারাবাহিকতা, নিবন্ধন বা ভাগ করার বাধ্যবাধকতা নেই।",
      "pause": "বিরতি",
      "resume": "ফিরে এসো",
      "skip": "বাদ দাও",
      "exit": "শেষ করো",
      "restart": "আবার খোলো",
      "paused": "বিরতি · কিছু নিজে থেকে চলবে না",
      "skipped": "পদক্ষেপ বাদ · পুষিয়ে নেওয়ার দরকার নেই",
      "closed": "পথ শেষ · এই পর্দার পছন্দ মুছে গেছে",
      "samurai": "Samurai Dharma · খেলার অন্য পথ",
      "angels": "যত্নের দেবদূতেরা কীভাবে কাজ করেন",
      "review": "বাংলা অনুবাদ খসড়া · স্বাধীন সম্পাদকীয় পর্যালোচনা বাকি",
      "campaign": "৯৫টি ক্যালেন্ডার দিন: ৯০টি পদক্ষেপ ও ৫টি ঐচ্ছিক সমাপনী দিন",
      "cadence": "৯০টি পদক্ষেপ · প্রতিদিন এগোনো বাধ্যতামূলক নয় · পৃষ্ঠা বন্ধ বা পুনরায় লোড করলে গণনা শূন্য হবে",
      "turnLabel": "৯০টির মধ্যে পদক্ষেপ {turn}",
      "completeTurn": "এই পদক্ষেপটি সম্পূর্ণ করো",
      "completed": "৯০টি পদক্ষেপ সম্পূর্ণ · তোমার উত্তর সংরক্ষণ করা হয়নি; এখানে থামতে পারো"
    },
    "eo": {
      "kicker": "NITYA × Anĝeloj de Zorgo · libervola praktiko",
      "title": "90 tagoj de etaj paŝoj",
      "lead": "Hodiaŭ povas esti via unua tago. Elektu realigeblan paŝon de 3–10 minutoj; ŝanĝu la ritmon, preterlasu tagon aŭ ĉesu sen ŝuldo.",
      "privacy": "Tio estas loka praktiko: respondoj, kunteksto kaj komenca dato nek konserviĝas nek sendiĝas. Neniu servo, atentigo aŭ partoprenanta reto estas konektita ĉi tie.",
      "contexts": "Elektu kuntekston · laŭvole",
      "contextHelp": "Nenio estas elektita antaŭe. Tio estas legado-kunteksto, ne aĝkontrolo aŭ atesto. Aĝgrupoj ne difinas trajtojn aŭ bezonojn.",
      "caregiver": "Por gepatro, prizorganto aŭ edukisto: komuna senreta paŝo per fikcia situacio. La infana vojo bezonas lokan sekurecan kaj konsentan kontrolon; ne petu infanajn datumojn, fotojn aŭ personajn rakontojn.",
      "education": "La respondeca plenkreskulo uzu la adoleskan vojon en taŭga eduka aŭ familia medio post kontrolo de sekureco, konsento kaj platformaj reguloj. Privataj mesaĝoj kaj personaj konfesoj ne necesas.",
      "adult": "Ĉiu plenkreskulo elektas temon, lingvon kaj ritmon. La samaj paŝoj disponeblas por ĉiuj; aĝon ne necesas diri.",
      "childLabel": "0+ · kun plenkreskulo",
      "teenLabel": "12+ · kun respondeca plenkreskulo",
      "start": "Provu la unuan tagon hodiaŭ",
      "window": "Persona 90-taga periodo",
      "topic": "Kiun paŝon vi elektas?",
      "topics": {
        "language": "lingvo",
        "care": "zorgo",
        "world": "mondo"
      },
      "prompts": {
        "language": "Imagu du klarajn frazojn, per kiuj fikcia rolulo povus peti pli da tempo.",
        "care": "Elektu etan objekton facile remeteblan, aŭ simple paŭzu.",
        "world": "Imagu trankvilan ĝardenon kaj regulon, kiu lasas ĉiun libere foriri."
      },
      "childPrompts": {
        "language": "La plenkreskulo proponas al rolulo: “Ĉu mi povas paŭzi?” Respondi ne necesas.",
        "care": "Plenkreskulo kaj infano povas kune rimarki proksiman koloron, sen fotoj aŭ notado de respondoj.",
        "world": "La plenkreskulo proponas imagi ĝardenon kun facila elirejo; aŭskulti aŭ preterlasi estas en ordo."
      },
      "result": "Konservu la rezulton por vi aŭ lasu ĝin nedirita. Neniu poentaro, sinsekvo, registriĝo aŭ devo kunhavigi.",
      "pause": "paŭzi",
      "resume": "reveni",
      "skip": "preterlasi",
      "exit": "fini",
      "restart": "remalfermi",
      "paused": "paŭzita · nenio daŭros mem",
      "skipped": "paŝo preterlasita · nenio por kompensi",
      "closed": "vojo finita · elektoj de ĉi tiu ekrano forigitaj",
      "samurai": "Samurai Dharma · alia ludvojo",
      "angels": "kiel funkcias Anĝeloj de Zorgo",
      "review": "Esperanta redakta projekto · sendependa revizio bezonata",
      "campaign": "95 kalendaraj tagoj: 90 paŝoj kaj 5 laŭvolaj finaj tagoj",
      "cadence": "90 paŝoj · ĉiutaga ritmo ne estas deviga · la nombrilo rekomenciĝas kiam la paĝo fermiĝas aŭ reŝargiĝas",
      "turnLabel": "paŝo {turn} el 90",
      "completeTurn": "kompletigi ĉi tiun paŝon",
      "completed": "90 paŝoj kompletaj · viaj respondoj ne konserviĝis; vi povas fini ĉi tie"
    },
    "sa": {
      "kicker": "NITYA × परिचर्यादूताः · ऐच्छिकः अभ्यासः",
      "title": "लघुचरणानां नवतिदिनानि",
      "lead": "अद्य तव प्रथमः दिवसः भवितुम् अर्हति। त्रिभ्यः दश निमेषेभ्यः यावत् साध्यं चरणं वृणु; गतिं परिवर्तय, दिवसान् त्यज, ऋणभावं विना विरम।",
      "privacy": "अयं स्थानीयः अभ्यासः। उत्तराणि, प्रसङ्गः, आरम्भदिनाङ्कश्च न सञ्चीयन्ते न प्रेष्यन्ते। अत्र सेवा, सूचनाः, सहभागिजालं वा न संयोजितम्।",
      "contexts": "प्रसङ्गं वृणु · ऐच्छिकम्",
      "contextHelp": "पूर्वनिर्वाचनं नास्ति। अयं पाठप्रसङ्गः, न आयुपरीक्षा प्रमाणपत्रं वा। आयुविभागाः गुणान् आवश्यकताश्च न निर्धारयन्ति।",
      "caregiver": "मातृपित्रोः संरक्षकस्य शिक्षकस्य वा कृते: कल्पितकथया सह सञ्जालरहितः संयुक्ताभ्यासः। बालमार्गे स्थानीयं संरक्षणसम्मतिपरीक्षणम् आवश्यकम्; बालदत्तांशं चित्राणि निजकथाश्च मा याचस्व।",
      "education": "उत्तरदायी वयस्कः उचिते शिक्षापारिवारिकवातावरणे संरक्षणं सम्मतिं मञ्चनियमांश्च परीक्ष्य किशोरमार्गं प्रयुञ्जीत। निजी सन्देशाः निजानुभवप्रकाशनं च न आवश्यकम्।",
      "adult": "प्रत्येकः वयस्कः विषयं भाषां गतिं च स्वयमेव वृणुते। समानाः चरणाः सर्वेषां वयस्कानां कृते; आयुः वक्तुं न आवश्यकम्।",
      "childLabel": "0+ · समीपे वयस्कः",
      "teenLabel": "12+ · उत्तरदायिना वयस्केन सह",
      "start": "अद्य प्रथमदिवसं प्रयुङ्क्ष्व",
      "window": "व्यक्तिगतं नवतिदिनकालम्",
      "topic": "कं चरणं वृणोषि?",
      "topics": {
        "language": "भाषा",
        "care": "परिचर्या",
        "world": "जगत्"
      },
      "prompts": {
        "language": "कल्पितपात्रं अधिकसमयं याचितुं यौ स्पष्टौ वाक्यौ वदेत् तौ चिन्तय।",
        "care": "सहजं पुनःस्थापयितुं शक्यं लघुवस्तु वृणु अथवा विरम।",
        "world": "शान्तं उद्यानं कल्पय, तथा नियमं यः सर्वेभ्यः स्वेच्छया निर्गन्तुं ददाति।"
      },
      "childPrompts": {
        "language": "वयस्कः पात्राय वदति: “किं विरामं कर्तुं शक्नोमि?” उत्तरं न आवश्यकम्।",
        "care": "वयस्कः बालकश्च समीपस्थं वर्णं सह पश्येताम्; चित्रलेखनं उत्तरलेखनं च विना।",
        "world": "वयस्कः सुगमनिर्गमयुक्तम् उद्यानं कल्पयितुं वदति; शृण्वितुं त्यक्तुं वा शक्यते।"
      },
      "result": "फलम् आत्मनि स्थापय अथवा मा वद। अत्र अङ्काः, क्रमिकदिनानि, पञ्जीकरणं, सहभागिताबाध्यता च नास्ति।",
      "pause": "विरम",
      "resume": "पुनरागच्छ",
      "skip": "त्यज",
      "exit": "समापय",
      "restart": "पुनरुद्घाटय",
      "paused": "विरतम् · किमपि स्वतः न प्रवर्तते",
      "skipped": "चरणः त्यक्तः · पूरणं न आवश्यकम्",
      "closed": "मार्गः समाप्तः · अस्य पृष्ठस्य विकल्पाः निरस्ताः",
      "samurai": "Samurai Dharma · अन्यः क्रीडामार्गः",
      "angels": "परिचर्यादूताः कथं कार्यं कुर्वन्ति",
      "review": "संस्कृत-प्रारूपम् · विशेषज्ञस्य स्वतन्त्रसमीक्षा अपेक्षिता",
      "campaign": "पञ्चनवतिः दिनाः: नवतिः चरणाः पञ्च ऐच्छिकसमापनदिनानि च",
      "cadence": "नवतिः चरणाः · प्रतिदिन करणं न आवश्यकम् · पृष्ठं पिधाय पुनःभारयित्वा गणना पुनः शून्यं भवति",
      "turnLabel": "नवतौ चरणेषु {turn} चरणः",
      "completeTurn": "एतं चरणं समापय",
      "completed": "नवतिः चरणाः समाप्ताः · तव उत्तराणि न सञ्चितानि; अत्र विरमितुं शक्नोषि"
    },
    "la": {
      "kicker": "NITYA × Angeli Curae · exercitatio voluntaria",
      "title": "Nonaginta dies parvorum graduum",
      "lead": "Hodie primus tuus dies esse potest. Gradum trium ad decem minutorum elige; cursum muta, dies omitte aut sine debito desine.",
      "privacy": "Exercitatio localis est: responsa, contextus et dies initii nec servantur nec mittuntur. Nulla officia, notificationes aut retis participantium hic conectuntur.",
      "contexts": "Contextum elige · libere",
      "contextHelp": "Nihil antea electum est. Hic contextus lectionis est, non aetas probata aut certificata. Ordines aetatis proprietates aut necessitates non definiunt.",
      "caregiver": "Parentibus, curatoribus aut educatoribus: exercitatio communis sine rete, fabula ficta adhibita. Via puerilis localem tutelae et consensus recognitionem requirit; ne pueri data, imagines aut fabulas personales petas.",
      "education": "Adultus responsalis viam adolescentium in apto ambitu scholastico aut familiari adhibeat, tutela, consensu et regulis suggestus recognitis. Nuntii privati aut confessiones personales non requiruntur.",
      "adult": "Quisque adultus thema, linguam et cursum eligit. Eadem exercitia omnibus adultis patent; aetatem indicare non necesse est.",
      "childLabel": "0+ · adulto praesente",
      "teenLabel": "12+ · cum adulto responsali",
      "start": "Hodie diem primum proba",
      "window": "Spatium personale nonaginta dierum",
      "topic": "Quem gradum eligis?",
      "topics": {
        "language": "lingua",
        "care": "cura",
        "world": "mundus"
      },
      "prompts": {
        "language": "Finge duas sententias claras quibus persona ficta plus temporis petat.",
        "care": "Rem parvam elige quam facile suo loco ponas, aut simpliciter pausa.",
        "world": "Hortum quietum et regulam finge quae omnibus liberum exitum praebeat."
      },
      "childPrompts": {
        "language": "Adultus personae dicit: “Pausam facere possum?” Respondere non opus est.",
        "care": "Adultus et puer unum colorem propinquum simul animadvertere possunt, sine imaginibus aut responsis scriptis.",
        "world": "Adultus hortum facile exeundum fingere proponit; audire aut omittere licet."
      },
      "result": "Exitum tibi serva aut sine verbis relinque. Nulla puncta, series, inscriptio aut communicandi obligatio.",
      "pause": "pausa",
      "resume": "redire",
      "skip": "omittere",
      "exit": "finire",
      "restart": "recludere",
      "paused": "pausatum · nihil sponte perget",
      "skipped": "gradus omissus · supplere non opus est",
      "closed": "via finita · electiones huius paginae deletae",
      "samurai": "Samurai Dharma · alia via ludendi",
      "angels": "quomodo Angeli Curae operantur",
      "review": "Exemplar Latinum · recognitio editorialis independens pendet",
      "campaign": "95 dies calendarii: 90 gradus et 5 dies clausurae voluntarii",
      "cadence": "90 gradus · cotidie progredi non necesse est · numerus ad nihilum redit pagina clausa aut renovata",
      "turnLabel": "gradus {turn} ex 90",
      "completeTurn": "hunc gradum perficere",
      "completed": "90 gradus perfecti · responsa tua non servata sunt; hic desinere potes"
    }
  };

  const workingCycle = {
    ru: { title: "рабочий цикл SUTI", steps: ["вопрос", "слова", "связи", "проверка", "выбор", "действие", "след", "уточнение"], note: "факты, наблюдения, интерпретации, гипотезы, символы и неизвестное остаются различимыми. формулировку можно исправить; решение и глубину выбираешь ты" },
    en: { title: "the SUTI working cycle", steps: ["question", "words", "relations", "check", "choice", "action", "trace", "adapt"], note: "facts, observations, interpretations, hypotheses, symbols, and unknowns stay distinct. wording can be revised; you choose the action and its depth" },
    es: { title: "ciclo de trabajo SUTI", steps: ["pregunta", "palabras", "relaciones", "comprobar", "elegir", "actuar", "registrar", "ajustar"], note: "hechos, observaciones, interpretaciones, hipótesis, símbolos y aspectos desconocidos se mantienen diferenciados. puedes corregir la formulación; tú eliges la acción y su alcance" },
    "pt-BR": { title: "ciclo de trabalho SUTI", steps: ["pergunta", "palavras", "relações", "verificar", "escolher", "agir", "registrar", "ajustar"], note: "fatos, observações, interpretações, hipóteses, símbolos e pontos desconhecidos permanecem distintos. você pode revisar a formulação e escolhe a ação e seu alcance" },
    "zh-Hans": { title: "SUTI 工作流程", steps: ["问题", "表达", "联系", "核查", "选择", "行动", "记录", "调整"], note: "事实、观察、解释、假设、象征与未知信息保持区分。措辞可以修改；行动及其范围由你选择。" },
    hi: { title: "SUTI कार्य-चक्र", steps: ["प्रश्न", "शब्द", "संबंध", "जाँच", "चुनाव", "कार्रवाई", "निशान", "अनुकूलन"], note: "तथ्य, अवलोकन, व्याख्या, परिकल्पना, प्रतीक और अज्ञात बातें अलग रखी जाती हैं। शब्द बदले जा सकते हैं; कदम और उसकी सीमा आप चुनते हैं।" },
    fr: { title: "cycle de travail SUTI", steps: ["question", "mots", "liens", "vérification", "choix", "action", "trace", "ajustement"], note: "faits, observations, interprétations, hypothèses, symboles et inconnues restent distincts. la formulation peut être revue ; tu choisis l’action et sa portée" },
    ar: { title: "دورة عمل SUTI", steps: ["سؤال", "كلمات", "روابط", "تحقق", "اختيار", "فعل", "أثر", "تعديل"], note: "تبقى الوقائع والملاحظات والتفسيرات والفرضيات والرموز والمجهولات متميزة. يمكن تعديل الصياغة؛ وأنت تختار الفعل ونطاقه" },
    bn: { title: "SUTI কাজের ধারা", steps: ["প্রশ্ন", "শব্দ", "সম্পর্ক", "যাচাই", "পছন্দ", "কাজ", "চিহ্ন", "পরিমার্জন"], note: "তথ্য, পর্যবেক্ষণ, ব্যাখ্যা, অনুমান, প্রতীক ও অজানা বিষয় আলাদা রাখা হয়। ভাষা সংশোধন করা যায়; কাজ ও তার পরিসর তুমি বেছে নাও।" },
    eo: { title: "labora ciklo de SUTI", steps: ["demando", "vortoj", "rilatoj", "kontrolo", "elekto", "ago", "spuro", "adaptado"], note: "faktoj, observoj, interpretoj, hipotezoj, simboloj kaj nekonatoj restas distingitaj. vortumon oni povas korekti; vi elektas la agon kaj ĝian amplekson" },
    sa: { title: "SUTI कार्यचक्रम्", steps: ["प्रश्नः", "शब्दाः", "सम्बन्धाः", "परीक्षा", "वरणम्", "कर्म", "चिह्नम्", "परिष्कारः"], note: "तथ्यानि, अवलोकनानि, व्याख्यानानि, परिकल्पनाः, प्रतीकानि, अज्ञातानि च पृथक् तिष्ठन्ति। वाक्यं संशोधयितुं शक्यते; कर्म तस्य सीमा च त्वया वरणीया।" },
    la: { title: "operandi cursus SUTI", steps: ["quaestio", "verba", "nexus", "probatio", "electio", "actio", "vestigium", "accommodatio"], note: "facta, observationes, interpretationes, hypotheses, symbola et ignota distincta manent. verba recognoscere licet; actionem eiusque modum tu eligis" },
    yzh: { title: "рабочий цикл SUTI · русская версия", steps: ["вопрос", "слова", "связи", "проверка", "выбор", "действие", "след", "уточнение"], note: "язэхъ остаётся авторским языковым экспериментом. факты, наблюдения, интерпретации, гипотезы, символы и неизвестное различаются; формулировку и следующий шаг выбирает человек" },
  };

  const editions = {
    ru: ['Русский', 'язык практики', 'дни практики', 'необязательное завершение'],
    en: ['English', 'practice language', 'practice days', 'optional closing days'],
    'es-419': ['Español', 'idioma de la práctica', 'días de práctica', 'días de cierre opcionales'],
    'pt-BR': ['Português brasileiro', 'idioma da prática', 'dias de prática', 'dias opcionais de encerramento'],
    fr: ['Français', 'langue de la pratique', 'jours de pratique', 'jours de clôture facultatifs'],
    ar: ['العربية', 'لغة التمرين', 'أيام التمرين', 'أيام الختام الاختيارية'],
    'zh-Hans': ['简体中文', '练习语言', '练习日', '可选收尾日'],
    hi: ['हिन्दी', 'अभ्यास की भाषा', 'अभ्यास के दिन', 'वैकल्पिक समापन दिवस'],
    bn: ['বাংলা', 'অনুশীলনের ভাষা', 'অনুশীলনের দিন', 'ঐচ্ছিক সমাপনী দিন'],
    eo: ['Esperanto', 'lingvo de la praktiko', 'praktikaj tagoj', 'laŭvolaj finaj tagoj'],
    sa: ['संस्कृतम्', 'अभ्यासस्य भाषा', 'अभ्यासदिनानि', 'ऐच्छिकसमापनदिनानि'],
    la: ['Latina', 'lingua exercitationis', 'dies exercitationis', 'dies clausurae voluntarii'],
    yzh: ['язэхъ · русский текст', 'язык практики', 'дни практики', 'необязательное завершение'],
  };
  const copies = { ...coreCopy, ...additionalCopy, 'es-419': coreCopy.es };
  const topics = ['language', 'care', 'world'];
  const contextOptions = ['caregiver', 'education', '18+', '21+', '33+', '55+'];
  const turnCount = 90;
  const campaignStart = '2026-11-13';
  const campaignPracticeEnd = '2027-02-10';
  const campaignClosingStart = '2027-02-11';
  const campaignEnd = '2027-02-15';

  function normalizeLanguage(value) {
    const aliases = { es: 'es-419', pt: 'pt-BR', zh: 'zh-Hans', 'zh-CN': 'zh-Hans' };
    const code = Object.hasOwn(aliases, value) ? aliases[value] : value;
    return Object.hasOwn(editions, code) ? code : null;
  }

  let language = normalizeLanguage(new URLSearchParams(location.search).get('lang'))
    ?? normalizeLanguage(document.documentElement.dataset.practiceLanguage)
    ?? normalizeLanguage(document.documentElement.lang) ?? 'ru';
  let context = null;
  let topic = null;
  let phase = 'ready';
  let startedAt = null;
  let turn = 1;

  const view = node('div');
  const announcement = node('p', '', { class: 'nitya-practice__announcer', role: 'status', 'aria-atomic': 'true' });
  mount.replaceChildren(view, announcement);

  function node(tag, content, attributes = {}) {
    const element = document.createElement(tag);
    if (content) element.textContent = content;
    for (const [key, value] of Object.entries(attributes)) element.setAttribute(key, value);
    return element;
  }

  function button(text, key, handler, primary = false) {
    const control = node('button', text, { type: 'button', 'data-focus': key });
    if (primary) control.classList.add('nitya-practice__primary');
    control.addEventListener('click', handler);
    return control;
  }

  function choice(text, key, isSelected, handler) {
    const control = button(text, key, handler);
    control.setAttribute('aria-pressed', String(isSelected));
    return control;
  }

  function details(title, kind) {
    const panel = node('details', '', { 'data-panel': kind });
    const label = node('summary', title, { 'data-focus': kind });
    panel.append(label);
    return panel;
  }

  function group(title, ...children) {
    const container = node('div', '', { class: 'nitya-practice__choices', role: 'group', 'aria-label': title });
    container.append(...children);
    return container;
  }

  function campaignInterval(label, start, end, format) {
    const row = node('li', `${label} · `);
    const interval = node('bdi', '', { class: 'nitya-practice__interval' });
    interval.append(
      node('time', format(start), { datetime: start }),
      document.createTextNode(' – '),
      node('time', format(end), { datetime: end }),
    );
    row.append(interval);
    return row;
  }

  function dateRangeFormat(code, options) {
    const formatter = new Intl.DateTimeFormat(code, { calendar: 'gregory', ...options });
    if (Intl.DateTimeFormat.supportedLocalesOf([code]).length) {
      return value => formatter.format(value);
    }
    // Keep an unambiguous numeric date where the browser lacks a date dictionary.
    const isoFormat = new Intl.DateTimeFormat('en-CA', {
      ...options, year: 'numeric', month: '2-digit', day: '2-digit',
    });
    return value => {
      const parts = Object.fromEntries(isoFormat.formatToParts(value).map(part => [part.type, part.value]));
      return `${parts.year}-${parts.month}-${parts.day}`;
    };
  }

  function setPhase(next, focus) {
    phase = next;
    render(focus);
  }

  function start() {
    startedAt ??= new Date();
    setPhase('active', 'turn');
  }

  function finish() {
    context = null;
    topic = null;
    startedAt = null;
    turn = 1;
    setPhase('closed', 'status');
  }

  function advance() {
    topic = null;
    if (turn >= turnCount) {
      setPhase('complete', 'status');
      return;
    }
    turn += 1;
    render('turn');
  }

  function renderTurn(t, dateLanguage, youngContext) {
    const area = node('div', '', { class: 'nitya-practice__turn' });
    const displayNumber = new Intl.NumberFormat(dateLanguage, { useGrouping: false }).format(turn);
    area.append(
      node('p', t.turnLabel.replace('{turn}', displayNumber), { class: 'nitya-practice__kicker' }),
      node('h3', t.topic, { tabindex: '-1', 'data-focus': 'turn' }),
      group(t.topic, ...topics.map(value => choice(t.topics[value], `topic-${value}`, topic === value, () => {
        topic = topic === value ? null : value;
        render(`topic-${value}`);
        if (topic) announcement.textContent = (youngContext ? t.childPrompts : t.prompts)[topic];
      }))),
    );
    if (topic) {
      area.append(
        node('p', (youngContext ? t.childPrompts : t.prompts)[topic], {
          class: 'nitya-practice__prompt',
        }),
        button(t.completeTurn, 'complete-turn', advance, true),
      );
    }
    area.append(node('p', t.result));
    return area;
  }

  function render(focusKey) {
    const oldFocus = mount.contains(document.activeElement) ? document.activeElement.dataset.focus : null;
    const openPanels = new Set([...mount.querySelectorAll('details[open]')].map(panel => panel.dataset.panel));
    const [, label, practiceDays, closingDays] = editions[language];
    announcement.textContent = '';
    const locale = language === 'yzh' ? 'ru' : language;
    const t = copies[locale];
    const method = workingCycle[language === 'es-419' ? 'es' : language];
    const dir = locale === 'ar' ? 'rtl' : 'ltr';
    const titleId = `${mount.id || 'nitya-practice'}-title`;
    const controlId = `${mount.id || 'nitya-practice'}-language`;
    mount.lang = locale;
    mount.dir = dir;
    mount.dataset.language = language;
    mount.setAttribute('aria-labelledby', titleId);

    const selector = node('select', '', { id: controlId, 'data-focus': 'language' });
    for (const [code, [autonym]] of Object.entries(editions)) {
      selector.add(node('option', autonym, {
        value: code, lang: code === 'yzh' ? 'ru' : code, dir: code === 'ar' ? 'rtl' : 'ltr',
      }));
    }
    selector.value = language;
    selector.dir = language === 'ar' ? 'rtl' : 'ltr';
    selector.addEventListener('change', () => setLanguage(selector.value));
    const localeField = node('div', '', { class: 'nitya-practice__language' });
    localeField.append(node('label', label, { for: controlId }), selector);

    const methodPanel = details(method.title, 'method');
    methodPanel.open = openPanels.has('method');
    const steps = node('ol');
    steps.append(...method.steps.map(step => node('li', step)));
    methodPanel.append(steps, node('p', method.note));

    const campaign = details(t.campaign, 'campaign');
    campaign.open = openPanels.has('campaign');
    const campaignList = node('ul');
    const utcFormat = dateRangeFormat(locale, { timeZone: 'UTC', day: 'numeric', month: 'long', year: 'numeric' });
    const dateLabel = iso => utcFormat(new Date(`${iso}T00:00:00Z`));
    campaignList.append(
      campaignInterval(practiceDays, campaignStart, campaignPracticeEnd, dateLabel),
      campaignInterval(closingDays, campaignClosingStart, campaignEnd, dateLabel),
    );
    campaign.append(campaignList, node('p', t.cadence));

    const review = language === 'yzh'
      ? 'язэхъ · авторский языковой эксперимент. здесь показан русский текст'
      : t.review;

    const heading = node('div', '', { class: 'nitya-practice__heading' });
    heading.append(node('p', t.kicker, { class: 'nitya-practice__kicker' }), node('h2', t.title, { id: titleId }));
    view.replaceChildren(localeField, heading, node('p', t.lead));

    if (phase === 'closed' || phase === 'complete') {
      view.append(
        node('p', phase === 'complete' ? t.completed : t.closed, { role: 'status', tabindex: '-1', 'data-focus': 'status' }),
        button(t.restart, 'restart', () => {
          context = null;
          startedAt = null;
          turn = 1;
          setPhase('ready', 'start');
        }, true),
      );
    } else {
      if (phase === 'ready') view.append(button(t.start, 'start', start, true));
      if (phase === 'paused' || phase === 'skipped') {
        view.append(
          node('p', t[phase], { role: 'status', tabindex: '-1', 'data-focus': 'status' }),
          button(t.resume, 'resume', start, true),
        );
      }
      if (startedAt) {
        const end = new Date(startedAt);
        end.setDate(end.getDate() + turnCount - 1);
        const personalFormat = dateRangeFormat(locale, { day: 'numeric', month: 'long', year: 'numeric' });
        const dates = node('p', `${t.window} · `, { class: 'nitya-practice__dates' });
        dates.append(node('bdi', `${personalFormat(startedAt)} – ${personalFormat(end)}`));
        view.append(dates);
      }

      const contextPanel = details(t.contexts, 'context');
      contextPanel.open = openPanels.has('context');
      contextPanel.append(node('p', t.contextHelp), group(t.contexts, ...contextOptions.map(value => {
        const contextLabel = value === 'caregiver' ? t.childLabel : value === 'education' ? t.teenLabel : value;
        return choice(contextLabel, value, context === value, () => {
          context = context === value ? null : value;
          render(value);
          if (context) announcement.textContent = context === 'caregiver' || context === 'education' ? t[context] : t.adult;
        });
      })));
      const youngContext = context === 'caregiver' || context === 'education';
      if (context) contextPanel.append(node('p', youngContext ? t[context] : t.adult));
      view.append(contextPanel);

      if (phase === 'active') {
        view.append(renderTurn(t, locale, youngContext));
        const actions = node('div', '', { class: 'nitya-practice__actions' });
        actions.append(
          button(t.pause, 'pause', () => setPhase('paused', 'status')),
          button(t.skip, 'skip', () => {
            topic = null;
            setPhase('skipped', 'status');
          }),
          button(t.exit, 'exit', finish),
        );
        view.append(actions);
      } else if (phase !== 'ready') {
        view.append(button(t.exit, 'exit', finish));
      }
    }

    const reviewNote = node('p', review, { class: 'nitya-practice__review', role: 'note' });
    view.append(reviewNote, methodPanel, campaign, node('p', t.privacy, { class: 'nitya-practice__privacy' }));
    const links = node('div', '', { class: 'nitya-practice__links' });
    for (const [kind, url, text] of [
      ['samurai', mount.dataset.samuraiUrl, t.samurai],
      ['angels', mount.dataset.angelsUrl, t.angels],
    ]) {
      if (!url) continue;
      const address = new URL(url, document.baseURI);
      if (!['https:', 'http:'].includes(address.protocol)) continue;
      if (kind === 'angels' && mount.hasAttribute('data-angels-locales')) {
        const suffix = { 'es-419': 'es', 'pt-BR': 'pt' }[language] ?? language;
        if (suffix !== 'ru') address.pathname = address.pathname.replace(/\.html$/, `-${suffix}.html`);
      } else if (kind !== 'samurai' && address.origin === location.origin) {
        address.searchParams.set('lang', language);
      }
      const attrs = { href: address.href };
      if (kind === 'samurai') attrs.hreflang = 'ru';
      if (window.parent !== window) {
        attrs.target = '_blank';
        attrs.rel = 'noopener';
      }
      const destination = node('a', text, attrs);
      if (kind === 'samurai' && locale !== 'ru') {
        destination.append(' · ', node('span', 'русский', { lang: 'ru', dir: 'ltr' }));
      }
      links.append(destination);
    }
    if (links.children.length) view.append(links);

    const focusTarget = focusKey ?? oldFocus;
    if (focusTarget) {
      const target = [...mount.querySelectorAll('[data-focus]')].find(element => element.dataset.focus === focusTarget);
      target?.focus({ preventScroll: focusTarget === oldFocus });
    }
  }

  function setLanguage(value) {
    const next = normalizeLanguage(value);
    if (!next || next === language) return;
    language = next;
    render();
    notifyLanguage();
  }

  function notifyLanguage() {
    window.dispatchEvent(new CustomEvent('nitya:language', {
      detail: { language, contentLanguage: mount.lang, direction: mount.dir },
    }));
  }

  window.NityaPractice = { setLanguage, get language() { return language; } };
  render();
  notifyLanguage();
})();
