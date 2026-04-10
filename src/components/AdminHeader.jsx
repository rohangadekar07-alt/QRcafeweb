"use client";
import { Bell, Search, User } from "lucide-react";
import { usePathname } from "next/navigation";

export default function AdminHeader() {
  const pathname = usePathname();
  
  const getPageTitle = () => {
    if (pathname.includes("dashboard")) return "Dashboard";
    if (pathname.includes("menu")) return "Menu Library";
    if (pathname.includes("tables")) return "Tables & QR";
    return "Management";
  };

  return (
    <header className="h-20 bg-[#FDF8F5] border-b border-[#2C1810]/5 px-10 flex items-center justify-between sticky top-0 z-40">
      <div className="flex flex-col">
        <span className="text-[10px] uppercase tracking-[0.4em] text-[#3D4A3A] font-black">{getPageTitle()}</span>
        <h1 className="text-xl font-playfair font-black text-[#1A0F0A]">Sanctuary Overview</h1>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative hidden md:block">
           <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1A0F0A]/20" />
           <input 
             type="text" 
             placeholder="Search ritual..." 
             className="bg-[#1A0F0A]/5 border border-transparent focus:border-[#D4A373]/30 rounded-full pl-12 pr-6 py-2.5 text-xs outline-none transition-all w-64 placeholder:text-[#1A0F0A]/20"
           />
        </div>

        <button className="p-3 bg-white rounded-2xl shadow-sm border border-[#2C1810]/5 hover:bg-[#1A0F0A] hover:text-white transition-all group relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-[#D4A373] rounded-full border-2 border-[#FDF8F5]" />
        </button>

        <div className="h-10 w-[1px] bg-[#1A0F0A]/10" />

        <div className="flex items-center gap-3 pl-2">
           <div className="text-right hidden sm:block">
              <p className="text-[10px] font-black text-[#1A0F0A] uppercase tracking-widest">Admin</p>
              <p className="text-[8px] text-[#3D4A3A] font-bold uppercase tracking-widest">Available</p>
           </div>
           <div className="w-10 h-10 rounded-2xl bg-[#3D4A3A] flex items-center justify-center text-white shadow-xl rotate-3">
              <User className="w-5 h-5" />
           </div>
        </div>
      </div>
    </header>
  );
}
