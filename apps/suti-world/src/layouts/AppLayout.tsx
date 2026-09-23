import { Link, Outlet } from "react-router-dom";

export default function AppLayout() {
  return <div className="site-shell">
    <a className="skip-link" href="#content">к содержимому</a>
    <header className="site-header">
      <Link className="wordmark" to="/" aria-label="SUTI.world — главная">SUTI<span>.</span>world</Link>
      <nav aria-label="основная навигация">
        <a href="/#paths">направления</a>
        <Link to="/library">библиотека</Link>
        <a href="https://t.me/saritmah">контакт ↗</a>
      </nav>
    </header>
    <main id="content"><Outlet /></main>
    <footer className="site-footer"><span>SUTI.world</span><span>язык · ясность · следующий шаг</span><Link to="/library">открытые материалы</Link></footer>
  </div>;
}
