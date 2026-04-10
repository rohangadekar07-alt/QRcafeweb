"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  BarChart3, 
  Coffee, 
  LayoutDashboard, 
  LogOut, 
  Grid, 
  Sparkles,
  Bell,
  User
} from "lucide-react";
import { motion } from "framer-motion";

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    router.push("/login");
  };

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: BarChart3, href: "/admin/dashboard" },
    { id: "menu", label: "Menu", icon: Coffee, href: "/admin/menu" },
    { id: "tables", label: "Tables", icon: Grid, href: "/admin/tables" },
  ];

  return (
    <aside className="w-72 bg-[#1A0F0A] text-[#FDF8F5] flex flex-col sticky top-0 h-screen shadow-2xl z-50">
      <div className="p-8 pb-12">
        <Link href="/" className="flex items-center gap-3 group">
          <Sparkles className="text-[#D4A373] w-5 h-5 group-hover:rotate-180 transition-transform duration-700" />
          <div className="text-xl font-playfair font-black tracking-tighter text-white uppercase">
            BREWED<span className="text-[#D4A373]">CRAFT</span>
          </div>
        </Link>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        <p className="text-[10px] uppercase tracking-[0.3em] text-[#FDF8F5]/30 font-bold px-4 mb-4">Management</p>
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.id} 
              href={item.href}
              className={`flex items-center gap-4 px-4 py-4 rounded-2xl transition-all duration-300 group ${
                isActive ? "bg-[#D4A373] text-[#1A0F0A] shadow-lg shadow-[#D4A373]/10" : "text-[#FDF8F5]/40 hover:bg-white/5 hover:text-white"
              }`}
            >
              <item.icon className={`w-5 h-5 ${isActive ? "text-[#1A0F0A]" : "group-hover:text-[#D4A373]"}`} />
              <span className="text-[11px] uppercase tracking-[0.2em] font-black">{item.label}</span>
              {isActive && (
                <motion.div layoutId="activeDot" className="ml-auto w-1 h-1 bg-[#1A0F0A] rounded-full" />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/5 space-y-4">
        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-4 px-4 py-4 rounded-2xl text-[#FDF8F5]/40 hover:bg-red-500/10 hover:text-red-500 transition-all duration-300 group"
        >
          <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="text-[11px] uppercase tracking-[0.2em] font-black">Sojourn End</span>
        </button>
        
        <div className="flex items-center gap-4 p-4 bg-white/5 rounded-3xl">
          <div className="w-10 h-10 rounded-full bg-[#D4A373]/20 flex items-center justify-center text-[#D4A373] font-black text-sm border border-[#D4A373]/20">A</div>
          <div className="overflow-hidden">
            <p className="text-[10px] font-black text-white uppercase tracking-widest leading-none truncate">Admin Curator</p>
            <p className="text-[8px] text-[#FDF8F5]/30 uppercase tracking-widest mt-1">Founder</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
