import { BookOpen, Heart, Target, Sparkles } from "lucide-react";

export default function Home({ setActivePage }) {
  const savedRoadmaps =
    JSON.parse(
      localStorage.getItem("savedRoadmaps")
    ) || [];

  return (
    <div className="flex-1 bg-white dark:bg-[#111827] rounded-[32px] p-4 sm:p-6 lg:p-8 overflow-y-auto">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-800 dark:text-white">
          👋 Welcome Back
        </h1>

        <p className="text-slate-500 dark:text-slate-400 mt-2">
          Continue building your dream career roadmap.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">

        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl p-4 sm:p-6 text-white">
          <BookOpen size={32} />
          <h2 className="text-3xl font-black mt-4">
            {savedRoadmaps.length}
          </h2>
          <p className="mt-2 font-medium">
            Saved Roadmaps
          </p>
        </div>

        <div className="bg-gradient-to-r from-pink-500 to-rose-500 rounded-3xl p-4 sm:p-6 text-white">
          <Heart size={32} />
          <h2 className="text-3xl font-black mt-4">
            {savedRoadmaps.length}
          </h2>
          <p className="mt-2 font-medium">
            Favorites
          </p>
        </div>

        <div className="bg-gradient-to-r from-emerald-500 to-green-600 rounded-3xl p-4 sm:p-6 text-white">
          <Target size={32} />
          <h2 className="text-3xl font-black mt-4">
            Active
          </h2>
          <p className="mt-2 font-medium">
            Learning Goal
          </p>
        </div>

        <div className="bg-gradient-to-r from-orange-500 to-yellow-500 rounded-3xl p-4 sm:p-6 text-white">
          <Sparkles size={32} />
          <h2 className="text-3xl font-black mt-4">
            AI
          </h2>
          <p className="mt-2 font-medium">
            Powered Learning
          </p>
        </div>

      </div>

      {/* Recent Saved */}
      <div className="mt-10">

        <h2 className="text-2xl font-black text-slate-800 dark:text-white mb-5">
          Recent Saved Roadmaps
        </h2>

        {savedRoadmaps.length === 0 ? (
          <div className="bg-slate-50 dark:bg-slate-900 rounded-3xl p-10 text-center">
            <h3 className="text-xl font-bold text-slate-700 dark:text-white">
              No Saved Roadmaps Yet
            </h3>

            <p className="text-slate-500 mt-2">
              Save your first roadmap to see it here.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">

            {savedRoadmaps
              .slice(-3)
              .reverse()
              .map((item, index) => (
                <div
                  key={index}
                  className="
                  bg-slate-50
                  dark:bg-slate-900
                  border
                  border-slate-200
                  dark:border-slate-800
                  rounded-3xl
                  p-5
                  "
                >
                  <h3 className="text-lg font-bold text-slate-800 dark:text-white">
                    {item.roadmapTitle}
                  </h3>

                  <p className="text-slate-500 mt-2">
                    {item.duration}
                  </p>
                </div>
              ))}

          </div>
        )}
      </div>
{/* Motivation Banner */}
<div className="mt-10">
  <div className="bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 rounded-3xl p-8 text-white">

    <h2 className="text-2xl sm:text-3xl font-black">
      🚀 Keep Learning
    </h2>

    <p className="mt-3 text-white/90 text-sm sm:text-base">
      Every roadmap completed brings you one step closer to your dream career.
      Stay consistent and trust the process.
    </p>

  </div>
</div>

{/* Quick Actions */}
<div className="mt-10">

  <h2 className="text-2xl font-black text-slate-800 dark:text-white mb-5">
    Quick Actions
  </h2>

  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
<div
  onClick={() => setActivePage("generate")}
className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 cursor-pointer hover:shadow-lg transition-all">
      <h3 className="font-bold text-slate-800 dark:text-white">
        🚀 Generate Roadmap
      </h3>

      <p className="text-slate-500 mt-2 text-sm">
        Create a new AI roadmap.
      </p>
    </div>

    <div 
      onClick={() => setActivePage("my-roadmaps")}
   className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 cursor-pointer hover:shadow-lg transition-all">
      <h3 className="font-bold text-slate-800 dark:text-white">
        🗺️ My Roadmaps
      </h3>

      <p className="text-slate-500 mt-2 text-sm">
        View generated roadmaps.
      </p>
    </div>

    <div
    onClick={() => setActivePage("saved")}

   className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 cursor-pointer hover:shadow-lg transition-all">
      <h3 className="font-bold text-slate-800 dark:text-white">
        ❤️ Saved
      </h3>

      <p className="text-slate-500 mt-2 text-sm">
        Manage saved roadmaps.
      </p>
    </div>

    <div 
    
      onClick={() => setActivePage("profile")}
   className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 cursor-pointer hover:shadow-lg transition-all">
      <h3 className="font-bold text-slate-800 dark:text-white">
        👤 Profile
      </h3>

      <p className="text-slate-500 mt-2 text-sm">
        Manage account settings.
      </p>
    </div>

  </div>

</div>
    </div>
  );
}