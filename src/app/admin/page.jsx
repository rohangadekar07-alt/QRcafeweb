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
  History,
  Calendar,
  Filter
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { getOrders, getTables, generateTables, addMenuItem, deleteMenuItem, fetchMenu, getAllReservations, cancelReservation } from "@/utils/api";
import { io } from "socket.io-client";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  
  const [orders, setOrders] = useState([]);
  const [tables, setTables] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [resFilter, setResFilter] = useState("all");
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [filterStatus, setFilterStatus] = useState("all");
  
  useEffect(() => {
     const loadData = async () => {
         try {
            setOrders(await getOrders());
            setTables(await getTables());
            const m = await fetchMenu();
            setMenuItems(m);
            setReservations(await getAllReservations());
         } catch(e) { console.error(e); }
     };
     loadData();
     
     const socket = io("http://localhost:5000");
     socket.on("new_order", (o) => setOrders(prev => [o, ...prev]));
     socket.on("order_updated", (o) => setOrders(prev => prev.map(p => p._id === o._id ? o : p)));
     socket.on("order_completed", (o) => setOrders(prev => prev.map(p => p._id === o._id ? o : p)));
     
     return () => socket.disconnect();
  }, []);

  const sidebarItems = [
    { id: "overview", label: "Overview", icon: BarChart3 },
    { id: "tables", label: "Tables & QR", icon: LayoutDashboard },
    { id: "reservations", label: "Reservations", icon: Calendar },
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
                <button onClick={async () => { await generateTables(); setTables(await getTables()); alert("Tables generated!"); }} className="bg-[#2C1810] text-[#FDF8F5] px-8 py-4 rounded-full text-[10px] uppercase tracking-[0.2em] font-black hover:bg-[#3D4A3A] transition-all flex items-center gap-3">
                    <Plus className="w-4 h-4" /> Generate QR Tables
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
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                        <div className="space-y-4">
                            <h2 className="text-4xl font-playfair font-bold">Real-time Echoes</h2>
                            <p className="text-sm opacity-50 font-playfair italic">Monitoring every sensory interaction in the atelier.</p>
                        </div>
                        
                        {/* Live Date Selector */}
                        <div className="flex items-center gap-3 bg-white/5 border border-white/10 p-2 pl-4 rounded-2xl group/date hover:bg-white/10 transition-all">
                            <Calendar className="w-4 h-4 text-[#D4A373]" />
                            <input 
                                type="date" 
                                value={selectedDate}
                                onChange={(e) => setSelectedDate(e.target.value)}
                                className="bg-transparent text-[10px] uppercase tracking-[0.2em] font-black outline-none cursor-pointer [color-scheme:dark]"
                            />
                        </div>
                    </div>
                    
                    <div className="flex gap-4">
                        {["all", "pending", "preparing", "completed"].map(status => (
                            <button 
                                key={status}
                                onClick={() => setFilterStatus(status)}
                                className={`text-[9px] uppercase tracking-[0.2em] font-black px-4 py-2 rounded-full transition-all ${
                                    filterStatus === status ? "bg-[#D4A373] text-[#1A0F0A]" : "bg-white/5 text-white/40 hover:text-white"
                                }`}
                            >
                                {status}
                            </button>
                        ))}
                    </div>
                    
                    <div className="space-y-6 max-h-[500px] overflow-y-auto pr-2 no-scrollbar">
                        {orders
                            .filter(o => {
                                const orderDate = new Date(o.createdAt).toISOString().split('T')[0];
                                const matchesDate = orderDate === selectedDate;
                                const matchesStatus = filterStatus === "all" || o.status === filterStatus;
                                return matchesDate && matchesStatus;
                            })
                            .map((o) => (
                            <motion.div 
                                layout
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                key={o._id} 
                                className="flex items-center gap-6 p-6 bg-white/5 rounded-3xl border border-white/5 hover:bg-white/10 transition-all group/item"
                            >
                                <div className="w-14 h-14 bg-[#D4A373] rounded-2xl flex items-center justify-center text-[#1A0F0A] font-black shadow-xl text-xl">{o.tableId}</div>
                                <div className="flex-1 space-y-1">
                                    <div className="flex items-center gap-3">
                                        <span className={`text-[8px] font-black uppercase tracking-[0.2em] px-2 py-0.5 rounded-md ${
                                            o.status === "completed" ? "bg-green-500/20 text-green-400" : 
                                            o.status === "preparing" ? "bg-blue-500/20 text-blue-400" : "bg-orange-500/20 text-orange-400"
                                        }`}>
                                            {o.status}
                                        </span>
                                        <div className="w-1 h-1 bg-white/10 rounded-full" />
                                        <span className="text-[9px] opacity-40 uppercase font-black tracking-widest">{new Date(o.createdAt).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}</span>
                                    </div>
                                    <p className="text-base font-playfair italic text-white/80">{o.items.map(i => `${i.qty}x ${i.name}`).join(", ")}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs font-bold text-[#D4A373]">${o.totalAmount || "0.00"}</p>
                                    <p className="text-[8px] uppercase tracking-widest opacity-20 font-black">Verified</p>
                                </div>
                            </motion.div>
                        ))}
                        {orders.filter(o => new Date(o.createdAt).toISOString().split('T')[0] === selectedDate).length === 0 && (
                            <div className="py-20 text-center opacity-20">
                                <History className="w-12 h-12 mx-auto mb-4" />
                                <p className="text-[10px] uppercase tracking-[0.4em] font-black">No rituals recorded for this date</p>
                            </div>
                        )}
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
        
        {/* Simple Tab Renders to bypass length limits */}
        {activeTab === "tables" && (
           <div className="mt-12 bg-white p-10 rounded-[40px] shadow-sm">
               <h2 className="text-2xl font-playfair font-bold mb-6">Generated Tables & QR Codes</h2>
               <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                  {tables.map(t => (
                      <div key={t._id} className="p-4 border rounded-2xl flex flex-col items-center">
                          <span className="font-bold text-lg mb-2">{t.tableId}</span>
                          <img src={t.qrCodeUrl} alt="QR" className="w-24 h-24 rounded-lg" />
                      </div>
                  ))}
               </div>
           </div>
        )}

        {activeTab === "menu" && (
           <div className="mt-12 bg-white p-10 rounded-[40px] shadow-sm">
               <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-playfair font-bold">The Library (Menu Management)</h2>
                  <button onClick={async () => {
                      const name = prompt("Name:");
                      const category = prompt("Category (Beverages, Snacks, Main Course):");
                      const price = prompt("Price (Number):");
                      if(name && category && price) {
                          await addMenuItem({ name, category, price: Number(price) });
                          setMenuItems(await fetchMenu());
                      }
                  }} className="text-xs bg-[#1A0F0A] text-white px-4 py-2 rounded-lg font-bold">Add Item</button>
               </div>
               <div className="space-y-4">
                  {menuItems.map(m => (
                      <div key={m._id} className="flex justify-between items-center p-4 bg-[#FDF8F5] rounded-xl border border-[#2C1810]/10">
                          <div><span className="font-bold">{m.name}</span> - ${m.price} <span className="opacity-50 text-xs ml-2">{m.category}</span></div>
                          <button onClick={async () => {
                              await deleteMenuItem(m._id);
                              setMenuItems(await fetchMenu());
                          }} className="text-red-500 text-xs font-bold hover:underline">Remove</button>
                      </div>
                  ))}
               </div>
           </div>
        )}

        {/* ─── Reservations Panel ──────────────────────────────────── */}
        {activeTab === "reservations" && (
          <div className="mt-12 space-y-8">
            {/* Header + refresh */}
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-3xl font-playfair font-bold text-[#1A0F0A]">Seat Reservations</h2>
                <p className="text-xs opacity-40 uppercase tracking-widest font-bold mt-1">All upcoming & past bookings</p>
              </div>
              <button
                onClick={async () => setReservations(await getAllReservations())}
                className="bg-[#1A0F0A] text-white px-6 py-3 rounded-full text-[10px] uppercase tracking-widest font-black hover:bg-[#3D4A3A] transition-all flex items-center gap-2"
              >
                <Calendar className="w-4 h-4" /> Refresh
              </button>
            </div>

            {/* Filter Pills */}
            <div className="flex gap-3 flex-wrap">
              {["all", "confirmed", "cancelled"].map(f => (
                <button
                  key={f}
                  onClick={() => setResFilter(f)}
                  className={`text-[9px] uppercase tracking-[0.2em] font-black px-5 py-2 rounded-full transition-all border ${
                    resFilter === f
                      ? "bg-[#1A0F0A] text-white border-[#1A0F0A]"
                      : "bg-white text-[#1A0F0A]/40 border-[#1A0F0A]/10 hover:text-[#1A0F0A]"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-6">
              {[
                { label: "Total", value: reservations.length, color: "bg-[#1A0F0A]" },
                { label: "Confirmed", value: reservations.filter(r => r.status === "confirmed").length, color: "bg-[#3D4A3A]" },
                { label: "Cancelled", value: reservations.filter(r => r.status === "cancelled").length, color: "bg-red-600" },
              ].map(s => (
                <div key={s.label} className={`${s.color} text-white rounded-[30px] p-8 text-center`}>
                  <p className="text-4xl font-playfair font-black">{s.value}</p>
                  <p className="text-[9px] uppercase tracking-[0.3em] opacity-60 font-black mt-2">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Reservation Cards */}
            <div className="space-y-4">
              {reservations
                .filter(r => resFilter === "all" || r.status === resFilter)
                .map(r => (
                  <motion.div
                    key={r._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-[28px] p-8 border border-[#2C1810]/5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 group hover:border-[#D4A373]/30 hover:-translate-y-1 transition-all"
                  >
                    <div className="flex items-center gap-6">
                      {/* Table Badge */}
                      <div className="w-16 h-16 bg-[#1A0F0A] rounded-2xl flex items-center justify-center text-white font-black text-lg shrink-0">
                        {r.tableNumber}
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-3">
                          <p className="font-black text-[#1A0F0A] text-lg">{r.name}</p>
                          {r.isBirthday && (
                            <span className="text-[9px] font-black uppercase tracking-widest bg-pink-100 text-pink-600 border border-pink-200 px-3 py-1 rounded-full flex items-center gap-1">
                              🎂 Birthday
                            </span>
                          )}
                        </div>
                        <p className="text-xs opacity-50 font-mono">{r.email}</p>
                        <div className="flex flex-wrap items-center gap-3 mt-1">
                          <span className="text-[9px] font-black uppercase tracking-widest bg-[#FDF8F5] px-3 py-1 rounded-full border border-[#2C1810]/10">
                            📅 {r.date}
                          </span>
                          <span className="text-[9px] font-black uppercase tracking-widest bg-[#FDF8F5] px-3 py-1 rounded-full border border-[#2C1810]/10">
                            🕐 {r.time}
                          </span>
                          <span className="text-[9px] font-black uppercase tracking-widest bg-[#FDF8F5] px-3 py-1 rounded-full border border-[#2C1810]/10">
                            👥 {r.partySize} guests
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 shrink-0">
                      <span className={`text-[9px] font-black uppercase tracking-[0.2em] px-4 py-2 rounded-full ${
                        r.status === "confirmed"
                          ? "bg-green-500/10 text-green-600 border border-green-500/20"
                          : "bg-red-500/10 text-red-500 border border-red-500/20"
                      }`}>
                        {r.status}
                      </span>
                      {r.status === "confirmed" && (
                        <button
                          onClick={async () => {
                            await cancelReservation(r._id);
                            setReservations(await getAllReservations());
                          }}
                          className="text-[9px] font-black uppercase tracking-widest text-red-500 border border-red-500/20 px-4 py-2 rounded-full hover:bg-red-500 hover:text-white transition-all"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </motion.div>
                ))}
              {reservations.filter(r => resFilter === "all" || r.status === resFilter).length === 0 && (
                <div className="py-24 text-center opacity-20">
                  <Calendar className="w-12 h-12 mx-auto mb-4 text-[#1A0F0A]" />
                  <p className="text-[10px] uppercase tracking-[0.4em] font-black text-[#1A0F0A]">No reservations found</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
