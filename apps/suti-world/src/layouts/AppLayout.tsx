import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function AppLayout() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "280px 1fr",
        minHeight: "100vh",
      }}
    >
      <Sidebar />

      <main
        style={{
          padding: "48px",
        }}
      >
        <Outlet />
      </main>
    </div>
  );
}
