import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";

import { RegistrationProvider } from "./context/RegistrationContext";
import { ThemeProvider } from "./context/ThemeContext";
import { Sidebar } from "./components/Sidebar";
import { Topbar } from "./components/Topbar";

import { Landing } from "./pages/Landing";
import { Overview } from "./pages/Overview";
import { UploadPage } from "./pages/Upload";
import { Metadata } from "./pages/Metadata";
import { Preprocessing } from "./pages/Preprocessing";
import { Correspondence } from "./pages/Correspondence";
import { Verification } from "./pages/Verification";
import { Distribution } from "./pages/Distribution";
import { Registration } from "./pages/Registration";
import { Intelligence } from "./pages/Intelligence";
import { Evaluation } from "./pages/Evaluation";
import { Comparison } from "./pages/Comparison";
import { Experiments } from "./pages/Experiments";
import { Reports } from "./pages/Reports";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing VITE_CLERK_PUBLISHABLE_KEY in .env file");
}

function AppContent() {
  const location = useLocation();
  const isLandingPage = location.pathname === "/";

  return (
    <div className="min-h-screen bg-white dark:bg-lunar-950 text-lunar-900 dark:text-lunar-100 transition-colors duration-200">
      {/* Sidebar - Visible after leaving landing page */}
      {!isLandingPage && <Sidebar />}

      {/* Main Application Area */}
      <div className="min-h-screen">
        {/* Topbar inside application */}
        {!isLandingPage && <Topbar />}

        {/* Page Content */}
        <main className="min-h-[calc(100vh-4rem)]">
          <Routes>
            {/* Unprotected Landing Page */}
            <Route path="/" element={<Landing />} />

            {/* Protected Routes - Accessible only when SignedIn */}
            <Route
              path="/overview"
              element={
                <>
                  <SignedIn><Overview /></SignedIn>
                  <SignedOut><Navigate to="/" replace /></SignedOut>
                </>
              }
            />
            <Route
              path="/upload"
              element={
                <>
                  <SignedIn><UploadPage /></SignedIn>
                  <SignedOut><Navigate to="/" replace /></SignedOut>
                </>
              }
            />
            <Route
              path="/metadata"
              element={
                <>
                  <SignedIn><Metadata /></SignedIn>
                  <SignedOut><Navigate to="/" replace /></SignedOut>
                </>
              }
            />
            <Route
              path="/preprocessing"
              element={
                <>
                  <SignedIn><Preprocessing /></SignedIn>
                  <SignedOut><Navigate to="/" replace /></SignedOut>
                </>
              }
            />
            <Route
              path="/correspondence"
              element={
                <>
                  <SignedIn><Correspondence /></SignedIn>
                  <SignedOut><Navigate to="/" replace /></SignedOut>
                </>
              }
            />
            <Route
              path="/verification"
              element={
                <>
                  <SignedIn><Verification /></SignedIn>
                  <SignedOut><Navigate to="/" replace /></SignedOut>
                </>
              }
            />
            <Route
              path="/distribution"
              element={
                <>
                  <SignedIn><Distribution /></SignedIn>
                  <SignedOut><Navigate to="/" replace /></SignedOut>
                </>
              }
            />
            <Route
              path="/registration"
              element={
                <>
                  <SignedIn><Registration /></SignedIn>
                  <SignedOut><Navigate to="/" replace /></SignedOut>
                </>
              }
            />
            <Route
              path="/intelligence"
              element={
                <>
                  <SignedIn><Intelligence /></SignedIn>
                  <SignedOut><Navigate to="/" replace /></SignedOut>
                </>
              }
            />
            <Route
              path="/evaluation"
              element={
                <>
                  <SignedIn><Evaluation /></SignedIn>
                  <SignedOut><Navigate to="/" replace /></SignedOut>
                </>
              }
            />
            <Route
              path="/comparison"
              element={
                <>
                  <SignedIn><Comparison /></SignedIn>
                  <SignedOut><Navigate to="/" replace /></SignedOut>
                </>
              }
            />
            <Route
              path="/experiments"
              element={
                <>
                  <SignedIn><Experiments /></SignedIn>
                  <SignedOut><Navigate to="/" replace /></SignedOut>
                </>
              }
            />
            <Route
              path="/reports"
              element={
                <>
                  <SignedIn><Reports /></SignedIn>
                  <SignedOut><Navigate to="/" replace /></SignedOut>
                </>
              }
            />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/overview" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <Router>
        <ThemeProvider>
          <RegistrationProvider>
            <AppContent />
          </RegistrationProvider>
        </ThemeProvider>
      </Router>
    </ClerkProvider>
  );
}