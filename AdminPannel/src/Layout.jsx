import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";

const TopBar = () => {
  const navigate = useNavigate();
  const email = localStorage.getItem("adminEmail") || "Admin";
  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminEmail");
    navigate("/", { replace: true });
  };
  return (
    <header className="sticky top-0 z-10 backdrop-blur bg-white/70 dark:bg-gray-900/70 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-5 h-14">
      <div className="font-semibold text-gray-700 dark:text-gray-200 tracking-tight">
        Soydeli Admin
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-500 dark:text-gray-400 hidden sm:inline">
          {email}
        </span>
        <button
          onClick={handleLogout}
          className="text-xs font-medium px-3 py-1.5 rounded-md bg-amber-500 text-white hover:bg-amber-600 transition"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

const Layout = () => {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 via-white to-amber-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 text-gray-900 dark:text-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar />
        <main className="flex-1 overflow-y-auto px-5 py-6">
          <div className="max-w-7xl mx-auto w-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
