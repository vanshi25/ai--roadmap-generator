import React, { useState } from "react";
import {
  Home,
  Sparkles,
  Map,
  Bookmark,
  User,
  Settings,
  Sun,
  Moon,
  Menu,
  X,
  LogOut,
} from "lucide-react";

import { useTheme } from "../context/ThemeContext";

export default function Sidebar({
  activePage,
  setActivePage,
}) {
  const { darkMode, toggleTheme } =
    useTheme();

  const [menuOpen, setMenuOpen] =
    useState(false);

  const primaryNavigation = [
    {
      id: "home",
      icon: Home,
      label: "Home",
    },
    {
      id: "generate",
      icon: Sparkles,
      label: "Generate",
    },
    {
      id: "my-roadmaps",
      icon: Map,
      label: "My Roadmaps",
    },
    {
      id: "saved",
      icon: Bookmark,
      label: "Saved",
    },
    {
      id: "profile",
      icon: User,
      label: "Profile",
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.reload();
  };

  return (
    <>
      {/* Mobile Hamburger */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() =>
            setMenuOpen(!menuOpen)
          }
          className="bg-white dark:bg-[#111827] p-3 rounded-xl shadow-lg border border-slate-200 dark:border-slate-800"
        >
       {menuOpen ? (
  <span className="text-black dark:text-white text-xl">✕</span>
) : (
  <span className="text-black dark:text-white text-xl">☰</span>
)}
        </button>
      </div>

      {/* Mobile Overlay */}
      {menuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/40 z-30"
          onClick={() =>
            setMenuOpen(false)
          }
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed lg:relative
          top-0
          left-0
          z-40
          h-screen lg:h-[calc(100vh-2rem)]
          w-[90px] lg:w-[90px]
          bg-white dark:bg-[#111827]
          border border-slate-100 dark:border-slate-800/60
          rounded-r-[28px] lg:rounded-[28px]
          flex flex-col
          items-center
          py-8
          justify-between
          shadow-[0_4px_25px_rgba(0,0,0,0.01)]
          transition-all duration-300

          ${
            menuOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }
        `}
      >
        <div className="flex flex-col items-center gap-12 w-full">

          {/* Logo */}
          <div
            onClick={() => {
              setActivePage("home");
              setMenuOpen(false);
            }}
            className="text-3xl font-black bg-gradient-to-tr from-indigo-500 to-purple-600 bg-clip-text text-transparent font-mono cursor-pointer"
          >
            R
          </div>

          {/* Navigation */}
          <nav className="flex flex-col gap-3 w-full px-3">
            {primaryNavigation.map(
              (item) => {
                const IconComponent =
                  item.icon;

                const isSelected =
                  activePage === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActivePage(
                        item.id
                      );

                      setMenuOpen(
                        false
                      );
                    }}
                    className={`flex flex-col items-center justify-center w-full aspect-square rounded-2xl transition-all duration-300 relative group ${
                      isSelected
                        ? "bg-gradient-to-tr from-indigo-500 via-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-200/50 dark:shadow-none"
                        : "text-[#A0AEC0] dark:text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-800 dark:hover:text-slate-200"
                    }`}
                  >
                    <IconComponent className="w-5 h-5 stroke-[2.3]" />

                    <span className="text-[10px] mt-1 font-bold tracking-tight scale-[0.9]">
                      {item.label}
                    </span>
                  </button>
                );
              }
            )}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="flex flex-col items-center gap-4 w-full px-3">

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="text-red-500 hover:text-red-600 transition-colors"
          >
            <LogOut className="w-5 h-5" />
          </button>

          {/* Settings */}
          <button
            onClick={() =>
              alert(
                "Settings Coming Soon 🚀"
              )
            }
            className="text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
          >
            <Settings className="w-5 h-5" />
          </button>

          {/* Theme Toggle */}
          <div className="bg-[#EDF2F7] dark:bg-slate-800 p-1 rounded-2xl flex flex-col gap-0.5 w-12 items-center">

            <button
              onClick={toggleTheme}
              className={`w-9 h-9 rounded-xl shadow-sm flex items-center justify-center transition-all ${
                !darkMode
                  ? "bg-white text-indigo-600"
                  : "text-slate-400"
              }`}
            >
              <Sun className="w-4 h-4 fill-current" />
            </button>

            <button
              onClick={toggleTheme}
              className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                darkMode
                  ? "bg-slate-700 text-amber-400"
                  : "text-slate-400"
              }`}
            >
              <Moon className="w-4 h-4 fill-current" />
            </button>

          </div>
        </div>
      </div>
    </>
  );
}