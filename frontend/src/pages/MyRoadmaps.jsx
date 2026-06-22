import API from "../services/api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function MyRoadmaps() {
  const navigate = useNavigate();
  const [roadmaps, setRoadmaps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRoadmaps();
  }, []);

  const fetchRoadmaps = async () => {
    try {
      const { data } = await API.get("/roadmap/my-roadmaps");

      if (data.success) {
        setRoadmaps(data.roadmaps);
      }
    } catch (error) {
      console.error("Roadmap Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <h2 className="text-xl font-bold text-slate-700 dark:text-white">
          Loading Roadmaps...
        </h2>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-white dark:bg-[#111827] rounded-[32px] p-4 sm:p-6 lg:p-8 overflow-y-auto">

      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-800 dark:text-white">
          🗺️ My Roadmaps
        </h1>

        <p className="text-slate-500 dark:text-slate-400 mt-2">
          View all your generated roadmaps
        </p>
      </div>

      {roadmaps.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20">

          <div className="text-6xl mb-4">
            🚀
          </div>

          <h2 className="text-xl font-bold text-slate-700 dark:text-white">
            No Roadmaps Found
          </h2>

          <p className="text-slate-500 mt-2 text-center">
            Generate your first roadmap and it will appear here.
          </p>

        </div>
      ) : (
        <div
          className="
          grid
          grid-cols-1
          sm:grid-cols-2
          xl:grid-cols-3
          gap-5
          "
        >
          {roadmaps.map((item) => (
            <div
              key={item._id}
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
              <div className="flex justify-between items-start">
                <h2 className="text-lg sm:text-xl font-bold text-slate-800 dark:text-white">
                  {item.goal}
                </h2>

                <span
                  className="
                  text-xs
                  bg-indigo-100
                  dark:bg-indigo-900/30
                  text-indigo-600
                  dark:text-indigo-400
                  px-3
                  py-1
                  rounded-full
                  font-semibold
                  "
                >
                  {item.level}
                </span>
              </div>

              <div className="mt-5 space-y-3">

                <div className="flex justify-between">
                  <span className="text-slate-500 text-sm">
                    Duration
                  </span>

                  <span className="font-semibold text-slate-700 dark:text-slate-200">
                    {item.duration}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-500 text-sm">
                    Created
                  </span>

                  <span className="font-semibold text-slate-700 dark:text-slate-200">
                    {new Date(
                      item.createdAt
                    ).toLocaleDateString()}
                  </span>
                </div>

              </div>
<button
  onClick={() => {
    console.log(item);

    localStorage.setItem(
      "selectedRoadmap",
      item.roadmapText
    );

    window.location.reload();
  }}
  className="
  mt-6
  w-full
  py-3
  rounded-2xl
  bg-gradient-to-r
  from-indigo-500
  to-purple-600
  text-white
  font-bold
  hover:scale-[1.02]
  transition-all
  "
>
  View Roadmap
</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}