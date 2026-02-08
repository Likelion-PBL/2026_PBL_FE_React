import { Link, Outlet, useLocation } from "react-router-dom";

export default function Layout({ totalCount }) {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <>
      <header className="app-header">
        <h1 className="app-title">
          <Link to="/">LIKELION Dashboard</Link>
        </h1>

        <nav className="app-nav">
          {!isHome && (
            <Link to="/" className="control-btn">
              ← 목록으로
            </Link>
          )}
          <span className="lion-count">총 {totalCount}명</span>
        </nav>
      </header>

      <Outlet />
    </>
  );
}
