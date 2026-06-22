
    import { useEffect, useState } from "react";

export default function Saved() {
  const [savedRoadmaps, setSavedRoadmaps] = useState([]);

  useEffect(() => {
    const data =
      JSON.parse(
        localStorage.getItem("savedRoadmaps")
      ) || [];

    setSavedRoadmaps(data);
  }, []);

  const handleDelete = (index) => {
    const updatedRoadmaps =
      savedRoadmaps.filter(
        (_, i) => i !== index
      );

    setSavedRoadmaps(updatedRoadmaps);

    localStorage.setItem(
      "savedRoadmaps",
      JSON.stringify(updatedRoadmaps)
    );
  };

  const handleView = (roadmap) => {
    localStorage.setItem(
      "selectedRoadmap",
      JSON.stringify(roadmap)
    );

    window.location.reload();
  };

  return (
    <div className="flex-1 bg-white dark:bg-[#111827] rounded-[32px] p-4 sm:p-6 lg:p-8 overflow-y-auto">

      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-800 dark:text-white">
          ❤️ Saved Roadmaps
        </h1>

        <p className="text-slate-500 dark:text-slate-400 mt-2">
          Your saved learning roadmaps
        </p>
      </div>

      {savedRoadmaps.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20">

          <div className="text-6xl mb-4">
            ❤️
          </div>

          <h2 className="text-xl font-bold text-slate-700 dark:text-white">
            No Saved Roadmaps
          </h2>

          <p className="text-slate-500 mt-2 text-center">
            Save a roadmap to see it here.
          </p>

        </div>
      ) : (
        <div
          className="
          grid
          grid-cols-1
          md:grid-cols-2
          xl:grid-cols-3
          gap-5
          "
        >
          {savedRoadmaps.map((item, index) => (
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
              hover:shadow-lg
              transition-all
              duration-300
              "
            >
              <h2 className="text-lg sm:text-xl font-bold text-slate-800 dark:text-white">
                {item.roadmapTitle}
              </h2>

              <div className="mt-4 space-y-3">

                <div className="flex justify-between">
                  <span className="text-slate-500">
                    Difficulty
                  </span>

                  <span className="font-semibold text-slate-700 dark:text-white">
                    {item.difficulty}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-500">
                    Duration
                  </span>

                  <span className="font-semibold text-slate-700 dark:text-white">
                    {item.duration}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-500">
                    Topics
                  </span>

                  <span className="font-semibold text-slate-700 dark:text-white">
                    {item.totalTopics || 0}
                  </span>
                </div>

              </div>

              <div className="flex gap-3 mt-6">

                <button
                  onClick={() =>
                    handleView(item)
                  }
                  className="
                  flex-1
                  py-3
                  rounded-2xl
                  bg-gradient-to-r
                  from-indigo-500
                  to-purple-600
                  text-white
                  font-bold
                  "
                >
                  View
                </button>

                <button
                  onClick={() =>
                    handleDelete(index)
                  }
                  className="
                  px-5
                  rounded-2xl
                  bg-red-500
                  text-white
                  font-bold
                  "
                >
                  Delete
                </button>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}