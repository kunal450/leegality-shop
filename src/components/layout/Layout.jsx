import { Outlet } from "react-router-dom";
import Header from "../layout/Header";

export default function Layout() {
  return (
    <div className="min-h-screen bg-slate-100">
      <Header/>
      <Outlet />
    </div>
  );
}