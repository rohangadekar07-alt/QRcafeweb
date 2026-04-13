"use client";
import { AnimatePresence, motion } from "framer-motion";
import { ChefHat, LayoutDashboard, Eye, EyeOff, ArrowRight, Sparkles, AlertCircle } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "@/utils/api";
import Image from "next/image";

export default function LoginPage() {
  const [role, setRole] = useState("admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const data = await loginUser(email, password);

      // ── Strict Role Validation ──
      if (data.role !== role) {
        throw new Error(`Access Denied: Your account is not authorized as ${role === 'admin' ? 'an Admin' : 'Kitchen Staff'}.`);
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("userRole", data.role);

      if (data.role === "admin") {
        router.push("/admin/dashboard");
      } else if (data.role === "chef") {
        router.push("/chef/dashboard");
      } else {
        router.push("/");
      }
    } catch (error) {
      setErrorMsg(error.message);
      setTimeout(() => setErrorMsg(""), 5000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#1A0F0A]">
      
      {/* ── Left Section: Branding ── */}
      <div className="lg:w-[40%] flex flex-col justify-between p-8 md:p-14 relative overflow-hidden bg-[#1A0F0A]">
        {/* Decorative subtle texture */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 100 100" fill="currentColor">
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5"/>
            </pattern>
            <rect width="100" height="100" fill="url(#grid)" />
          </svg>
        </div>

        <Link href="/" className="flex items-center gap-3 group relative z-10 w-fit">
          <Sparkles className="w-6 h-6 text-[#D4A373] group-hover:rotate-180 transition-transform duration-700" />
          <span className="text-white font-playfair font-black text-2xl tracking-tighter">
            BREWED<span className="text-[#D4A373]">CRAFT</span>
          </span>
        </Link>

        <div className="space-y-6 relative z-10">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: 40 }}
            className="h-[2px] bg-[#D4A373]" 
          />
          <h2 className="text-white font-playfair text-4xl md:text-5xl font-bold leading-[1.1]">
            Precision In <br />
            <span className="text-[#D4A373] italic font-playfair-italic font-light">Every Grain.</span>
          </h2>
          <p className="text-white/40 text-sm md:text-base leading-relaxed max-w-xs font-inter uppercase tracking-widest text-[10px]">
            The unified staff portal for Brewed Craft's 5-star culinary and roasting operations.
          </p>
        </div>

        <p className="text-white/20 text-[10px] tracking-[0.3em] uppercase relative z-10">
          © 2026 Crafted Excellence
        </p>
      </div>

      {/* ── Right Section: Login ── */}
      <div className="flex-1 relative flex items-center justify-center p-6 md:p-12">
        {/* Cinematic Background Image */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="/login-bg.png" 
            alt="Cinematic textures" 
            fill 
            className="object-cover brightness-[0.3] contrast-[1.1]"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-[#1A0F0A] via-transparent to-transparent opacity-80" />
        </div>

        <motion.div
          initial={{ opacity: 1, scale: 1 }}
          className="w-full max-w-[380px] relative z-10 glassmorphism p-6 md:p-10 rounded-[2rem] border border-white/10 shadow-2xl"
          style={{
             background: 'rgba(26, 15, 10, 0.82)',
             backdropFilter: 'blur(24px)'
          }}
        >
          {/* Subtle Accent Glow */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#D4A373] rounded-full blur-[100px] opacity-10 pointer-events-none" />

          <div className="relative z-10 text-center mb-6">
            <h1 className="text-2xl font-playfair font-bold text-white mb-1">Staff Portal</h1>
            <p className="text-[9px] text-white/40 uppercase tracking-[0.2em]">Authentication Required</p>
          </div>

          <AnimatePresence>
            {errorMsg && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-start gap-3"
              >
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <p className="text-[10px] font-bold text-red-400 uppercase tracking-widest leading-relaxed">
                  {errorMsg}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Role Tabs */}
          <div className="flex p-1 bg-white/5 rounded-xl mb-6 border border-white/5">
            <button
              onClick={() => setRole("admin")}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all duration-500 ${
                role === "admin"
                  ? "bg-[#D4A373] text-[#1A0F0A] shadow-lg"
                  : "text-white/40 hover:text-white"
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              Admin
            </button>
            <button
              onClick={() => setRole("chef")}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all duration-500 ${
                role === "chef"
                  ? "bg-[#3D4A3A] text-white shadow-lg"
                  : "text-white/40 hover:text-white"
              }`}
            >
              <ChefHat className="w-3.5 h-3.5" />
              Kitchen
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5 relative z-30">
            <div className="space-y-1.5">
              <label className="text-[9px] font-black text-white/40 uppercase tracking-[0.15em]">Email</label>
              <input
                required
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                placeholder="admin@brewedcraft.com"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-sm text-white outline-none focus:border-[#D4A373] transition-all duration-500 placeholder:text-white/20 cursor-text"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[9px] font-black text-white/40 uppercase tracking-[0.15em]">Security Key</label>
              <div className="relative">
                <input
                  required
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 pr-14 text-sm text-white outline-none focus:border-[#D4A373] transition-all duration-500 placeholder:text-white/20 cursor-text"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 hover:text-[#D4A373] transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              disabled={isLoading}
              className={`group w-full relative h-12 rounded-xl overflow-hidden transition-all duration-700 mt-2 bg-white text-[#1A0F0A]`}
            >
              <div className="absolute inset-0 bg-[#D4A373] translate-y-full group-hover:translate-y-0 transition-transform duration-700" />
              <div className="relative z-10 flex items-center justify-center gap-3 text-[11px] font-black uppercase tracking-[0.2em] group-hover:text-[#1A0F0A]">
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-[#1A0F0A] border-t-transparent rounded-full animate-spin" />
                    Verifying...
                  </div>
                ) : (
                  <>
                    Access Dashboard
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </div>
            </button>
          </form>

          <p className="mt-10 text-center">
            <Link href="/" className="text-[10px] font-black uppercase tracking-widest text-white/30 hover:text-[#D4A373] transition-all duration-700">
               Back to sanctuary
            </Link>
          </p>
        </motion.div>
      </div>

      <style jsx>{`
        .glassmorphism {
          box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.8);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
      `}</style>
    </div>
  );
}
