import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom"; // 🌟 Navigate ko import kiya

import { ThemeProvider } from "./context/ThemeContext";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

import Sidebar from "./components/Sidebar";
import ProtectedRoute from "./routes/ProtectedRoute";

function DashboardLayout() {
  const [activePage, setActivePage] = useState(() => {
    const selectedRoadmap = localStorage.getItem("selectedRoadmap");
    return selectedRoadmap ? "generate" : "generate";
  });

  useEffect(() => {
    const selectedRoadmap = localStorage.getItem("selectedRoadmap");
    if (selectedRoadmap) {
      setActivePage("generate");
    }
  }, []);

  return (
    // 🌟 MOBILE SCROLL FIX: 'h-screen overflow-hidden' ko badal kar responsive kiya
    // Desktop (lg:) par fix rahega, par mobile par natural scroll hone dega (min-h-screen aur overflow-y-auto)
    <div className="flex flex-col lg:flex-row w-full min-h-screen lg:h-screen bg-[#F8F9FD] dark:bg-[#030712] p-4 pt-20 lg:pt-4 gap-5 overflow-y-auto lg:overflow-hidden transition-colors duration-300">
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
      />

      <Dashboard
        activePage={activePage}
        setActivePage={setActivePage}
      />
    </div>
  );
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // 'null' shuruat mein loading ke liye

  // 🌟 PERSIST LOGIN CHECK: App load hote hi sabse pehle token check karo
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  // Jab tak check chal raha ho, tab tak ek safe black background wala loader dikhao
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-[#07111f] flex items-center justify-center text-white font-bold">
        Loading...
      </div>
    );
  }

  return (
    <ThemeProvider>
      <Routes>
        {/* 🌟 USER REDIRECTION: Agar already logged in hai toh login page par kyu jana? Dashboard bhejo! */}
        <Route
          path="/"
          element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />}
        />

        <Route
          path="/register"
          element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Register />}
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        />
        
        {/* Fallback routing */}
        <Route path="*" element={<Navigate to={isAuthenticated ? "/dashboard" : "/"} replace />} />
      </Routes>
    </ThemeProvider>
  );
}