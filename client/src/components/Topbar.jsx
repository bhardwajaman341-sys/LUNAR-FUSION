import React from "react";
import { ChevronRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";

export function Topbar() {
  const location = useLocation();

  const currentPath = location.pathname.slice(1);

  const currentPage =
    currentPath === ""
      ? "Overview"
      : currentPath.charAt(0).toUpperCase() + currentPath.slice(1);

  return (
    <header
      className="
        h-16
        border-b
        border-lunar-200
        dark:border-lunar-800
        bg-white
        dark:bg-lunar-900
        sticky
        top-0
        z-30
      "
    >
      <div
        className="
          h-full
          flex
          items-center
          justify-between
          pl-20
          pr-6
        "
      >
        {/* Breadcrumb */}
        <div
          className="
            flex
            items-center
            gap-2
            text-sm
            text-lunar-600
            dark:text-lunar-400
          "
        >
          {/* SENTINEL */}
          <Link
            to="/overview"
            className="
              font-semibold
              text-lunar-900
              dark:text-lunar-100
              hover:text-cyan-500
              transition-colors
            "
          >
            SENTINEL
          </Link>

          {/* Arrow */}
          <ChevronRight size={16} />

          {/* Current Page */}
          <span>{currentPage}</span>
        </div>

        {/* Authentication Controls */}
        <div className="flex items-center gap-4">
          <SignedOut>
            <SignInButton mode="modal">
              <button
                className="
                  px-4
                  py-1.5
                  bg-cyan-500
                  hover:bg-cyan-400
                  text-slate-950
                  font-mono
                  text-xs
                  font-bold
                  rounded
                  transition-colors
                "
              >
                SIGN IN
              </button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: "w-8 h-8 rounded-full border border-lunar-700",
                },
              }}
            />
          </SignedIn>
        </div>
      </div>
    </header>
  );
}