import { useState } from "react";
import { Link, useNavigate } from "react-router";
import{useAuth} from '../hook/useAuth'
export default function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [submitted, setSubmitted] = useState(null);
  const {handleRegister} = useAuth()
  const navigate = useNavigate()
  // Two-way binding
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Submit
  const handleSubmit = async(e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) return
    await handleRegister(formData)
    navigate('/login')
  };

  return (
    <div className="min-h-screen bg-[#050508] flex items-center justify-center p-4 relative overflow-hidden">

      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(139,92,246,0.12)_0%,_transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(99,102,241,0.08)_0%,_transparent_60%)]" />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />

      {/* Glow orbs */}
      <div className="absolute top-20 left-20 w-64 h-64 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-20 w-48 h-48 bg-indigo-600/8 rounded-full blur-3xl pointer-events-none" />

      {/* Card */}
      <div className="relative z-10 w-full max-w-[400px]">

        {/* Top accent line */}
        <div className="h-px bg-gradient-to-r from-transparent via-violet-500 to-transparent mb-8 opacity-60" />

        <div className="bg-[#0d0d14] border border-white/[0.06] rounded-2xl p-8 shadow-[0_0_60px_rgba(0,0,0,0.8)]">

          {/* Logo / Brand */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white text-xs font-black shadow-lg shadow-violet-500/30">
                P
              </div>
              <span className="text-white/80 text-sm font-semibold tracking-wide">Perplexity</span>
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">
              Create account
            </h1>
            <p className="text-white/30 text-sm mt-1">Join us today, it's free</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Username */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold text-white/40 uppercase tracking-widest">
                Username
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/20 text-sm">
                  @
                </span>
                <input
                  type="text"
                  name="username"
                  placeholder="choose_username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full pl-8 pr-4 py-3 bg-white/[0.04] border border-white/[0.07] rounded-xl text-white text-sm placeholder-white/15 outline-none focus:border-violet-500/60 focus:bg-violet-500/[0.06] focus:ring-1 focus:ring-violet-500/20 transition-all duration-200"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold text-white/40 uppercase tracking-widest">
                Email
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/20 text-sm">
                  ✉
                </span>
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-9 pr-4 py-3 bg-white/[0.04] border border-white/[0.07] rounded-xl text-white text-sm placeholder-white/15 outline-none focus:border-violet-500/60 focus:bg-violet-500/[0.06] focus:ring-1 focus:ring-violet-500/20 transition-all duration-200"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold text-white/40 uppercase tracking-widest">
                Password
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/20 text-sm">
                  🔒
                </span>
                <input
                  type="password"
                  name="password"
                  placeholder="min. 8 characters"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-9 pr-4 py-3 bg-white/[0.04] border border-white/[0.07] rounded-xl text-white text-sm placeholder-white/15 outline-none focus:border-violet-500/60 focus:bg-violet-500/[0.06] focus:ring-1 focus:ring-violet-500/20 transition-all duration-200"
                />
              </div>

              {/* Password strength bar */}
              {formData.password && (
                <div className="flex gap-1 mt-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className={`h-0.5 flex-1 rounded-full transition-all duration-300 ${
                        formData.password.length >= i * 3
                          ? i <= 1
                            ? "bg-red-500"
                            : i <= 2
                            ? "bg-yellow-500"
                            : i <= 3
                            ? "bg-blue-500"
                            : "bg-emerald-500"
                          : "bg-white/10"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Live State Preview */}
            {(formData.username || formData.email || formData.password) && (
              <div className="bg-black/40 border border-white/[0.05] rounded-xl p-3 font-mono">
                <p className="text-[10px] text-white/20 uppercase tracking-widest mb-2">
                  state
                </p>
                <p className="text-xs">
                  <span className="text-violet-400">username</span>
                  <span className="text-white/20">: </span>
                  <span className="text-emerald-400/80">"{formData.username}"</span>
                </p>
                <p className="text-xs mt-0.5">
                  <span className="text-violet-400">email</span>
                  <span className="text-white/20">: </span>
                  <span className="text-emerald-400/80">"{formData.email}"</span>
                </p>
                <p className="text-xs mt-0.5">
                  <span className="text-violet-400">password</span>
                  <span className="text-white/20">: </span>
                  <span className="text-emerald-400/80">"{formData.password.replace(/./g, "•")}"</span>
                </p>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-3 mt-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold text-sm tracking-wide shadow-lg shadow-violet-600/25 hover:shadow-violet-600/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
            >
              Create Account
            </button>

            {/* Success */}
            {submitted && (
              <div className="bg-emerald-950/60 border border-emerald-500/20 rounded-xl p-3 text-emerald-400 text-xs">
                ✅ <strong>Account created!</strong>
                <br />
                User: <span className="text-emerald-300">{submitted.username}</span>
                <br />
                Email: <span className="text-emerald-300">{submitted.email}</span>
              </div>
            )}

          </form>

          {/* Footer */}
          <p className="text-center text-white/20 text-xs mt-6">
            Already have an account?{" "}
            <Link to='/login' className="text-violet-400/80 cursor-pointer hover:text-violet-400 transition-colors font-medium">
              Sign In
            </Link>
          </p>
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-violet-500 to-transparent mt-8 opacity-30" />
      </div>
    </div>
  );
}