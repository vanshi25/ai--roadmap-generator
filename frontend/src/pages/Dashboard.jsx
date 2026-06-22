// import React, { useState } from "react";
// import API from "../services/api";

// import FilterPanel from "../components/FilterPanel";
// import RoadmapContainer from "../components/RoadmapContainer";
// import StatsSidebar from "../components/StatsSidebar";

// export default function Dashboard() {
//   const [roadmap, setRoadmap] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleGenerationEventTrigger = async (payload) => {
//     setLoading(true);
//     setError("");
//     setRoadmap(null);

//     try {
//       const { data } = await API.post(
//         "/roadmap/generate",
//         payload
//       );

//       console.log("Backend Response:", data);

//       if (data.success) {
//         setRoadmap(data.roadmap);
//       } else {
//         setError(
//           data.message || "Failed To Generate Roadmap"
//         );
//       }
//     } catch (err) {
//       console.error("Dashboard Error:", err);

//       setError(
//         err?.response?.data?.message ||
//         "Roadmap Generation Failed"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex flex-1 gap-5 overflow-x-hidden w-full items-start pt-16 lg:pt-0">

//       <div className="w-[340px] shrink-0 h-[calc(100vh-2rem)] sticky top-4">
//         <FilterPanel
//           onGenerate={handleGenerationEventTrigger}
//           loading={loading}
//           error={error}
//         />
//       </div>

//       <div className="flex-1 min-w-0 h-[calc(100vh-2rem)] overflow-y-auto custom-scrollbar">
//         <RoadmapContainer
//           roadmap={roadmap}
//           loading={loading}
//         />
//       </div>

//       <div className="w-[280px] shrink-0 h-[calc(100vh-2rem)] sticky top-4 flex flex-col gap-5">
//         <StatsSidebar roadmap={roadmap} />
//       </div>

//     </div>
//   );
// }


import Home from "./Home";
import Profile from "./Profile";
import Saved from "./Saved";
import MyRoadmaps from "./MyRoadmaps";

import React, { useEffect, useState } from "react";
import API from "../services/api";

import FilterPanel from "../components/FilterPanel";
import RoadmapContainer from "../components/RoadmapContainer";
import StatsSidebar from "../components/StatsSidebar";

export default function Dashboard({
  activePage,
  setActivePage,
}) {  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const [error, setError] = useState("");
useEffect(() => {
  const selectedRoadmap =
    localStorage.getItem("selectedRoadmap");

  if (selectedRoadmap) {
    try {
      const roadmapData =
        JSON.parse(selectedRoadmap);

      setRoadmap(roadmapData);

      localStorage.removeItem(
        "selectedRoadmap"
      );
    } catch (error) {
      console.error(error);
    }
  }
}, []);
  console.log("ACTIVE PAGE =", activePage);
  const handleGenerationEventTrigger = async (payload) => {
    setLoading(true);
    setError("");
    setRoadmap(null);

    try {
      const { data } = await API.post(
        "/roadmap/generate",
        payload
      );

      console.log("Backend Response:", data);

      if (data.success) {
        setRoadmap(data.roadmap);
      } else {
        setError(
          data.message || "Failed To Generate Roadmap"
        );
      }
    } catch (err) {
      console.error("Dashboard Error:", err);

      setError(
        err?.response?.data?.message ||
          "Roadmap Generation Failed"
      );
    } finally {
      setLoading(false);
    }
  };

if (activePage === "home") {
  return (
    <Home
      setActivePage={setActivePage}
    />
  );
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
  <div className="flex flex-col lg:flex-row flex-1 gap-5 overflow-x-hidden w-full items-start">

    {/* Filter Panel */}
    <div className="w-full lg:w-[340px] lg:shrink-0 lg:h-[calc(100vh-2rem)] lg:sticky lg:top-4">
      <FilterPanel
        onGenerate={handleGenerationEventTrigger}
        loading={loading}
        error={error}
      />
    </div>

    {/* Main Content */}
    <div className="flex-1 min-w-0 w-full lg:h-[calc(100vh-2rem)] overflow-y-auto custom-scrollbar">
      <RoadmapContainer
        roadmap={roadmap}
        loading={loading}
      />
    </div>

    {/* Stats Sidebar */}
    <div className="hidden xl:flex w-[280px] shrink-0 h-[calc(100vh-2rem)] sticky top-4 flex-col gap-5">
      <StatsSidebar roadmap={roadmap} />
    </div>

  </div>
);
  
} 