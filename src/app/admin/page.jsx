"use client";
import { Section } from "@/components/Section";
import { motion } from "framer-motion";
import { 
  Sparkles, 
  LayoutDashboard, 
  Users, 
  ChefHat, 
  Coffee, 
  Settings, 
  Bell, 
  LogOut, 
  BarChart3, 
  Plus,
  ArrowUpRight,
  TrendingUp,
  CreditCard,
  History
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  const sidebarItems = [
    { id: "overview", label: "Overview", icon: BarChart3 },
    { id: "tables", label: "Tables & QR", icon: LayoutDashboard },
    { id: "staff", label: "The Collective", icon: Users },
    { id: "menu", label: "The Library", icon: Coffee },
    { id: "kitchen", label: "Atelier Status", icon: ChefHat },
    { id: "history", label: "Memory Lane", icon: History },
  ];

  const stats = [
    { label: "Daily Essence", value: "$4,280", trend: "+12.5%", icon: TrendingUp },
    { label: "Active Rituals", value: "18", trend: "Normal", icon: Coffee },
    { label: "Guest Satisfaction", value: "98.4%", trend: "+2.1%", icon: Sparkles },
    { label: "Kitchen Pacing", value: "12m", trend: "-4m", icon: ChefHat },
  ];

  return (
    <main className="min-h-screen bg-[#FDF8F5] text-[#2C1810] flex">
      {/* Sidebar */}
      <aside className="w-80 bg-[#1A0F0A] text-[#FDF8F5] p-10 flex flex-col justify-between sticky top-0 h-screen hidden lg:flex">
        <div className="space-y-12">
            <Link href="/" className="flex items-center gap-3 cursor-pointer group">
                <Sparkles className="text-[#D4A373] w-5 h-5 group-hover:rotate-180 transition-transform duration-1000" />
                <div className="text-xl font-playfair font-black tracking-tighter text-white">
                    BREWED<span className="text-[#3D4A3A]">CRAFT</span>
                </div>
            </Link>

            <nav className="space-y-6">
                <p className="text-[9px] uppercase tracking-[0.4em] text-[#FDF8F5]/30 font-black mb-10">Directorate</p>
                {sidebarItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={`w-full flex items-center gap-4 transition-all duration-500 group ${activeTab === item.id ? "text-[#D4A373]" : "text-[#FDF8F5]/40 hover:text-white"}`}
                    >
                        <item.icon className={`w-5 h-5 transition-all ${activeTab === item.id ? "scale-110" : "group-hover:scale-110"}`} />
                        <span className="text-[10px] uppercase tracking-[0.3em] font-bold">{item.label}</span>
                        {activeTab === item.id && (
                            <motion.div layoutId="activeTab" className="ml-auto w-1 h-1 bg-[#D4A373] rounded-full shadow-[0_0_8px_#D4A373]" />
                        )}
                    </button>
                ))}
            </nav>
        </div>

        <div className="space-y-8 pt-12 border-t border-white/5">
            <button className="flex items-center gap-4 text-[#FDF8F5]/40 hover:text-white transition-all text-[10px] uppercase tracking-[0.3em] font-bold group">
                <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                Sojourn End
            </button>
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#D4A373] flex items-center justify-center text-[#1A0F0A] font-black text-sm">A</div>
                <div>
                   <p className="text-[10px] font-black text-white uppercase tracking-widest leading-none">Admin Curator</p>
                   <p className="text-[8px] text-[#FDF8F5]/30 uppercase tracking-widest mt-1">Founding Member</p>
                </div>
            </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto px-10 py-12 lg:px-20 lg:py-16">
        {/* Header */}
        <header className="flex justify-between items-end mb-20">
            <div className="space-y-4">
                <span className="text-[#3D4A3A] uppercase tracking-[0.4em] text-[10px] font-black">Management Overview</span>
                <h1 className="text-5xl md:text-6xl font-playfair font-black text-[#1A0F0A]">Sanctuary <br/> <span className="italic font-light text-[#D4A373]">Control Panel.</span></h1>
            </div>
            <div className="flex gap-4">
                <button className="p-4 bg-white rounded-2xl shadow-sm border border-[#2C1810]/5 hover:bg-[#1A0F0A] hover:text-white transition-all">
                    <Bell className="w-5 h-5" />
                </button>
                <button className="bg-[#2C1810] text-[#FDF8F5] px-8 py-4 rounded-full text-[10px] uppercase tracking-[0.2em] font-black hover:bg-[#3D4A3A] transition-all flex items-center gap-3">
                    <Plus className="w-4 h-4" /> New Table QR
                </button>
            </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {stats.map((stat, i) => (
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    key={stat.label}
                    className="bg-white p-8 rounded-[40px] shadow-[0_20px_50px_rgba(44,24,16,0.03)] border border-[#2C1810]/5 group hover:border-[#D4A373]/30 transition-all hover:-translate-y-2"
                >
                    <div className="flex justify-between items-start mb-6">
                        <div className="p-4 bg-[#1A0F0A]/5 rounded-2xl group-hover:bg-[#D4A373]/10 transition-all">
                            <stat.icon className="w-5 h-5 text-[#2C1810]" />
                        </div>
                        <span className="text-[10px] font-bold text-[#3D4A3A] bg-[#3D4A3A]/10 px-3 py-1 rounded-full">{stat.trend}</span>
                    </div>
                    <p className="text-[10px] uppercase tracking-[0.2em] opacity-40 font-black mb-2">{stat.label}</p>
                    <h3 className="text-3xl font-playfair font-black text-[#1A0F0A]">{stat.value}</h3>
                </motion.div>
            ))}
        </div>

        {/* Placeholder Content Area */}
        <div className="grid lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 bg-[#1A0F0A] rounded-[50px] p-12 text-[#FDF8F5] relative overflow-hidden group">
                <div className="relative z-10 space-y-12 h-full flex flex-col justify-between">
                    <div className="space-y-4">
                        <h2 className="text-4xl font-playfair font-bold">Real-time Echoes</h2>
                        <p className="text-sm opacity-50 font-playfair italic">Monitoring every sensory interaction in the atelier.</p>
                    </div>
                    
                    <div className="space-y-6">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-center gap-6 p-6 bg-white/5 rounded-3xl border border-white/5 hover:bg-white/10 transition-all">
                                <div className="w-12 h-12 bg-[#D4A373] rounded-full flex items-center justify-center text-[#1A0F0A] font-black shadow-xl">T{i}</div>
                                <div className="flex-1">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-[#D4A373]">Table 0{i} Ordered</p>
                                    <p className="text-sm font-playfair italic opacity-40">2x Bourbon Latte, 1x Wagyu Heritage</p>
                                </div>
                                <span className="text-[9px] opacity-20 uppercase font-black tracking-widest">{i*4}m ago</span>
                            </div>
                        ))}
                    </div>

                    <button className="text-[10px] uppercase tracking-[0.4em] text-[#D4A373] font-black flex items-center gap-3 group/btn">
                        View Detailed Audit <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                    </button>
                </div>
                <Sparkles className="absolute -bottom-20 -right-20 w-80 h-80 opacity-[0.03] text-[#D4A373] group-hover:rotate-45 transition-transform duration-1000" />
            </div>

            <div className="bg-white rounded-[50px] p-12 border border-[#2C1810]/5 flex flex-col justify-between group">
                <div className="space-y-8">
                    <div className="w-12 h-12 bg-[#3D4A3A] rounded-2xl flex items-center justify-center text-white shadow-xl group-hover:rotate-12 transition-transform">
                        <Coffee className="w-6 h-6" />
                    </div>
                    <div className="space-y-4">
                        <h2 className="text-3xl font-playfair font-bold text-[#1A0F0A]">Stock Rituals</h2>
                        <p className="text-xs opacity-50 font-medium leading-relaxed">Inventory management for our artisanal beans and ingredients.</p>
                    </div>
                    
                    <div className="space-y-4">
                        {[
                            { name: "Ethiopian Roast", level: "85%" },
                            { name: "Truffle Oil", level: "12%" },
                            { name: "Aged Cheddar", level: "42%" }
                        ].map((item) => (
                            <div key={item.name} className="space-y-2">
                                <div className="flex justify-between text-[9px] font-black uppercase tracking-widest">
                                    <span>{item.name}</span>
                                    <span className={parseInt(item.level) < 20 ? "text-red-500" : ""}>{item.level}</span>
                                </div>
                                <div className="h-1 bg-[#1A0F0A]/5 rounded-full overflow-hidden">
                                    <motion.div 
                                        initial={{ width: 0 }}
                                        animate={{ width: item.level }}
                                        transition={{ duration: 1, delay: 0.5 }}
                                        className={`h-full ${parseInt(item.level) < 20 ? "bg-red-500" : "bg-[#3D4A3A]"}`} 
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                
                <button className="w-full py-5 border border-[#2C1810]/10 rounded-full text-[10px] uppercase tracking-[0.2em] font-black hover:bg-[#1A0F0A] hover:text-[#FDF8F5] transition-all duration-500 mt-10">
                    Restoration Order
                </button>
            </div>
        </div>
      </div>
    </main>
  );
}
