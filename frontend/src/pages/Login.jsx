import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import authBg from "../assets/auth-bg.jpg";

function Login() {
const navigate = useNavigate();

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

const handleLogin = async (e) => {
e.preventDefault();


try {
  const { data } = await API.post("/auth/login", {
    email,
    password,
  });

  localStorage.setItem("token", data.token);

  alert("Login Successful 🚀");
  navigate("/dashboard");
} catch (error) {
  alert(
    error?.response?.data?.message ||
      "Login Failed"
  );
}


};

return (
<div
className="min-h-screen bg-cover bg-center bg-no-repeat relative"
style={{
backgroundImage: `url(${authBg})`,
}}
> <div className="absolute inset-0 bg-black/75"></div>


  <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-10">
    <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

      {/* Left Side */}
      <div className="text-white text-center lg:text-left">

        <div className="inline-block px-4 py-2 rounded-full bg-cyan-500/20 border border-cyan-400/30 text-cyan-300 mb-6">
          🚀 AI Powered Learning Platform
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight">
          Welcome
          <span className="text-cyan-400"> Back</span>
        </h1>

        <p className="text-slate-300 mt-6 text-base sm:text-lg lg:text-xl max-w-xl mx-auto lg:mx-0">
          Continue your learning journey,
          generate professional roadmaps,
          build projects and become job ready.
        </p>

        <div className="grid grid-cols-3 gap-3 sm:gap-4 mt-8">

          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-cyan-500/20">
            <h2 className="text-cyan-400 text-lg sm:text-2xl lg:text-3xl font-bold">
              10K+
            </h2>
            <p className="text-slate-300 text-sm">
              Roadmaps
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-cyan-500/20">
            <h2 className="text-cyan-400 text-lg sm:text-2xl lg:text-3xl font-bold">
              5K+
            </h2>
            <p className="text-slate-300 text-sm">
              Students
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-cyan-500/20">
            <h2 className="text-cyan-400 text-lg sm:text-2xl lg:text-3xl font-bold">
              50+
            </h2>
            <p className="text-slate-300 text-sm">
              Career Paths
            </p>
          </div>

        </div>

      </div>

      {/* Login Form */}
      <div className="flex items-center justify-center">

        <form
          onSubmit={handleLogin}
          className="
          w-full
          max-w-lg
          bg-[#07111f]/90
          backdrop-blur-2xl
          border
          border-cyan-400/20
          rounded-[32px]
          px-6
          sm:px-8
          py-8
          sm:py-10
          shadow-[0_0_100px_rgba(34,211,238,0.20)]
          "
        >

          <div className="text-center mb-10">

            <div className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center bg-cyan-500/10 border border-cyan-400/20 text-2xl mb-4">
              🔐
            </div>

            <h2 className="text-white text-3xl sm:text-4xl font-black">
              Sign In
            </h2>

            <p className="text-slate-400 mt-3">
              Continue your roadmap journey
            </p>

          </div>

          <div className="space-y-5">

            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="
              w-full
              h-14
              px-5
              rounded-2xl
              bg-[#0f172a]
              border
              border-slate-700
              text-white
              placeholder:text-slate-500
              focus:border-cyan-400
              focus:ring-2
              focus:ring-cyan-400/20
              outline-none
              "
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="
              w-full
              h-14
              px-5
              rounded-2xl
              bg-[#0f172a]
              border
              border-slate-700
              text-white
              placeholder:text-slate-500
              focus:border-cyan-400
              focus:ring-2
              focus:ring-cyan-400/20
              outline-none
              "
            />

          </div>

          <button
            type="submit"
            className="
            w-full
            h-14
            mt-7
            rounded-2xl
            bg-gradient-to-r
            from-cyan-400
            via-cyan-500
            to-blue-500
            text-black
            font-bold
            text-lg
            hover:scale-[1.02]
            transition-all
            duration-300
            "
          >
            Sign In
          </button>

          <div className="my-6 flex items-center">
            <div className="flex-1 h-px bg-slate-700"></div>
            <span className="px-4 text-slate-500 text-sm">
              RoadmapAI
            </span>
            <div className="flex-1 h-px bg-slate-700"></div>
          </div>

          <p className="text-center text-slate-400">
            Don't have an account?

            <Link
              to="/register"
              className="text-cyan-400 ml-2 font-semibold hover:text-cyan-300"
            >
              Create Account
            </Link>
          </p>

        </form>

      </div>

    </div>
  </div>
</div>

);
}

export default Login;
