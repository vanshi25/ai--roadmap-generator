import React from 'react';
import { Map, ChevronRight, Check, Code, Download, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import jsPDF from "jspdf";
import { useState } from "react";
const designSchemes = [
  { bg: 'bg-[#FAF5FF] dark:bg-purple-950/20', font: 'text-[#9F7AEA] dark:text-purple-400', ring: 'ring-purple-100 dark:ring-purple-900/40', bullet: 'bg-purple-500', bar: 'bg-[#48BB78]', tag: '🌐' },
  { bg: 'bg-[#FFFDF5] dark:bg-yellow-950/10', font: 'text-[#ECC94B] dark:text-yellow-400', ring: 'ring-yellow-100 dark:ring-yellow-900/30', bullet: 'bg-yellow-500', bar: 'bg-[#5A67D8]', tag: 'JS' },
  { bg: 'bg-[#F0FDF4] dark:bg-green-950/20', font: 'text-[#48BB78] dark:text-green-400', ring: 'ring-green-100 dark:ring-green-900/40', bullet: 'bg-green-500', bar: 'bg-[#5A67D8]', tag: '🚀' },
  { bg: 'bg-[#FFFAF0] dark:bg-orange-950/20', font: 'text-[#ED8936] dark:text-orange-400', ring: 'ring-orange-100 dark:ring-orange-900/40', bullet: 'bg-orange-500', bar: 'bg-[#5A67D8]', tag: '🐙' },
  { bg: 'bg-[#FFF5F5] dark:bg-red-950/20', font: 'text-[#E53E3E] dark:text-red-400', ring: 'ring-red-100 dark:ring-red-900/40', bullet: 'bg-red-500', bar: 'bg-[#5A67D8]', tag: '⚙️' }
];

const mockStateData = {
  roadmapTitle: "Frontend Developer Roadmap",
  difficulty: "Beginner",
  duration: "6 Months Roadmap",
  totalTopics: 24,
  phases: [
    { month: 1, title: "HTML & CSS Fundamentals", topics: ["HTML Basics", "Semantic HTML", "CSS Basics", "CSS Grid", "Flexbox", "Responsive Design"], progress: 100 },
    { month: 2, title: "JavaScript Basics", topics: ["Variables & Data Types", "DOM Basics", "Operators", "Events", "Functions", "Conditionals & Loops"], progress: 0 },
    { month: 3, title: "Advanced JavaScript", topics: ["Arrays & Methods", "DOM Manipulation", "Objects", "Async JavaScript", "ES6+ Features", "Error Handling"], progress: 0 },
    { month: 4, title: "Git & Version Control", topics: ["Git Basics", "Merging", "Repositories", "GitHub", "Branches", "Best Practices"], progress: 0 },
    { month: 5, title: "Frontend Libraries", topics: ["Bootstrap / Tailwind CSS", "UI/UX Basics", "Components", "Custom Components", "Responsive Layouts", "Projects"], progress: 0 },
    { month: 6, title: "Projects & Deployment", topics: ["Mini Projects", "Deployment", "GitHub Portfolio", "Best Practices"], progress: 0 }
  ]
};

export default function RoadmapContainer({ roadmap, loading, onViewPhaseDetails }) {
  
  const [selectedPhase, setSelectedPhase] = useState(null);
  const dataset = roadmap || mockStateData;
  const handleExport = () => {
    const pdf = new jsPDF();

    pdf.setFontSize(18);
    pdf.text(dataset.roadmapTitle || "Roadmap", 10, 20);

    let y = 35;

    dataset.phases?.forEach((phase) => {
      pdf.setFontSize(12);
      pdf.text(`Month ${phase.month}: ${phase.title}`, 10, y);
      y += 8;

      phase.topics?.forEach((topic) => {
        pdf.setFontSize(10);
        pdf.text(`• ${topic}`, 15, y);
        y += 6;
      });

      y += 5;
    });

    pdf.save("roadmap.pdf");
  };

  const handleSave = () => {
    const savedRoadmaps =
      JSON.parse(localStorage.getItem("savedRoadmaps")) || [];

    savedRoadmaps.push(dataset);

    localStorage.setItem(
      "savedRoadmaps",
      JSON.stringify(savedRoadmaps)
    );

    alert("Roadmap Saved Successfully 🚀");
  };
  const getResources = (phase) => {
  return {
    project:
      phase.project ||
      `Build a project based on ${phase.title}`,

   youtube: [
  {
    name: "Hitesh Choudhary",
    link: "https://www.youtube.com/@HiteshCodeLab",
  },
  {
    name: "Chai Aur Code",
    link: "https://www.youtube.com/@chaiaurcode",
  },
  {
    name: "CodeWithHarry",
    link: "https://www.youtube.com/@CodeWithHarry",
  },
],

docs: [
  {
    name: "MDN Docs",
    link: "https://developer.mozilla.org",
  },
  {
    name: "React Docs",
    link: "https://react.dev",
  },
  {
    name: "W3Schools",
    link: "https://www.w3schools.com",
  },
],
    practice: [
      "Frontend Mentor",
      "CodePen",
      "HackerRank",
    ],
  };
};
  return (
    <div className="space-y-5 custom-scrollbar">
      {/* Dynamic Greetings Top Banner Block */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 px-1 mt-10 sm:mt-0">
        <div>
         <h1 className="text-lg sm:text-xl font-extrabold
         text-slate-800 dark:text-slate-100 flex items-center gap-1.5">👋 Hi, Developer!</h1>
          <p className="text-xs text-slate-400 dark:text-slate-500 font-medium mt-0.5">Let's build your future step by step.</p>
        </div>
        <button className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2 text-xs font-bold text-slate-600 dark:text-slate-300 shadow-sm flex items-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer">
          <Map className="w-3.5 h-3.5 text-indigo-500" /> My Roadmaps
        </button>
      </div>

      {/* Main Framework Identity Header Track */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 bg-white dark:bg-[#111827] p-4 rounded-3xl border border-slate-100 dark:border-slate-800/80 shadow-sm transition-colors duration-300">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="bg-gradient-to-tr from-indigo-500 to-purple-600 text-white w-12 h-12 rounded-2xl flex items-center justify-center shadow-md shadow-indigo-100 dark:shadow-none">
            <Code className="w-5 h-5 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm sm:text-[17px]
               font-extrabold text-slate-800 dark:text-slate-100 tracking-tight">{dataset.roadmapTitle}</h2>
              <span className="text-[10px] font-bold bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 px-2.5 py-0.5 rounded-full border border-indigo-100/30">
                {dataset.difficulty}
              </span>
            </div>
            <p className="text-xs text-slate-400 dark:text-slate-500 font-medium mt-0.5">
              {dataset.duration} • {dataset.totalTopics}+ Topics • Hands-on Projects
            </p>
          </div>
        </div>
      <div className="flex flex-wrap gap-2 w-full lg:w-auto">
     <button
  onClick={handleExport}
  className=" flex-1 lg:flex-none px-4 py-2 border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-bold text-slate-600 dark:text-slate-300 flex items-center gap-1.5 cursor-pointer"
>
  <Download className="w-3.5 h-3.5" />
  Export
</button>

<button
  onClick={handleSave}
  className=" flex-1 lg:flex-none px-4 py-2 border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-bold text-slate-600 dark:text-slate-300 flex items-center gap-1.5 cursor-pointer"
>
  <Heart className="w-3.5 h-3.5" />
  Save
</button>
        </div>
      </div>

      {/* Timeline Stream Execution Track Grid */}
     <div className="relative pl-6 sm:pl-10 space-y-4">
        {/* Dashed Tracking Axis Vector Line */}
        <div className="absolute left-[17px] top-4 bottom-4 w-[2px] border-l-2 border-dashed border-indigo-100 dark:border-slate-800 z-0"></div>

        {loading ? (
          <div className="space-y-4 animate-pulse">
            <div className="h-32 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800"></div>
            <div className="h-32 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800"></div>
          </div>
        ) : (
          dataset.phases?.map((phase, idx) => {
            const pattern = designSchemes[idx % designSchemes.length];
            return (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                key={idx}
                className="relative z-10 bg-white dark:bg-[#111827] border border-slate-100 dark:border-slate-800/80 rounded-3xl p-4 sm:p-5 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 lg:gap-6 shadow-[0_2px_15px_rgba(0,0,0,0.003)] hover:shadow-md dark:hover:shadow-none transition-all group duration-300"
              >
                {/* Node Alignment anchoring pin elements */}
                <div className={`absolute -left-[30px] w-3.5 h-3.5 rounded-full border-2 border-white dark:border-[#111827] ring-4 ${pattern.ring} ${pattern.bullet}`}></div>

                {/* Left Round Badge representation tracking index count */}
                <div className={`w-14 h-14 rounded-full shrink-0 flex flex-col items-center justify-center font-bold ${pattern.bg} ${pattern.font}`}>
                  <span className="text-lg font-black leading-none">{phase.month}</span>
                  <span className="text-[9px] uppercase tracking-wider font-extrabold mt-0.5">Month</span>
                </div>

                {/* Center Sub-track Parameters mapping view data lists */}
                <div className="flex-1 min-w-0 pl-1">
                  <h3 className="text-sm font-extrabold text-slate-800 dark:text-slate-100 mb-2.5 tracking-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{phase.title}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                    {phase.topics?.map((topic, subIdx) => (
                      <div key={subIdx} className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400 truncate">
                        <Check className={`w-3.5 h-3.5 shrink-0 ${phase.progress > 0 ? 'text-indigo-500' : 'text-slate-300 dark:text-slate-700'}`} strokeWidth={3} />
                        {topic}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right side metric progress bars layouts configurations */}
                <div className="w-full lg:w-36 flex items-center gap-4 shrink-0 pl-0 lg:pl-4 border-t lg:border-t-0 lg:border-l border-slate-50 dark:border-slate-800/60 pt-4 lg:pt-0">
                  <div className="flex-1">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center font-black text-sm bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-sm ml-auto mb-2 text-slate-700 dark:text-slate-300">
                      {pattern.tag}
                    </div>
                    <div className="w-full">
                      <div className="flex justify-between text-[10px] font-bold text-slate-400 dark:text-slate-500 mb-1">
                        <span>{phase.progress}%</span>
                      </div>
                      <div className="w-full bg-slate-100 dark:bg-slate-800 h-1 rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all duration-500 ${pattern.bar}`}
                          style={{ width: `${phase.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  {/* Chevron Right triggers specific modal components layout views drawer details */}
               <button
  onClick={() => setSelectedPhase(phase)}
                    className="w-7 h-7 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200/60 dark:border-slate-700 rounded-full flex items-center justify-center text-slate-400 transition-colors cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4 stroke-[2.5]" />
                  </button>
                </div>

              </motion.div>
            );
          })
        )}
          </div>

      {selectedPhase && (
<div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
 <div className="bg-white rounded-3xl p-4 sm:p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex justify-between items-center mb-6">

             <h2 className="text-xl sm:text-2xl font-black text-slate-800">
                📚 Month {selectedPhase.month}
              </h2>

              <button
                onClick={() => setSelectedPhase(null)}
                className="text-red-500 text-xl font-bold"
              >
                ✕
              </button>

            </div>

          <h3 className="text-lg sm:text-xl font-bold mb-4 text-slate-800">
              {selectedPhase.title}
            </h3>

            <div className="mb-6">
              <h4 className="font-bold text-indigo-500 mb-2">
                Topics
              </h4>

              {selectedPhase.topics?.map((topic, index) => (
              
              <p key={index} className="text-sm text-slate-700">
                  ✔ {topic}
                </p>
              ))}
            </div>

            <div className="mb-6">
              <h4 className="font-bold text-green-500 mb-2">
                🚀 Project
              </h4>

              <p>
                {getResources(selectedPhase).project}
              </p>
            </div>

            <div className="mb-6">
              <h4 className="font-bold text-red-500 mb-2">
                🎥 YouTube Resources
              </h4>

    {getResources(selectedPhase).youtube.map((item, index) => (
  <a
    key={index}
    href={item.link}
    target="_blank"
    rel="noreferrer"
    className="block text-blue-600 hover:underline"
  >
    {item.name}
  </a>
))}
            </div>

            <div className="mb-6">
              <h4 className="font-bold text-blue-500 mb-2">
                📖 Documentation
              </h4>
{getResources(selectedPhase).docs.map((item, index) => (
  <a
    key={index}
    href={item.link}
    target="_blank"
    rel="noreferrer"
    className="block text-blue-600 hover:underline"
  >
    {item.name}
  </a>
))}
            </div>

            <div>
              <h4 className="font-bold text-purple-500 mb-2">
                💻 Practice Platforms
              </h4>

              {getResources(selectedPhase).practice.map((item, index) => (
              <p key={index} className="text-sm text-slate-700">
                  {item}</p>
              ))}
            </div>

          </div>

        </div>
      )}

    </div>
  );
}