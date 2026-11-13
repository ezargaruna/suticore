/* Derived from the SUTI.care public questionnaire and the Russian CareIntake reflection source.
   The 12 written editions are editorial drafts. No input leaves the page. */
(() => {
  "use strict";

  const mount = document.querySelector("[data-atlas-care]");
  if (!mount) return;

  const threadIds = [
    "body", "rhythm", "feelings", "strength", "expression", "learning", "boundaries",
    "wider", "access", "language", "limits", "help", "next-step",
  ];

  const copies = {
    ru: {
      title: "анкета заботы", lead: "выбери одну из тринадцати нитей или просто осмотрись",
      privacy: "ответы живут только в этой вкладке. имя, контакты и личные подробности здесь не нужны. связь с человеком или службой помощи анкета не открывает",
      review: "русская редакция · сверка с автором предстоит",
      ui: ["контекст", "общий", "5+ · вместе со взрослым", "12+ · с доверенным взрослым", "выбери нить", "ответ для себя · можно пропустить", "другая нить", "закрыть и очистить", "ответы очищены", "открыть анкету"],
      young: "представьте героя этой истории. выберите один цвет, слово или жест, который мог бы ему помочь. можно ответить вслух или побыть в тишине",
      teen: "выберите вымышленную сцену. придумайте одну фразу, которой герой может попросить о поддержке, обозначить границу или предложить помощь. личная история здесь не нужна",
      older: ["старший возраст · спокойный темп", "можно остаться на одном вопросе, прочитать его вслух или ответить про себя. писать необязательно"],
      threads: [
        ["тело", "что даст телу немного опоры или удобства?"],
        ["ритм", "где в сегодняшнем ритме пригодилась бы пауза?"],
        ["ощущения", "какое ощущение или чувство хочется назвать одним словом?"],
        ["дар", "каким умением или небольшой помощью тебе по силам поделиться?"],
        ["голос", "что хочется сказать, придумать или создать?"],
        ["опыт", "какой урок помогает выбрать следующий шаг?"],
        ["границы", "какое условие или договорённость даст больше спокойствия?"],
        ["общий мир", "какую связь с людьми или местом хочется поддержать?"],
        ["доступность", "что сделает участие удобнее?"],
        ["язык", "на каком языке или в каком формате проще говорить?"],
        ["личное", "что хочется оставить у себя?"],
        ["поддержка", "что сейчас помогло бы: пауза, внимание, небольшой шаг или возможность найти своё сообщество?"],
        ["следующий шаг", "какая небольшая перемена сделала бы эту неделю чуть легче?"],
      ],
    },
    en: {
      title: "care questionnaire", lead: "choose any of the thirteen threads, or take a look around",
      privacy: "answers stay in this tab. leave names, contact details and private circumstances out. this questionnaire does not connect you with a person or a support service",
      review: "English editorial draft · independent language review pending",
      ui: ["context", "general", "5+ · with an adult", "12+ · with a trusted adult", "choose a thread", "a note for yourself · optional", "another thread", "close and clear", "answers cleared", "open the questionnaire"],
      young: "imagine a character in a story. choose one colour, word or gesture that might help them. say it aloud or sit quietly together",
      teen: "choose a fictional scene. find one sentence a character could use to ask for support, set a boundary or offer help. you can leave real stories out",
      older: ["older adults · unhurried pace", "take one question at a time. read it aloud, think it over, or write a line if you wish"],
      threads: [
        ["body", "what would help your body feel a little more at ease?"],
        ["rhythm", "where in your day would a pause help?"],
        ["feelings", "is there a feeling or sensation you’d like to name in one word?"],
        ["gift", "what skill or little act of help could you share?"],
        ["voice", "what would you like to say, imagine or make?"],
        ["experience", "what have you learned that might help you choose a next step?"],
        ["boundaries", "what condition or agreement would make things feel calmer?"],
        ["shared world", "what connection to a person or place would you like to care for?"],
        ["access", "what would make taking part easier?"],
        ["language", "what language or way of communicating works for you?"],
        ["privacy", "what would you like to keep to yourself?"],
        ["support", "what might help now: a pause, someone to listen, one small step, or a way to find your community?"],
        ["next step", "what small change could make this week a little easier?"],
      ],
    },
    "es-419": {
      title: "cuestionario de cuidado", lead: "elige cualquiera de los trece hilos o tómate un momento para explorar",
      privacy: "las respuestas quedan en esta pestaña. deja fuera los nombres, datos de contacto y detalles privados. el cuestionario no te pone en contacto con personas ni servicios de apoyo",
      review: "borrador editorial en español · pendiente de revisión lingüística independiente",
      ui: ["contexto", "general", "5+ · junto a una persona adulta", "12+ · con una persona adulta de confianza", "elige un hilo", "una nota para ti · opcional", "otro hilo", "cerrar y borrar", "respuestas borradas", "abrir el cuestionario"],
      young: "imaginen un personaje de un cuento. elijan un color, una palabra o un gesto que pueda ayudarle. pueden decirlo en voz alta o quedarse un momento en silencio",
      teen: "elijan una escena ficticia. inventen una frase para que el personaje pueda pedir apoyo, poner un límite u ofrecer ayuda. no hace falta contar una historia personal",
      older: ["personas mayores · sin prisa", "puedes quedarte con una pregunta, leerla en voz alta, pensarla o escribir una línea si quieres"],
      threads: [
        ["cuerpo", "¿qué ayudaría a tu cuerpo a sentirse un poco más a gusto?"],
        ["ritmo", "¿en qué momento del día te vendría bien una pausa?"],
        ["sensaciones", "¿qué sensación o emoción te gustaría nombrar en una palabra?"],
        ["don", "¿qué habilidad o pequeña ayuda podrías compartir?"],
        ["voz", "¿qué te gustaría decir, imaginar o crear?"],
        ["experiencia", "¿qué aprendizaje te ayuda a elegir el siguiente paso?"],
        ["límites", "¿qué condición o acuerdo te daría tranquilidad?"],
        ["mundo compartido", "¿qué vínculo con alguien o con un lugar te gustaría cuidar?"],
        ["acceso", "¿qué facilitaría que pudieras participar?"],
        ["idioma", "¿en qué idioma o de qué manera te resulta más fácil comunicarte?"],
        ["privacidad", "¿qué prefieres guardar para ti?"],
        ["apoyo", "¿qué te ayudaría ahora: una pausa, que te escuchen, un pequeño paso o encontrar tu comunidad?"],
        ["siguiente paso", "¿qué pequeño cambio haría esta semana un poco más fácil?"],
      ],
    },
    "pt-BR": {
      title: "questionário de cuidado", lead: "escolha um dos treze fios ou fique à vontade para explorar",
      privacy: "as respostas ficam só nesta aba. deixe de fora nomes, contatos e detalhes pessoais. o questionário não coloca você em contato com pessoas nem serviços de apoio",
      review: "rascunho editorial em português · revisão linguística independente pendente",
      ui: ["contexto", "geral", "5+ · junto com uma pessoa adulta", "12+ · com uma pessoa adulta de confiança", "escolha um fio", "uma nota só sua · opcional", "outro fio", "fechar e apagar", "respostas apagadas", "abrir o questionário"],
      young: "imaginem alguém de uma história. escolham uma cor, palavra ou gesto que possa ajudar essa pessoa. vale dizer em voz alta ou ficar um momento em silêncio",
      teen: "escolham uma cena fictícia. criem uma frase para alguém pedir apoio, definir um limite ou oferecer ajuda. histórias pessoais podem ficar de fora",
      older: ["pessoas idosas · sem pressa", "fique com uma pergunta de cada vez. leia em voz alta, pense com calma ou escreva uma linha, se quiser"],
      threads: [
        ["corpo", "o que ajudaria seu corpo a se sentir um pouco mais à vontade?"],
        ["ritmo", "em que momento do dia uma pausa faria bem?"],
        ["sensações", "qual sensação ou sentimento você gostaria de nomear em uma palavra?"],
        ["dom", "que habilidade ou pequena ajuda você pode oferecer?"],
        ["voz", "o que você gostaria de dizer, imaginar ou criar?"],
        ["experiência", "que aprendizado ajuda você a escolher o próximo passo?"],
        ["limites", "que condição ou acordo traria mais tranquilidade?"],
        ["mundo compartilhado", "que vínculo com alguém ou algum lugar você gostaria de cuidar?"],
        ["acesso", "o que tornaria sua participação mais fácil?"],
        ["idioma", "em que língua ou de que forma você prefere se comunicar?"],
        ["privacidade", "o que você quer guardar só para si?"],
        ["apoio", "o que ajudaria agora: uma pausa, alguém para ouvir, um pequeno passo ou encontrar sua comunidade?"],
        ["próximo passo", "que pequena mudança deixaria esta semana um pouco mais leve?"],
      ],
    },
    "zh-Hans": {
      title: "关怀问卷", lead: "从十三条关怀之线中任选一条，也可以先看看",
      privacy: "回答仅留在当前标签页。请勿填写姓名、联系方式或私人情况。问卷不会帮你联系他人或支持服务",
      review: "简体中文编辑稿 · 尚待独立语言审阅",
      ui: ["使用情境", "通用", "5+ · 与成年人一起", "12+ · 与信任的成年人一起", "选一条线", "写给自己的话 · 可跳过", "换一条线", "关闭并清除", "回答已清除", "打开问卷"],
      young: "一起想象故事中的一个人物。选一种颜色、一个词或一个动作，也许能帮到这个人物。可以说出来，也可以安静片刻",
      teen: "选一个虚构场景。想一句话，让角色能寻求支持、说明自己的界限，或主动帮忙。不用讲述自己的经历",
      older: ["长者 · 慢慢来", "一次看一个问题。可以朗读、默想，也可以按自己的意愿写一句"],
      threads: [
        ["身体", "什么能让身体自在一点？"],
        ["节奏", "今天什么时候停一停会有帮助？"],
        ["感受", "此刻有什么感受，你想用一个词说出来？"],
        ["赠予", "你愿意分享什么本领，或提供一点怎样的帮助？"],
        ["声音", "你想说什么、想象什么，或创造什么？"],
        ["经历", "哪一条经验能帮你决定下一步？"],
        ["边界", "什么条件或约定会让你更安心？"],
        ["共同世界", "你想照顾与哪个人或地方的联系？"],
        ["便利", "怎样做能让你更容易参与？"],
        ["语言", "用哪种语言或交流方式，你会更自在？"],
        ["隐私", "什么事情你想留给自己？"],
        ["支持", "此刻什么会有帮助：停一停、有人倾听、迈出一小步，还是找到彼此支持的伙伴？"],
        ["下一步", "哪一个小改变能让这一周轻松一点？"],
      ],
    },
    hi: {
      title: "देखभाल की प्रश्नावली", lead: "तेरह सूत्रों में से कोई एक चुनें या पहले बस देख लें",
      privacy: "जवाब इसी टैब में रहते हैं। नाम, संपर्क और निजी बातें छोड़ दें। यह प्रश्नावली किसी व्यक्ति या सहायता सेवा से संपर्क नहीं कराती",
      review: "हिन्दी संपादकीय मसौदा · स्वतंत्र भाषा समीक्षा बाकी है",
      ui: ["संदर्भ", "सामान्य", "5+ · किसी वयस्क के साथ", "12+ · किसी भरोसेमंद वयस्क के साथ", "कोई सूत्र चुनें", "अपने लिए एक बात लिखें · वैकल्पिक", "कोई और सूत्र", "बंद करें और मिटाएँ", "जवाब मिटा दिए गए", "प्रश्नावली खोलें"],
      young: "किसी कहानी के एक पात्र की कल्पना करें। एक रंग, शब्द या इशारा चुनें जो उस पात्र की मदद कर सके। उसे बोलकर कहें या कुछ देर साथ चुप रहें",
      teen: "एक काल्पनिक दृश्य चुनें। ऐसा एक वाक्य सोचें जिससे पात्र सहारा माँग सके, अपनी सीमा बता सके या मदद की पेशकश कर सके। निजी कहानी बताने की ज़रूरत नहीं है",
      older: ["वरिष्ठों के लिए · अपनी गति से", "एक बार में एक प्रश्न लें। उसे बोलकर पढ़ें, मन में सोचें या चाहें तो एक पंक्ति लिखें"],
      threads: [
        ["शरीर", "किससे शरीर थोड़ा सहज महसूस करेगा?"],
        ["लय", "दिन में कहाँ थोड़ी देर रुकना अच्छा लगेगा?"],
        ["एहसास", "किस एहसास या भावना को आप एक शब्द में कहना चाहेंगे?"],
        ["उपहार", "आप कौन-सा हुनर बाँट सकते हैं या कौन-सी छोटी मदद दे सकते हैं?"],
        ["आवाज़", "आप क्या कहना, सोचना या बनाना चाहेंगे?"],
        ["अनुभव", "किस सीख से अगला कदम चुनने में मदद मिलती है?"],
        ["सीमाएँ", "किस शर्त या सहमति से थोड़ी शांति मिलेगी?"],
        ["साझी दुनिया", "किस इंसान या जगह से अपना रिश्ता सँभालना चाहेंगे?"],
        ["पहुँच", "किस चीज़ से शामिल होना आसान होगा?"],
        ["भाषा", "किस भाषा या तरीके से बात करना आसान लगता है?"],
        ["निजता", "क्या अपने तक रखना चाहेंगे?"],
        ["सहारा", "अभी किससे मदद मिलेगी: एक विराम, कोई सुनने वाला, एक छोटा कदम या अपना समुदाय ढूँढ़ना?"],
        ["अगला कदम", "कौन-सा छोटा बदलाव इस हफ़्ते को थोड़ा आसान बना सकता है?"],
      ],
    },
    fr: {
      title: "questionnaire de soutien", lead: "choisis l’un des treize fils ou prends le temps de découvrir",
      privacy: "tes réponses restent dans cet onglet. garde pour toi les noms, coordonnées et détails privés. le questionnaire ne te met en relation avec personne ni avec un service de soutien",
      review: "version éditoriale française · relecture linguistique indépendante à venir",
      ui: ["contexte", "général", "5+ · avec un adulte", "12+ · avec un adulte de confiance", "choisis un fil", "une note pour toi · facultatif", "un autre fil", "fermer et effacer", "réponses effacées", "ouvrir le questionnaire"],
      young: "imaginez un personnage de conte. choisissez une couleur, un mot ou un geste qui pourrait l’aider. vous pouvez le dire à voix haute ou rester un moment en silence",
      teen: "choisissez une scène fictive. trouvez une phrase pour demander du soutien, poser une limite ou proposer de l’aide. les histoires personnelles peuvent rester de côté",
      older: ["seniors · à ton rythme", "prends une question à la fois. lis-la à voix haute, réfléchis en silence ou écris une ligne si tu en as envie"],
      threads: [
        ["corps", "qu’est-ce qui aiderait ton corps à se sentir un peu plus à l’aise ?"],
        ["rythme", "à quel moment une pause te ferait-elle du bien aujourd’hui ?"],
        ["sensations", "quelle sensation ou émotion aimerais-tu nommer en un mot ?"],
        ["don", "quel savoir-faire ou petit geste d’aide pourrais-tu partager ?"],
        ["voix", "qu’aimerais-tu dire, imaginer ou créer ?"],
        ["expérience", "qu’as-tu appris qui pourrait t’aider à choisir le prochain pas ?"],
        ["limites", "quelle condition ou quel accord t’apporterait davantage de tranquillité ?"],
        ["monde commun", "quel lien avec une personne ou un lieu aimerais-tu entretenir ?"],
        ["accès", "qu’est-ce qui te faciliterait la participation ?"],
        ["langue", "quelle langue ou quel moyen de communication te convient le mieux ?"],
        ["intimité", "qu’aimerais-tu garder pour toi ?"],
        ["soutien", "qu’est-ce qui t’aiderait maintenant : une pause, une écoute, un petit pas ou trouver une communauté ?"],
        ["prochain pas", "quel petit changement rendrait cette semaine un peu plus douce ?"],
      ],
    },
    ar: {
      title: "استبيان الرعاية", lead: "اختر خيطًا من خيوط الرعاية الثلاثة عشر، أو ألقِ نظرة أولًا",
      privacy: "تبقى الإجابات في علامة التبويب هذه. اترك الأسماء وبيانات الاتصال والتفاصيل الخاصة خارجها. لا يربطك الاستبيان بشخص أو بخدمة دعم",
      review: "مسودة تحريرية بالعربية · في انتظار مراجعة لغوية مستقلة",
      ui: ["السياق", "عام", "5+ · مع شخص بالغ", "12+ · مع شخص بالغ موثوق", "اختر خيطًا", "ملاحظة لك وحدك · اختيارية", "خيط آخر", "إغلاق ومسح", "مُسحت الإجابات", "افتح الاستبيان"],
      young: "تخيّلوا شخصية في حكاية. اختاروا لونًا أو كلمة أو إشارة قد تساعدها. يمكنكم قولها بصوت مسموع أو الجلوس معًا في هدوء",
      teen: "اختاروا مشهدًا خياليًا. ابتكروا جملة تساعد الشخصية على طلب الدعم أو وضع حدّ أو تقديم مساعدة. لا حاجة لسرد قصة شخصية",
      older: ["لكبار السن · على مهل", "خذ سؤالًا واحدًا في كل مرة. اقرأه بصوت مسموع أو فكّر فيه أو اكتب سطرًا إن شئت"],
      threads: [
        ["الجسد", "ما الذي قد يساعد جسدك على الشعور بمزيد من الراحة؟"],
        ["الإيقاع", "متى يمكن أن يفيدك التوقف قليلًا خلال اليوم؟"],
        ["الإحساس", "أي إحساس أو شعور تودّ أن تسمّيه بكلمة واحدة؟"],
        ["العطاء", "ما المهارة أو المساعدة البسيطة التي تستطيع مشاركتها؟"],
        ["الصوت", "ماذا تود أن تقول أو تتخيّل أو تصنع؟"],
        ["التجربة", "ما الذي تعلّمته ويمكن أن يساعدك في اختيار الخطوة التالية؟"],
        ["الحدود", "ما الشرط أو الاتفاق الذي قد يمنحك بعض الطمأنينة؟"],
        ["العالم المشترك", "أي صلة بشخص أو مكان تود أن ترعاها؟"],
        ["سهولة المشاركة", "ما الذي قد يسهّل مشاركتك؟"],
        ["اللغة", "بأي لغة أو طريقة تفضّل التواصل؟"],
        ["الخصوصية", "ما الذي تود أن تحتفظ به لنفسك؟"],
        ["الدعم", "ما الذي قد يساعد الآن: استراحة، أو من يستمع إليك، أو خطوة صغيرة، أو فرصة للعثور على مجتمع يناسبك؟"],
        ["الخطوة التالية", "ما التغيير البسيط الذي قد يجعل هذا الأسبوع أيسر قليلًا؟"],
      ],
    },
    bn: {
      title: "যত্নের প্রশ্নপত্র", lead: "তেরোটি সুতোর যেকোনো একটি বেছে নিন, অথবা আগে একটু দেখে নিন",
      privacy: "উত্তর শুধু এই ট্যাবেই থাকে। নাম, যোগাযোগের তথ্য ও ব্যক্তিগত বিবরণ লিখবেন না। এই প্রশ্নপত্র আপনাকে কোনো ব্যক্তি বা সহায়তা পরিষেবার সঙ্গে যোগাযোগ করিয়ে দেয় না",
      review: "বাংলা সম্পাদকীয় খসড়া · স্বতন্ত্র ভাষা পর্যালোচনা বাকি",
      ui: ["পরিপ্রেক্ষিত", "সাধারণ", "৫+ · একজন প্রাপ্তবয়স্কের সঙ্গে", "১২+ · বিশ্বস্ত প্রাপ্তবয়স্কের সঙ্গে", "একটি সুতো বেছে নিন", "নিজের জন্য নোট · ঐচ্ছিক", "অন্য সুতো", "বন্ধ করুন ও মুছুন", "উত্তর মুছে ফেলা হয়েছে", "প্রশ্নপত্র খুলুন"],
      young: "গল্পের একজন চরিত্রকে কল্পনা করুন। তার কাজে লাগতে পারে এমন একটি রং, শব্দ বা ইশারা বেছে নিন। মুখে বলতে পারেন, অথবা একসঙ্গে কিছুক্ষণ নীরব থাকতে পারেন",
      teen: "একটি কল্পিত দৃশ্য বেছে নিন। এমন একটি বাক্য ভাবুন, যা দিয়ে চরিত্রটি সাহায্য চাইতে, সীমা জানাতে বা সাহায্য করতে চাইতে পারে। নিজের গল্প বলা জরুরি নয়",
      older: ["প্রবীণদের জন্য · ধীরে সুস্থে", "একবারে একটি প্রশ্ন নিন। জোরে পড়তে পারেন, মনে মনে ভাবতে পারেন বা ইচ্ছে হলে এক লাইন লিখতে পারেন"],
      threads: [
        ["শরীর", "কী করলে শরীর একটু বেশি স্বস্তি পাবে?"],
        ["ছন্দ", "আজ দিনের কোন সময়ে বিরতি নিলে ভালো লাগবে?"],
        ["অনুভূতি", "কোন অনুভূতি এক কথায় বলতে ইচ্ছে করছে?"],
        ["উপহার", "কোন দক্ষতা ভাগ করতে পারেন বা কীভাবে একটু সাহায্য করতে পারেন?"],
        ["কণ্ঠ", "কী বলতে, কল্পনা করতে বা তৈরি করতে চান?"],
        ["অভিজ্ঞতা", "কোন শিক্ষা পরের পদক্ষেপ বেছে নিতে সাহায্য করে?"],
        ["সীমা", "কোন শর্ত বা বোঝাপড়া আপনাকে একটু নিশ্চিন্ত করবে?"],
        ["সবার জগৎ", "কোন মানুষ বা জায়গার সঙ্গে সম্পর্কের যত্ন নিতে চান?"],
        ["সহজ অংশগ্রহণ", "কী হলে অংশ নেওয়া সহজ হবে?"],
        ["ভাষা", "কোন ভাষায় বা কোন উপায়ে কথা বলা আপনার জন্য সহজ?"],
        ["গোপনীয়তা", "কী নিজের কাছে রাখতে চান?"],
        ["সহায়তা", "এখন কী কাজে আসবে: একটু বিরতি, কেউ মন দিয়ে শোনা, একটি ছোট পদক্ষেপ, নাকি নিজের মতো মানুষের দল খুঁজে পাওয়া?"],
        ["পরের পদক্ষেপ", "কোন ছোট পরিবর্তন এই সপ্তাহটা একটু সহজ করবে?"],
      ],
    },
    eo: {
      title: "demandaro pri zorgo", lead: "elektu iun el la dek tri fadenoj aŭ unue ĉirkaŭrigardu",
      privacy: "la respondoj restas en ĉi tiu langeto. ne enigu nomojn, kontaktinformojn aŭ privatajn detalojn. la demandaro ne kontaktigas vin kun homo aŭ subtena servo",
      review: "Esperanta redakta skizo · sendependa lingva revizio ankoraŭ mankas",
      ui: ["kunteksto", "ĝenerala", "5+ · kun plenkreskulo", "12+ · kun fidinda plenkreskulo", "elektu fadenon", "noto por vi mem · nedeviga", "alia fadeno", "fermi kaj forviŝi", "respondoj forviŝitaj", "malfermi la demandaron"],
      young: "imagu rolulon en rakonto. kune elektu koloron, vorton aŭ geston, kiu povus helpi la rolulon. vi povas diri ĝin laŭte aŭ resti momenton en silento",
      teen: "elektu fikcian scenon. trovu unu frazon, per kiu rolulo povus peti subtenon, esprimi limon aŭ proponi helpon. privatajn rakontojn vi povas teni por vi",
      older: ["por aĝuloj · sen hasto", "prenu po unu demandon. laŭtlegu ĝin, pripensu ĝin silente aŭ skribu unu linion se vi volas"],
      threads: [
        ["korpo", "kio helpus vian korpon senti sin iom pli komforte?"],
        ["ritmo", "kiam hodiaŭ al vi utilus paŭzo?"],
        ["sentoj", "kiun senton aŭ sensaĵon vi ŝatus nomi per unu vorto?"],
        ["donaco", "kiun kapablon vi povus dividi aŭ kian etan helpon vi povus doni?"],
        ["voĉo", "kion vi ŝatus diri, imagi aŭ krei?"],
        ["sperto", "kion vi lernis, kio povus helpi vin elekti sekvan paŝon?"],
        ["limoj", "kiu kondiĉo aŭ interkonsento donus al vi pli da trankvilo?"],
        ["komuna mondo", "kiun ligon kun homo aŭ loko vi ŝatus prizorgi?"],
        ["alireblo", "kio faciligus vian partoprenon?"],
        ["lingvo", "en kiu lingvo aŭ per kiu maniero vi plej facile komunikas?"],
        ["privateco", "kion vi ŝatus gardi por vi mem?"],
        ["subteno", "kio helpus nun: paŭzo, iu kiu aŭskultas, malgranda paŝo aŭ eblo trovi vian komunumon?"],
        ["sekva paŝo", "kiu eta ŝanĝo faciligus al vi ĉi tiun semajnon?"],
      ],
    },
    sa: {
      title: "परिचर्याप्रश्नावली", lead: "त्रयोदशसु सूत्रेषु एकं वृणु, अथवा प्रथमं पश्य",
      privacy: "उत्तराणि अस्मिन्नेव पटले तिष्ठन्ति। नाम, सम्पर्कविवरणं, निजवृत्तान्तं च मा लिख। एषा प्रश्नावली त्वां न केनचित् जनेन न वा साहाय्यसेवया संयोजयति।",
      review: "संस्कृते सम्पादितं प्रारूपम् · विशेषज्ञस्य स्वतन्त्रा समीक्षा अपेक्षिता",
      ui: ["प्रसङ्गः", "सामान्यः", "५+ · वयस्केन सह", "१२+ · विश्वासपात्रेण वयस्केन सह", "एकं सूत्रं वृणु", "स्वार्थाय टिप्पणी · वैकल्पिकी", "अन्यत् सूत्रम्", "पिधाय मार्जय", "उत्तराणि मार्जितानि", "प्रश्नावलीं विवृणु"],
      young: "कथायाः पात्रमेकं कल्पयत। तस्मै सहायकं वर्णं शब्दं सङ्केतं वा चिनुत। उच्चैर्वक्तुं वा क्षणं मौने स्थातुं शक्यते।",
      teen: "कल्पितं दृश्यं चिनुत। पात्रं येन वाक्येन साहाय्यं याचेत, मर्यादां वदेत्, साहाय्यं वा प्रदद्यात् तादृशमेकं वाक्यं रचयत। निजवृत्तान्तस्य कथनं न आवश्यकम्।",
      older: ["वृद्धानां कृते · शनैः", "एकैकं प्रश्नं गृहाण। उच्चैः पठ, मनसा चिन्तय, इच्छसि चेत् एकां पङ्क्तिं लिख।"],
      threads: [
        ["शरीरम्", "केन शरीरस्य किञ्चित् सुखं भवेत्?"],
        ["लयः", "अद्य कदा विरामः उपयोगी स्यात्?"],
        ["अनुभूतिः", "काम् अनुभूतिम् एकेन शब्देन नाम्ना वक्तुम् इच्छसि?"],
        ["दानम्", "कां कलां किञ्चित् साहाय्यं वा दातुं शक्नोषि?"],
        ["वाणी", "किं वक्तुं कल्पयितुं स्रष्टुं वा इच्छसि?"],
        ["अनुभवः", "कः पाठः अग्रिमं पदं वरीतुं साहाय्यं करोति?"],
        ["मर्यादाः", "कीदृशः नियमः सम्मेलनं वा शान्तिं दद्यात्?"],
        ["सहभुवनम्", "केन जनेन केन स्थानेन वा सम्बन्धं पालयितुम् इच्छसि?"],
        ["सौकर्यम्", "केन सहभागिता सुकरा भवेत्?"],
        ["भाषा", "कया भाषया केन प्रकारेण वा वक्तुं सुकरम्?"],
        ["निजता", "किं स्वस्यैव कृते स्थापयितुम् इच्छसि?"],
        ["साहाय्यम्", "अधुना किं साहाय्यं कुर्यात्—विरामः, श्रोता, लघु पदम् अथवा स्वजनसमूहस्य अन्वेषणम्?"],
        ["अग्रिमं पदम्", "कः लघुः परिवर्तनः इमं सप्ताहं सुकरं कुर्यात्?"],
      ],
    },
    la: {
      title: "quaestiones de cura", lead: "unum e tredecim filis elige aut primum omnia inspice",
      privacy: "responsa hac in tabula manent. nomina, rationes communicandi et res privatas omitte. hae quaestiones te cum homine vel officio auxilii non coniungunt",
      review: "adumbratio Latina · recognitio a perito adhuc exspectatur",
      ui: ["contextus", "communis", "5+ · cum adulto", "12+ · cum adulto fideli", "filum elige", "nota tibi soli · ad libitum", "aliud filum", "claude et dele", "responsa deleta sunt", "quaestiones aperi"],
      young: "personam fabulae fingite. colorem, verbum aut gestum eligite quo ei subvenire possitis. licet clara voce dicere aut paulisper una silere",
      teen: "scaenam fictam eligite. unam sententiam fingite qua persona auxilium petere, fines indicare aut auxilium offerre possit. res privatas narrare non necesse est",
      older: ["senioribus · sine festinatione", "unam quaestionem singulis vicibus lege. clara voce legere, tacite cogitare aut unum versum scribere licet"],
      threads: [
        ["corpus", "quid corpus tuum paulo commodius reddat?"],
        ["rhythmus", "quando hodie tibi utilis sit pausa?"],
        ["sensus", "quem sensum uno verbo nominare velis?"],
        ["donum", "quam artem vel quod parvum auxilium praebere possis?"],
        ["vox", "quid dicere, fingere vel creare velis?"],
        ["experientia", "quid didicisti quod ad gradum proximum eligendum adiuvet?"],
        ["fines", "quae condicio aut quae conventio plus quietis afferat?"],
        ["mundus communis", "quod vinculum cum homine vel loco colere velis?"],
        ["accessus", "quid facilius tibi sit ut particeps fias?"],
        ["lingua", "qua lingua vel quo modo facilius communicas?"],
        ["res privatae", "quid tibi soli servare velis?"],
        ["auxilium", "quid nunc adiuvet: pausa, qui te audiat, parvus gradus, an occasio coetum tibi aptum inveniendi?"],
        ["gradus proximus", "quae parva mutatio hanc hebdomadam tibi faciliorem reddat?"],
      ],
    },
  };

  const aliases = { es: "es-419", "es-419": "es-419", pt: "pt-BR", "pt-br": "pt-BR", zh: "zh-Hans", "zh-cn": "zh-Hans", "zh-hans": "zh-Hans" };

  function normalizeLanguage(value) {
    const code = typeof value === "string" ? value.trim().toLowerCase().replaceAll("_", "-") : "";
    if (Object.hasOwn(aliases, code)) return aliases[code];
    return code === "yzh" || Object.hasOwn(copies, code) ? code : null;
  }

  function element(tag, content, attributes = {}) {
    const node = document.createElement(tag);
    if (content) node.textContent = content;
    for (const [attribute, value] of Object.entries(attributes)) node.setAttribute(attribute, value);
    return node;
  }

  function action(label, id, handler) {
    const button = element("button", label, { type: "button", "data-care-action": id });
    button.addEventListener("click", handler);
    return button;
  }

  let language = normalizeLanguage(window.NityaPractice?.language)
    ?? normalizeLanguage(new URLSearchParams(location.search).get("lang"))
    ?? normalizeLanguage(document.documentElement.dataset.practiceLanguage)
    ?? normalizeLanguage(document.documentElement.lang)
    ?? "ru";
  let opened = false;
  let cleared = false;
  let activeThread = null;
  let context = "general";
  const answers = new Map();

  function clearAnswers() {
    answers.clear();
    activeThread = null;
  }

  function render(focus = null) {
    const contentLanguage = language === "yzh" ? "ru" : language;
    const words = copies[contentLanguage];
    const [contextLabel, general, child, teen, pick, response, another, close, erased, open] = words.ui;

    mount.lang = contentLanguage;
    mount.dir = contentLanguage === "ar" ? "rtl" : "ltr";
    mount.dataset.language = language;
    mount.dataset.careOpen = String(opened);
    mount.dataset.careContext = context;
    const headingId = `${mount.id || "care-questionnaire"}-heading`;
    mount.setAttribute("aria-labelledby", headingId);

    const review = language === "yzh"
      ? "язэхъ · пока показана русская редакция анкеты"
      : words.review;
    const intro = element("div", "", { class: "atlas-care__intro" });
    intro.append(
      element("h2", words.title, { id: headingId }),
      element("p", words.lead),
      element("p", review, { class: "atlas-care__note" }),
    );
    mount.replaceChildren(intro);

    if (!opened) {
      mount.append(action(open, "open", () => {
        opened = true;
        cleared = false;
        render("context");
      }));
      if (cleared) mount.append(element("p", erased, { class: "atlas-care__status", role: "status" }));
      if (focus) mount.querySelector('[data-care-action="open"]').focus();
      return;
    }

    mount.append(element("p", words.privacy, { class: "atlas-care__note" }));
    const contextId = `${mount.id || "care-questionnaire"}-context`;
    const select = element("select", "", { id: contextId });
    for (const [key, label] of [["general", general], ["child", child], ["teen", teen], ["older", words.older[0]]]) {
      select.add(element("option", label, { value: key }));
    }
    select.value = context;
    select.addEventListener("change", () => {
      context = select.value;
      activeThread = null;
      render("context");
    });
    const controls = element("div", "", { class: "atlas-care__controls" });
    controls.append(
      element("label", contextLabel, { for: contextId }),
      select,
      action(close, "close", () => {
        clearAnswers();
        context = "general";
        opened = false;
        cleared = true;
        render("open");
      }),
    );
    mount.append(controls);

    const isYouthContext = context === "child" || context === "teen";
    if (context === "older") mount.append(element("p", words.older[1]));
    const options = element("div", "", { class: "atlas-care__options", role: "group", "aria-label": pick });
    threadIds.forEach((id, index) => {
      const button = action(words.threads[index][0], "thread", () => {
        activeThread = id;
        render("prompt");
      });
      button.dataset.careThread = id;
      button.setAttribute("aria-pressed", String(activeThread === id));
      options.append(button);
    });

    const question = element("div", "", { class: "atlas-care__prompt" });
    if (activeThread) {
      const [label, prompt] = words.threads[threadIds.indexOf(activeThread)];
      const promptHeading = element("h3", isYouthContext ? label : prompt, { tabindex: "-1" });
      question.append(promptHeading);
      if (isYouthContext) {
        question.append(element("p", context === "child" ? words.young : words.teen));
      } else {
        const answerId = `${mount.id || "care-questionnaire"}-answer`;
        const answer = element("textarea", "", {
          class: "atlas-care__answer", id: answerId, maxlength: "240", rows: "3",
          dir: "auto", autocomplete: "off", spellcheck: "false", autocorrect: "off",
        });
        answer.value = answers.get(activeThread) ?? "";
        answer.addEventListener("input", () => answers.set(activeThread, answer.value));
        question.append(element("label", response, { for: answerId }), answer);
      }
      question.append(action(another, "back", () => {
        const previous = activeThread;
        activeThread = null;
        render(previous);
      }));
      mount.append(question);
      if (focus === "prompt") promptHeading.focus();
    } else {
      mount.append(element("p", pick), options);
      if (focus && threadIds.includes(focus)) options.querySelector(`[data-care-thread="${focus}"]`).focus();
    }

    if (focus === "context") select.focus();
  }

  window.addEventListener("nitya:language", (event) => {
    const next = normalizeLanguage(event.detail?.language ?? event.detail);
    if (!next || next === language) return;
    language = next;
    render();
  });

  // Keep the session clear when a page is restored from the browser's back-forward cache.
  window.addEventListener("pagehide", () => {
    if (!opened) return;
    clearAnswers();
    context = "general";
    opened = false;
    render();
  });

  render();
})();
