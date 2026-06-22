import Home from "./Home";
import Profile from "./Profile";
import Saved from "./Saved";
import MyRoadmaps from "./MyRoadmaps";

import React, { useEffect, useState, useRef } from "react"; // 🌟 useRef ko import kiya
import API from "../services/api";

import FilterPanel from "../components/FilterPanel";
import RoadmapContainer from "../components/RoadmapContainer";
import StatsSidebar from "../components/StatsSidebar";

export default function Dashboard({ activePage, setActivePage }) {
  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 🌟 Auto-scroll ke liye ref banaya
  const roadmapSectionRef = useRef(null);

  useEffect(() => {
    const selectedRoadmap = localStorage.getItem("selectedRoadmap");

    if (selectedRoadmap) {
      try {
        const roadmapData = JSON.parse(selectedRoadmap);
        setRoadmap(roadmapData);
        localStorage.removeItem("selectedRoadmap");
      } catch (error) {
        console.error(error);
      }
    }
  }, []);

  // 🌟 Jab bhi naya roadmap aaye ya loading khtam ho, automatic smoothly scroll ho jaye
  useEffect(() => {
    if (roadmap && roadmapSectionRef.current) {
      setTimeout(() => {
        roadmapSectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100); // Chhota sa delay taaki DOM render ho jaye
    }
  }, [roadmap]);

  console.log("ACTIVE PAGE =", activePage);

  const handleGenerationEventTrigger = async (payload) => {
    setLoading(true);
    setError("");
    setRoadmap(null);

    try {
      const { data } = await API.post("/roadmap/generate", payload);
      console.log("Backend Response:", data);

      if (data.success) {
        setRoadmap(data.roadmap);
      } else {
        setError(data.message || "Failed To Generate Roadmap");
      }
    } catch (err) {
      console.error("Dashboard Error:", err);
      setError(err?.response?.data?.message || "Roadmap Generation Failed");
    } finally {
      setLoading(false);
    }
  };

  if (activePage === "home") {
    return <Home setActivePage={setActivePage} />;
  }

  // MY ROADMAPS PAGE
  if (activePage === "my-roadmaps") {
    return <MyRoadmaps />;
  }

  // SAVED PAGE
  if (activePage === "saved") {
    return <Saved />;
  }

  // PROFILE PAGE
  if (activePage === "profile") {
    return <Profile />;
  }

  // GENERATE PAGE (MAIN PAGE)
  return (
    // 🌟 min-h-screen aur overflow-y-auto ko parent par thik kiya taaki mobile par scroll block na ho
    <div className="flex flex-col lg:flex-row flex-1 gap-5 w-full items-start min-h-screen overflow-y-auto pb-10 px-4 lg:px-0">
      
      {/* Filter Panel (Form) */}
      <div className="w-full lg:w-[340px] lg:shrink-0 lg:h-[calc(100vh-2rem)] lg:sticky lg:top-4">
        <FilterPanel
          onGenerate={handleGenerationEventTrigger}
          loading={loading}
          error={error}
        />
      </div>

      {/* Main Content (Roadmap Output) */}
      {/* 🌟 lg: dynamic height sirf desktop par chalegi, mobile par natural scroll hoga */}
      <div 
        ref={roadmapSectionRef} // 🌟 Ref attach kiya scroll target ke liye
        className="flex-1 min-w-0 w-full lg:h-[calc(100vh-2rem)] lg:overflow-y-auto custom-scrollbar"
      >
        <RoadmapContainer roadmap={roadmap} loading={loading} />
      </div>

      {/* Stats Sidebar */}
      <div className="hidden xl:flex w-[280px] shrink-0 h-[calc(100vh-2rem)] sticky top-4 flex-col gap-5">
        <StatsSidebar roadmap={roadmap} />
      </div>

    </div>
  );
}