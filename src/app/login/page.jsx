"use client";
import { AnimatePresence, motion } from "framer-motion";
import { ChefHat, LayoutDashboard, Eye, EyeOff, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [role, setRole] = useState("admin");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      router.push(role === "admin" ? "/admin" : "/kitchen");
    }, 1200);
  };

  return (
    <div className="min-h-screen flex font-inter">

      {/* ── Left Panel ── */}
      <div className="hidden lg:flex lg:w-[42%] bg-[#1A0F0A] flex-col justify-between p-14">
        <Link href="/" className="flex items-center gap-3 group w-fit">
          <Sparkles className="w-5 h-5 text-[#D4A373] group-hover:rotate-180 transition-transform duration-700" />
          <span className="text-white font-playfair font-black text-xl tracking-tight">
            BREWED<span className="text-[#D4A373]">CRAFT</span>
          </span>
        </Link>

        <div className="space-y-6">
          <div className="w-10 h-[2px] bg-[#D4A373]" />
          <h2 className="text-white font-playfair text-4xl font-bold leading-snug">
            The café that runs <br />
            <span className="text-[#D4A373] italic font-light">on precision.</span>
          </h2>
          <p className="text-white/40 text-sm leading-relaxed max-w-xs">
            Staff portal for managing tables, orders, and kitchen operations — all in one place.
          </p>
        </div>

        <p className="text-white/20 text-xs tracking-widest uppercase">
          © 2026 Brewed Craft
        </p>
      </div>

      {/* ── Right Panel ── */}
      <div className="flex-1 bg-[#FDF8F5] flex items-center justify-center px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-sm"
        >
          {/* Mobile logo */}
          <Link href="/" className="flex items-center gap-2 mb-10 lg:hidden">
            <Sparkles className="w-4 h-4 text-[#D4A373]" />
            <span className="font-playfair font-black text-lg text-[#1A0F0A] tracking-tight">
              BREWED<span className="text-[#D4A373]">CRAFT</span>
            </span>
          </Link>

          <h1 className="text-2xl font-bold text-[#1A0F0A] mb-1">Sign in</h1>
          <p className="text-sm text-[#1A0F0A]/40 mb-8">Choose your role and enter your credentials.</p>

          {/* Role Tabs */}
          <div className="flex gap-2 mb-8">
            <button
              onClick={() => setRole("admin")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold transition-all border ${
                role === "admin"
                  ? "bg-[#1A0F0A] text-white border-[#1A0F0A]"
                  : "bg-white text-[#1A0F0A]/50 border-[#1A0F0A]/10 hover:border-[#1A0F0A]/30"
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              Admin
            </button>
            <button
              onClick={() => setRole("chef")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold transition-all border ${
                role === "chef"
                  ? "bg-[#3D4A3A] text-white border-[#3D4A3A]"
                  : "bg-white text-[#1A0F0A]/50 border-[#1A0F0A]/10 hover:border-[#1A0F0A]/30"
              }`}
            >
              <ChefHat className="w-3.5 h-3.5" />
              Kitchen
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#1A0F0A]/60 uppercase tracking-wider">Email</label>
              <input
                required
                type="email"
                placeholder="admin@brewedcraft.com"
                className="w-full bg-white border border-[#1A0F0A]/10 rounded-xl px-4 py-3.5 text-sm text-[#1A0F0A] outline-none focus:border-[#D4A373] transition-colors placeholder:text-[#1A0F0A]/25"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#1A0F0A]/60 uppercase tracking-wider">Password</label>
              <div className="relative">
                <input
                  required
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full bg-white border border-[#1A0F0A]/10 rounded-xl px-4 py-3.5 pr-12 text-sm text-[#1A0F0A] outline-none focus:border-[#D4A373] transition-colors placeholder:text-[#1A0F0A]/25"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#1A0F0A]/30 hover:text-[#1A0F0A] transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex justify-end">
              <button type="button" className="text-xs text-[#D4A373] hover:underline font-medium">
                Forgot password?
              </button>
            </div>

            <button
              disabled={isLoading}
              className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-bold transition-all ${
                role === "admin"
                  ? "bg-[#1A0F0A] text-white hover:bg-[#2C1810]"
                  : "bg-[#3D4A3A] text-white hover:bg-[#4e5e4b]"
              }`}
            >
              <AnimatePresence mode="wait">
                {isLoading ? (
                  <motion.div key="spin" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Signing in...
                  </motion.div>
                ) : (
                  <motion.div key="text" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                    Sign In
                    <ArrowRight className="w-4 h-4" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </form>

          <p className="mt-10 text-center text-xs text-[#1A0F0A]/30">
            <Link href="/" className="hover:text-[#D4A373] transition-colors">
              ← Back to main site
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
