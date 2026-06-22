import React from 'react';
import { Calendar, ClipboardList, Clock, BarChart } from 'lucide-react';

export default function StatsSidebar({ roadmap }) {
  const totalMonths = roadmap ? roadmap.duration.split(' ')[0] : "6";
  const totalTopics = roadmap ? roadmap.totalTopics : "24+";
  const totalHours = roadmap ? roadmap.estimatedHours || "120+" : "120+";
  const targetLevel = roadmap ? roadmap.difficulty : "Beginner";

  return (
    <div className="space-y-5">
      {/* Top Level Indigo Motivation Card banner block widget */}
      <div className="bg-gradient-to-b from-[#1E1B4B] to-[#312E81] text-white rounded-3xl p-4 sm:p-5 text-center relative overflow-hidden shadow-sm">
        <div className="text-3xl mb-2 drop-shadow-md">🏆</div>
        <h3 className="text-[11px] font-bold tracking-wider text-slate-300 uppercase">Stay Consistent</h3>
        <h2 className="text-lg font-black text-amber-400 mt-0.5">Achieve Big!</h2>
        <p className="text-[10px] text-indigo-200/80 mt-1 max-w-[200px] mx-auto leading-relaxed font-semibold">
          Consistency is the key to success.
        </p>
        {/* Abstract background graphics objects decoration elements */}
        <div className="absolute -right-6 -bottom-6 w-16 h-16 bg-white/5 rounded-full blur-xl"></div>
      </div>

      {/* Analytics Parameters Breakdown Mapping List table layout views */}
      <div className="bg-white dark:bg-[#111827] rounded-3xl p-4 sm:p-5 border border-slate-100 dark:border-slate-800/80 shadow-sm space-y-4 transition-colors duration-300">
        <h4 className="text-xs font-black text-slate-800 dark:text-slate-200 tracking-wide uppercase">Roadmap Overview</h4>
        <div className="space-y-3.5">
          {[
            { label: "Total Months", value: totalMonths, icon: Calendar },
            { label: "Total Topics", value: totalTopics, icon: ClipboardList },
            { label: "Estimated Hours", value: totalHours, icon: Clock },
            { label: "Difficulty", value: targetLevel, highlight: true, icon: BarChart }
          ].map((row, index) => {
            const IconComponent = row.icon;
            return (
              <div key={index} className="flex justify-between items-center pb-2.5 border-b border-slate-50 dark:border-slate-800/40 last:border-0 last:pb-0">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-400 dark:text-slate-500">
                  <IconComponent className="w-3.5 h-3.5 text-indigo-500/80" />
                  <span>{row.label}</span>
                </div>
                <span className={`text-xs font-extrabold ${row.highlight ? 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-0.5 rounded-full text-[11px]' : 'text-slate-700 dark:text-slate-300'}`}>
                  {row.value}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quote citation slider parameters card widget blocks layout wrapper element */}
      <div className="bg-white dark:bg-[#111827] border border-slate-100 dark:border-slate-800/80 rounded-3xl p-4 sm:p-5 flex flex-col justify-between min-h-[165px] shadow-sm transition-colors duration-300">
        <div>
          <span className="text-4xl text-indigo-400/50 font-serif leading-none block h-2">“</span>
          <p className="text-xs font-bold text-slate-500 dark:text-slate-400 leading-relaxed pl-1 mt-1">
            The beautiful thing about learning is that no one can take it away from you.
          </p>
        </div>
        <div className="flex justify-between items-center mt-4">
          <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 tracking-wide">— B.B. King</span>
          {/* Active indicator circles tracks view sliders panels widgets elements */}
          <div className="flex gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-600"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-slate-200 dark:bg-slate-700"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-slate-200 dark:bg-slate-700"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-slate-200 dark:bg-slate-700"></span>
          </div>
        </div>
      </div>
    </div>
  );
}