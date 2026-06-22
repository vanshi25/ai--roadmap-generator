import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import { ThemeProvider } from "./context/ThemeContext";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

import Sidebar from "./components/Sidebar";
import ProtectedRoute from "./routes/ProtectedRoute";

function DashboardLayout() {
const [activePage, setActivePage] = useState(() => {
  const selectedRoadmap =
    localStorage.getItem("selectedRoadmap");

  return selectedRoadmap
    ? "generate"
    : "generate";
});
  useEffect(() => {
    const selectedRoadmap =
      localStorage.getItem("selectedRoadmap");

    if (selectedRoadmap) {
      setActivePage("generate");
    }
  }, []);

  return (
    <div className="flex w-full h-screen bg-[#F8F9FD] dark:bg-[#030712] p-4 pt-20 lg:pt-4 gap-5 overflow-hidden transition-colors duration-300">
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
      />

<Dashboard
  activePage={activePage}
  setActivePage={setActivePage}
/>    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <Routes>

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        />

      </Routes>
    </ThemeProvider>
  );
}