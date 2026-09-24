import { Link, useLocation } from "react-router-dom";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { useState } from "react";

export function Sidebar() {
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { path: "/overview", label: "Overview" },
    { path: "/upload", label: "Upload" },
    { path: "/metadata", label: "Metadata" },
    { path: "/preprocessing", label: "Preprocessing" },
    { path: "/correspondence", label: "Correspondence" },
    { path: "/verification", label: "Verification" },
    { path: "/distribution", label: "Distribution" },
    { path: "/registration", label: "Registration" },
    { path: "/intelligence", label: "Intelligence" },
    { path: "/evaluation", label: "Evaluation" },
    { path: "/comparison", label: "Comparison" },
    { path: "/experiments", label: "Experiments" },
    { path: "/reports", label: "Reports" },
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  const openSidebar = () => {
    setIsOpen(true);
  };

  return (
    <>
      {/* =====================================
          HAMBURGER BUTTON
          Always visible
      ===================================== */}
      {!isOpen && (
        <button
          type="button"
          onClick={openSidebar}
          className="
            fixed
            top-4
            left-4
            z-[100]
            flex
            items-center
            justify-center
            w-11
            h-11
            rounded-lg
            bg-white
            dark:bg-lunar-900
            border
            border-lunar-200
            dark:border-lunar-700
            text-lunar-900
            dark:text-lunar-100
            shadow-lg
            hover:bg-lunar-100
            dark:hover:bg-lunar-800
            transition-all
            duration-200
          "
          aria-label="Open sidebar"
        >
          <Menu size={24} />
        </button>
      )}

      {/* =====================================
          OVERLAY
          Visible when sidebar is open
      ===================================== */}
      {isOpen && (
        <div
          className="
            fixed
            inset-0
            bg-black/40
            z-[40]
            hidden
          "
          onClick={closeSidebar}
        />
      )}

      {/* =====================================
          SIDEBAR
      ===================================== */}
      <aside
        className={`
          fixed
          top-0
          left-0
          h-screen
          w-64
          z-[90]

          flex
          flex-col

          bg-white
          dark:bg-lunar-900

          border-r
          border-lunar-200
          dark:border-lunar-800

          shadow-xl

          transform
          transition-transform
          duration-300
          ease-in-out

          ${
            isOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >
        {/* =====================================
            HEADER
        ===================================== */}
        <div
          className="
            flex
            items-center
            justify-between
            p-6
            border-b
            border-lunar-200
            dark:border-lunar-800
          "
        >
          <Link
            to="/overview"
            onClick={closeSidebar}
            className="block"
          >
            <h1
              className="
                text-2xl
                font-bold
                tracking-wide
                text-lunar-900
                dark:text-lunar-100
              "
            >
              SENTINEL
            </h1>

            <p
              className="
                mt-1
                text-xs
                text-lunar-600
                dark:text-lunar-400
              "
            >
              Lunar Registration Lab
            </p>
          </Link>

          {/* CLOSE BUTTON */}
          <button
            type="button"
            onClick={closeSidebar}
            className="
              flex
              items-center
              justify-center
              w-9
              h-9
              rounded-lg

              text-lunar-700
              dark:text-lunar-300

              hover:bg-lunar-100
              dark:hover:bg-lunar-800

              transition-colors
            "
            aria-label="Close sidebar"
          >
            <X size={22} />
          </button>
        </div>

        {/* =====================================
            NAVIGATION
        ===================================== */}
        <nav
          className="
            flex-1
            overflow-y-auto
            p-4
          "
        >
          <ul className="space-y-1">
            {navItems.map((item) => {
              const active = isActive(item.path);

              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    onClick={closeSidebar}
                    className={`
                      flex
                      items-center
                      w-full
                      px-4
                      py-3
                      rounded-lg

                      text-sm
                      font-medium

                      transition-all
                      duration-200

                      ${
                        active
                          ? `
                            bg-cyan-100
                            dark:bg-cyan-900/30
                            text-cyan-900
                            dark:text-cyan-300
                            border-l-2
                            border-cyan-500
                          `
                          : `
                            text-lunar-700
                            dark:text-lunar-300
                            hover:bg-lunar-100
                            dark:hover:bg-lunar-800
                          `
                      }
                    `}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* =====================================
            THEME TOGGLE
        ===================================== */}
        <div
          className="
            p-4
            border-t
            border-lunar-200
            dark:border-lunar-800
          "
        >
          <button
            type="button"
            onClick={toggleTheme}
            className="
              flex
              items-center
              justify-center
              gap-2
              w-full
              px-4
              py-3
              rounded-lg

              bg-lunar-100
              dark:bg-lunar-800

              text-lunar-900
              dark:text-lunar-100

              hover:bg-lunar-200
              dark:hover:bg-lunar-700

              font-medium
              text-sm

              transition-colors
            "
          >
            {isDark ? (
              <>
                <Sun size={18} />
                <span>Light Mode</span>
              </>
            ) : (
              <>
                <Moon size={18} />
                <span>Dark Mode</span>
              </>
            )}
          </button>
        </div>
      </aside>
    </>
  );
}