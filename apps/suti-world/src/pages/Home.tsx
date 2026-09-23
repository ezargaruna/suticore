import { Link } from "react-router-dom";

const paths = [
  { number: "01", title: "хочу говорить", name: "LinguaFUSION", text: "языковая практика, культура и голос: русский, испанский и португальский", detail: "самостоятельная практика, открытые встречи и группы", tone: "peach" },
  { number: "02", title: "хочу понять", name: "карта сути", text: "человек, текст, ситуация или проект: контекст, факты, вопросы, варианты и приоритет", detail: "следующий шаг выбираете вы; карта не ставит диагноз", tone: "sky" },
  { number: "03", title: "хочу собрать", name: "SUTIspace", text: "язык бренда и команды, карта проекта, словарь и база знаний", detail: "бережные AI-сценарии с ясными границами", tone: "sun" },
];

export default function Home() {
  return <>
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-copy">
        <p className="eyebrow">язык · ясность · следующий шаг</p>
        <h1 id="hero-title">найти слова<br />и выбрать ход</h1>
        <p className="hero-lead">SUTI.world — пространство языка,
          ясности и следующего шага</p>
        <p>практикуйте язык,
          проясняйте задачу,
          собирайте язык проекта</p>
        <a className="text-link" href="#paths">выбрать вход ↘</a>
      </div>
      <div className="hero-art" aria-hidden="true"><span className="hero-orbit hero-orbit-one"/><span className="hero-orbit hero-orbit-two"/><span className="hero-seed"/></div>
    </section>

    <section className="section" id="paths" aria-labelledby="paths-title">
      <div className="section-heading"><p className="eyebrow">три входа</p><h2 id="paths-title">с чего начать</h2></div>
      <div className="path-grid">{paths.map(path => <article className={`path-card tone-${path.tone}`} key={path.number}>
        <span className="path-number">{path.number}</span>
        <h3>{path.title}</h3><p className="path-name">{path.name}</p>
        <p>{path.text}</p><p className="path-detail">{path.detail}</p>
      </article>)}</div>
    </section>

    <section className="section split" aria-labelledby="process-title">
      <div><p className="eyebrow">как мы работаем</p><h2 id="process-title">от вопроса к действию</h2></div>
      <div><p className="process-line">заметить → назвать → проверить → выбрать → сделать → оставить след</p>
      <p className="muted">вы можете уточнить задачу,
        изменить выбор или остановиться</p>
      <p className="muted">AI помогает различать варианты
        решение остаётся за человеком</p></div>
    </section>

    <section className="section offerings" aria-labelledby="formats-title">
      <p className="eyebrow">форматы</p><h2 id="formats-title">открытое и личное</h2>
      <div className="offer-grid">
        <div><h3>начать самостоятельно</h3><p>короткие задания, протоколы,
          метаграммы, заметки, примеры и упражнения</p>
          <Link className="text-link" to="/library">открыть библиотеку ↗</Link></div>
        <div><h3>работать вместе</h3><p>языковой маршрут, карта сути,
          семантический аудит, язык проекта,
          сопровождение</p><p className="muted">формат зависит от задачи</p></div>
      </div>
      <details className="terms"><summary>как согласуем условия</summary>
        <p>перед началом фиксируем формат,
          срок и стоимость
          без скрытых доплат</p></details>
    </section>

    <section className="section split" aria-labelledby="boundaries-title">
      <div><p className="eyebrow">границы работы</p><h2 id="boundaries-title">ясные правила</h2></div>
      <div><p>согласие, приватность,
        видимые границы,
        проверка источников,
        право остановиться,
        обратимые действия и доступность</p>
      <p>AI-помощники служат проверке,
        навигации и безопасности</p>
      <p className="muted">культурный, религиозный
        или политический аудит —
        только по конкретному запросу,
        с источниками и границами задачи</p>
      <p className="muted">для детей и подростков:
        добровольность, минимум данных,
        без профилирования, ясный язык
        и участие взрослого,
        когда это необходимо</p></div>
    </section>

    <section className="closing" aria-labelledby="about-title">
      <p className="eyebrow">кто рядом</p>
      <h2 id="about-title">Ezar Garuna <span>/ @saritamah</span></h2>
      <p>лингвист и семантический архитектор
        работаю с языком, текстами и AI
        помогаю людям и проектам
        назвать задачу и выбрать ход</p>
      <p>начать можно с открытых материалов
        для личного или проектного запроса
        <a href="https://t.me/iggalk">напишите о задаче ↗</a></p>
    </section>
  </>;
}
