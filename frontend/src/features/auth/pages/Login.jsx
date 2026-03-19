import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router";
import { useAuth } from "../hook/useAuth";

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const user = useSelector(state => state.auth.user)
  const loading = useSelector(state => state.auth.loading)

  const { handleLogin } = useAuth()

  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()

    const payload = {
      email,
      password,
    }

    await handleLogin(payload)
    navigate("/")
  }

  if (!loading && user) {
    return <Navigate to="/" replace />
  }

  return (
    <div className="min-h-screen bg-[#050508] flex items-center justify-center p-4 relative overflow-hidden">

      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(99,102,241,0.12)_0%,_transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(139,92,246,0.08)_0%,_transparent_60%)]" />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />

      {/* Glow orbs */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-20 w-48 h-48 bg-violet-600/8 rounded-full blur-3xl pointer-events-none" />

      {/* Card */}
      <div className="relative z-10 w-full max-w-[400px]">

        {/* Top accent line */}
        <div className="h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent mb-8 opacity-60" />

        <div className="bg-[#0d0d14] border border-white/[0.06] rounded-2xl p-8 shadow-[0_0_60px_rgba(0,0,0,0.8)]">

          {/* Logo / Brand */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white text-xs font-black shadow-lg shadow-indigo-500/30">
                P
              </div>
              <span className="text-white/80 text-sm font-semibold tracking-wide">Perplexity</span>
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">
              Welcome back
            </h1>
            <p className="text-white/30 text-sm mt-1">Sign in to your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold text-white/40 uppercase tracking-widest">
                Email
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/20 text-sm">
                  @
                </span>
                <input
                  type="text"
                  name="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="w-full pl-8 pr-4 py-3 bg-white/[0.04] border border-white/[0.07] rounded-xl text-white text-sm placeholder-white/15 outline-none focus:border-indigo-500/60 focus:bg-indigo-500/[0.06] focus:ring-1 focus:ring-indigo-500/20 transition-all duration-200"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-semibold text-white/40 uppercase tracking-widest">
                  Password
                </label>
              </div>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/20 text-sm">
                  🔒
                </span>
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••••"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="w-full pl-9 pr-4 py-3 bg-white/[0.04] border border-white/[0.07] rounded-xl text-white text-sm placeholder-white/15 outline-none focus:border-indigo-500/60 focus:bg-indigo-500/[0.06] focus:ring-1 focus:ring-indigo-500/20 transition-all duration-200"
                />
              </div>
            </div>

            {/* Live State Preview */}
            {(email || password) && (
              <div className="bg-black/40 border border-white/[0.05] rounded-xl p-3 font-mono">
                <p className="text-[10px] text-white/20 uppercase tracking-widest mb-2">
                  state
                </p>
                <p className="text-xs">
                  <span className="text-indigo-400">email</span>
                  <span className="text-white/20">: </span>
                  <span className="text-emerald-400/80">"{email}"</span>
                </p>
                <p className="text-xs mt-0.5">
                  <span className="text-indigo-400">password</span>
                  <span className="text-white/20">: </span>
                  <span className="text-emerald-400/80">"{password.replace(/./g, "•")}"</span>
                </p>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-3 mt-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold text-sm tracking-wide shadow-lg shadow-indigo-600/25 hover:shadow-indigo-600/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
            >
              Sign In
            </button>

          </form>

          {/* Footer */}
          <p className="text-center text-white/20 text-xs mt-6">
            Don't have an account?{" "}
            <Link to="/register" className="text-indigo-400/80 cursor-pointer hover:text-indigo-400 transition-colors font-medium">
              Register
            </Link>
          </p>
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent mt-8 opacity-30" />
      </div>
    </div>
  );
}