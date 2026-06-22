import React, { useState } from 'react';
import { Target, Calendar, BarChart2, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function FilterPanel({ onGenerate, loading, error }) {
  const [goal, setGoal] = useState("Become a Frontend Developer");
  const [duration, setDuration] = useState("6 Months");
  const [level, setLevel] = useState("Beginner");
  const [focus, setFocus] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onGenerate({ goal, duration, level, focus });
  };

  return (
    <div className="bg-white dark:bg-[#111827] rounded-[24px] sm:rounded-[32px] p-4 sm:p-6 border border-slate-100 dark:border-slate-800/60 min-h-fit lg:h-full flex flex-col justify-between shadow-[0_4px_25px_rgba(0,0,0,0.005)] transition-colors duration-300">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <h2 className="
          
          
          font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Generate Your</h2>
          <h1 className="text-lg sm:text-[22px] font-extrabold text-[#5A67D8] dark:text-indigo-400 flex items-center gap-1.5 mt-0.5">
            Personalized Roadmap <span className="animate-pulse">✨</span>
          </h1>
          <p className="text-sm text-slate-400 dark:text-slate-500 mt-1 font-medium leading-relaxed">
            Answer a few questions and get your custom roadmap
          </p>
        </div>

        <div className="space-y-4">
          {/* Goal Input Field */}
          <div>
            <label className="text-sm font-bold text-[#4A5568] dark:text-slate-300 block mb-1.5">What is your goal?</label>
            <div className="relative">
              <Target className="absolute left-4 top-3.5 text-indigo-500 w-4 h-4" />
              <input 
                type="text" 
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                className="w-full bg-[#F8F9FD] dark:bg-slate-800/40 border border-[#E2E8F0] dark:border-slate-700/50 rounded-2xl pl-12 pr-4 py-3 text-sm font-bold text-slate-700 dark:text-slate-200 focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-400 focus:bg-white dark:focus:bg-slate-800 transition-all shadow-inner"
                required
              />
            </div>
          </div>

          {/* Timeframe Dropdown */}
          <div>
            <label className="text-sm font-bold text-[#4A5568] dark:text-slate-300 block mb-1.5">Duration</label>
            <div className="relative">
              <Calendar className="absolute left-4 top-3.5 text-indigo-500 w-4 h-4" />
              <select 
                value={duration} 
                onChange={(e) => setDuration(e.target.value)}
                className="w-full bg-[#F8F9FD] dark:bg-slate-800/40 border border-[#E2E8F0] dark:border-slate-700/50 rounded-2xl pl-12 pr-4 py-3 text-sm font-bold text-slate-700 dark:text-slate-200 focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-400 focus:bg-white dark:focus:bg-slate-800 cursor-pointer appearance-none shadow-inner"
              >
                <option>1 Month</option>
                <option>3 Months</option>
                <option>6 Months</option>
                <option>12 Months</option>
              </select>
            </div>
          </div>

          {/* Skill Level Selection */}
          <div>
            <label className="text-sm font-bold text-[#4A5568] dark:text-slate-300 block mb-1.5">Your Current Level</label>
            <div className="relative">
              <BarChart2 className="absolute left-4 top-3.5 text-indigo-500 w-4 h-4" />
              <select 
                value={level} 
                onChange={(e) => setLevel(e.target.value)}
                className="w-full bg-[#F8F9FD] dark:bg-slate-800/40 border border-[#E2E8F0] dark:border-slate-700/50 rounded-2xl pl-12 pr-4 py-3 text-sm font-bold text-slate-700 dark:text-slate-200 focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-400 focus:bg-white dark:focus:bg-slate-800 cursor-pointer appearance-none shadow-inner"
              >
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>
            </div>
          </div>

          {/* Focus Keyword Optional Row */}
          <div>
            <label className="text-sm font-bold text-[#4A5568] dark:text-slate-300 block mb-1.5">Learning Focus <span className="text-slate-400 dark:text-slate-500 font-normal">(Optional)</span></label>
            <div className="relative">
              <Sparkles className="absolute left-4 top-3.5 text-slate-400 dark:text-slate-600 w-4 h-4" />
              <input 
                type="text" 
                value={focus}
                onChange={(e) => setFocus(e.target.value)}
                placeholder="e.g. Web Development, DSA, AI..."
                className="w-full bg-[#F8F9FD] dark:bg-slate-800/40 border border-[#E2E8F0] dark:border-slate-700/50 rounded-2xl pl-12 pr-4 py-3 text-sm font-medium placeholder-slate-400 dark:placeholder-slate-600 text-slate-700 dark:text-slate-200 focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-400 focus:bg-white dark:focus:bg-slate-800 transition-all shadow-inner"
              />
            </div>
          </div>
        </div>

        <motion.button 
          whileTap={{ scale: 0.99 }}
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-indigo-500 via-indigo-600 to-purple-600 text-white font-bold py-3.5 rounded-2xl shadow-lg shadow-indigo-100 dark:shadow-none hover:opacity-95 transition-all text-sm sm:text-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
        >
          <Sparkles className="w-4 h-4" />
          {loading ? "AI is processing track..." : "Generate Roadmap"}
        </motion.button>
        {error && <p className="text-sm text-red-500 text-center font-semibold mt-1">{error}</p>}
      </form>

      {/* Static Information Footer Area */}
     <div className="hidden sm:flex bg-[#F4F7FE] dark:bg-slate-800/40 border border-indigo-50/20 dark:border-slate-700/30 rounded-2xl p-4 flex items-start gap-3 mt-6">
        <div className="bg-white dark:bg-slate-800 p-2 rounded-xl shadow-sm text-indigo-500 text-base shrink-0">⭐</div>
        <div>
          <h4 className="text-sm font-bold text-indigo-950 dark:text-slate-200">Personalized for you</h4>
          <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5 leading-normal">Our AI will create a roadmap customized to your goal, time and level.</p>
        </div>
      </div>
    </div>
  );
}