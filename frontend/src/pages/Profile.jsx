import { useEffect, useState } from "react";
import { User, Mail, Calendar, Heart } from "lucide-react";
import API from "../services/api";

export default function Profile() {
  const [user, setUser] = useState(null);

  const savedRoadmaps =
    JSON.parse(localStorage.getItem("savedRoadmaps")) || [];

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const { data } = await API.get("/auth/profile");

      if (data.success) {
        setUser(data.user);
      }
    } catch (error) {
      console.error("Profile Error:", error);
    }
  };

  if (!user) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <h2 className="text-xl font-bold text-slate-700 dark:text-white">
          Loading Profile...
        </h2>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-white dark:bg-[#111827] rounded-[32px] p-4 sm:p-6 lg:p-8 overflow-y-auto">

      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-800 dark:text-white">
          👤 My Profile
        </h1>

        <p className="text-slate-500 dark:text-slate-400 mt-2">
          Manage your account details
        </p>
      </div>

      <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6">

        <div className="flex flex-col md:flex-row items-center gap-6">

          <div className="w-28 h-28 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-white text-4xl font-black">
            {user?.name?.charAt(0)}
          </div>

          <div className="flex-1">

            <div className="space-y-4">

              <div className="flex items-center gap-3">
                <User className="w-5 h-5 text-indigo-500" />
                <span className="text-slate-700 dark:text-white font-semibold">
                  {user.name}
                </span>
              </div>

          <div className="flex items-center gap-3 break-all">
  <Mail className="w-5 h-5 text-indigo-500" />
  <span className="text-slate-700 dark:text-white break-all">
    {user.email}
  </span>
</div>

              <div className="flex items-center gap-3">
                <Heart className="w-5 h-5 text-pink-500" />
                <span className="text-slate-700 dark:text-white">
                  Saved Roadmaps: {savedRoadmaps.length}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-green-500" />
                <span className="text-slate-700 dark:text-white">
                  Learning Journey Active 🚀
                </span>
              </div>

            </div>

            <button
              onClick={() => {
                localStorage.removeItem("token");
                window.location.href = "/";
              }}
              className="mt-6 w-full sm:w-auto px-6 py-3 rounded-2xl bg-red-500 hover:bg-red-600 text-white font-bold"
            >
              Logout
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}