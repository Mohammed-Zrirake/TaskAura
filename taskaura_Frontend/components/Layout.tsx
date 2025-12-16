import React, { useState } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import {
  Sun,
  Moon,
  LogOut,
  CheckSquare,
  Menu,
  X,
  User as UserIcon,
  Globe,
} from "lucide-react";
import { Button } from "./ui/Button";

export const Layout: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === "en" ? "fr" : "en");
  };

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const displayName = user?.username || user?.email || "User";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950 transition-all duration-300 flex flex-col">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-700/50 shadow-sm dark:shadow-slate-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link
                to="/"
                className="flex-shrink-0 flex items-center gap-3 hover:opacity-90 transition-opacity duration-200"
              >
                <div className="bg-gradient-to-br from-primary-500 to-primary-700 p-2 rounded-xl shadow-md">
                  <CheckSquare className="h-7 w-7 text-white" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-200 bg-clip-text text-transparent tracking-tight">
                  {t("app.name")}
                </span>
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex md:items-center md:space-x-4">
              {user && (
                <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200/50 dark:border-slate-700/50">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/30">
                    <UserIcon className="h-4 w-4 text-primary-600 dark:text-primary-400" />
                  </div>
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-200 truncate max-w-[160px]">
                    {displayName}
                  </span>
                </div>
              )}

              <div className="flex items-center space-x-2 border-l border-slate-200/60 dark:border-slate-700/60 pl-6">
                <button
                  onClick={toggleLanguage}
                  className="p-2.5 rounded-xl text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100/80 dark:hover:bg-slate-800/80 transition-all duration-200 flex items-center gap-2 group shadow-sm hover:shadow"
                  aria-label="Toggle Language"
                >
                  <Globe className="h-4 w-4 group-hover:rotate-12 transition-transform duration-200" />
                  <span className="font-semibold text-xs">
                    {i18n.language.toUpperCase()}
                  </span>
                </button>

                <button
                  onClick={toggleTheme}
                  className="p-2.5 rounded-xl text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100/80 dark:hover:bg-slate-800/80 transition-all duration-200 shadow-sm hover:shadow group"
                  aria-label="Toggle Theme"
                >
                  {theme === "dark" ? (
                    <Sun className="h-5 w-5 group-hover:rotate-45 transition-transform duration-300" />
                  ) : (
                    <Moon className="h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
                  )}
                </button>

                {user && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleLogout}
                    className="ml-2 gap-2 text-red-600 hover:text-red-700 hover:bg-red-50/80 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-900/20 transition-all duration-200 border border-red-200/50 dark:border-red-900/30 shadow-sm hover:shadow"
                  >
                    <LogOut className="h-4 w-4" />
                    <span className="hidden lg:inline">{t("nav.logout")}</span>
                  </Button>
                )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-3 rounded-xl text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100/80 dark:hover:bg-slate-800/80 transition-all duration-200"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-700/50 shadow-lg dark:shadow-slate-900/50">
            <div className="pt-4 pb-4 space-y-2 px-4">
              {user && (
                <div className="py-4 px-4 rounded-xl bg-gradient-to-r from-slate-50 to-slate-100/80 dark:from-slate-800/50 dark:to-slate-900/50 border border-slate-200/50 dark:border-slate-700/50 mb-4">
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
                    {t("nav.signedIn")}
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-primary-700">
                      <UserIcon className="h-5 w-5 text-white" />
                    </div>
                    <p className="text-lg font-bold text-slate-900 dark:text-white truncate">
                      {displayName}
                    </p>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <div className="flex items-center justify-between py-3 px-4 rounded-xl hover:bg-slate-100/80 dark:hover:bg-slate-800/80 transition-colors duration-200">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800">
                      {theme === "dark" ? (
                        <Sun className="h-4 w-4 text-slate-600 dark:text-slate-300" />
                      ) : (
                        <Moon className="h-4 w-4 text-slate-600 dark:text-slate-300" />
                      )}
                    </div>
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      {theme === "dark"
                        ? t("nav.lightMode")
                        : t("nav.darkMode")}
                    </span>
                  </div>
                  <button
                    onClick={toggleTheme}
                    className="p-2.5 rounded-lg text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-200/80 dark:hover:bg-slate-700/80 transition-all duration-200"
                  >
                    {theme === "dark" ? (
                      <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                        {t("nav.switchLight")}
                      </span>
                    ) : (
                      <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                        {t("nav.switchDark")}
                      </span>
                    )}
                  </button>
                </div>

                <div className="flex items-center justify-between py-3 px-4 rounded-xl hover:bg-slate-100/80 dark:hover:bg-slate-800/80 transition-colors duration-200">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800">
                      <Globe className="h-4 w-4 text-slate-600 dark:text-slate-300" />
                    </div>
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      {t("nav.language")}
                    </span>
                  </div>
                  <button
                    onClick={toggleLanguage}
                    className="px-4 py-2 rounded-lg text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-200/80 dark:hover:bg-slate-700/80 transition-all duration-200 font-semibold shadow-sm"
                  >
                    {i18n.language === "en" ? "Français" : "English"}
                  </button>
                </div>
              </div>

              {user && (
                <Button
                  className="w-full mt-6 justify-center bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-lg hover:shadow-xl transition-all duration-300 py-3 rounded-xl font-semibold"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  {t("nav.logout")}
                </Button>
              )}
            </div>
          </div>
        )}
      </nav>

      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
        <div className="rounded-2xl bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 shadow-lg dark:shadow-slate-900/20 p-6 sm:p-8 min-h-[calc(100vh-12rem)]">
          <Outlet />
        </div>
      </main>

      {/* Add some custom animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};
