import { Link } from "react-router-dom";

const items = [
  { name: "основа SUTI.world", slug: "docs/suti-world" },
  { name: "спецификация SUTIcore", slug: "README" },
  { name: "архитектура", slug: "normae/architecture" },
  { name: "проверка", slug: "protocolla/verification" },
  { name: "Syntaxium", slug: "protocolla/syntaxium" },
  { name: "политика AI", slug: "docs/ai-policy" },
];

export default function Library() {
  return <section className="library" aria-labelledby="library-title">
    <p className="eyebrow">открытый контур</p>
    <h1 id="library-title">библиотека</h1>
    <p className="library-intro">документы и протоколы,
      доступные для самостоятельного чтения</p>
    <ul className="library-list">{items.map(item => <li key={item.slug}>
      <Link to={`/docs/${item.slug}`}>{item.name} ↗</Link>
    </li>)}</ul>
  </section>;
}
