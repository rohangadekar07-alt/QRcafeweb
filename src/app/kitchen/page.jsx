"use client";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sparkles, 
  ChefHat, 
  Clock, 
  CheckCircle2, 
  Flame, 
  Utensils, 
  Maximize2, 
  MinusCircle,
  History,
  Timer,
  AlertTriangle,
  ArrowRight
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function KitchenDashboard() {
  const [orders, setOrders] = useState([
    { id: "401", table: "02", items: ["Neapolitan Gold Pizza", "2x Bourbon Latte"], time: "12:10", status: "preparing", priority: "high" },
    { id: "402", table: "05", items: ["Wagyu Heritage Burger", "Cold Brew Velvet"], time: "12:08", status: "preparing", priority: "normal" },
    { id: "403", table: "01", items: ["Mushroom Gruyère Burger"], time: "12:05", status: "ready", priority: "normal" },
    { id: "404", table: "03", items: ["Espresso Roman", "3x Juice Artisanal"], time: "12:15", status: "preparing", priority: "high" },
  ]);

  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const completeOrder = (id) => {
    setOrders(orders.map(order => 
      order.id === id ? { ...order, status: "ready" } : order
    ));
    // In a real app, this would remove from active list after some time
  };

  return (
    <main className="min-h-screen bg-[#1A0F0A] text-[#FDF8F5] relative overflow-hidden flex flex-col">
      {/* Header */}
      <header className="px-8 py-10 md:px-16 flex justify-between items-center border-b border-white/5 relative z-10 bg-[#1A0F0A]">
        <div className="flex items-center gap-12">
            <Link href="/" className="flex items-center gap-3 cursor-pointer group">
                <Sparkles className="text-[#D4A373] w-6 h-6 group-hover:rotate-180 transition-transform duration-1000" />
                <div className="text-2xl font-playfair font-black tracking-tighter text-white">
                    BREWED<span className="text-[#3D4A3A]">CRAFT</span>
                </div>
            </Link>
            <div className="hidden md:flex gap-8 text-[11px] uppercase tracking-[0.4em] font-black text-[#FDF8F5]/30">
                <span className="text-[#D4A373]">Live Atelier</span>
                <span className="hover:text-white transition-all cursor-pointer">Menu Prep</span>
                <span className="hover:text-white transition-all cursor-pointer">Historical Plates</span>
            </div>
        </div>

        <div className="flex items-center gap-10">
            <div className="text-right hidden sm:block">
                <p className="text-[10px] uppercase tracking-[0.3em] opacity-40 font-black">Kitchen Time</p>
                <div className="text-2xl font-playfair font-bold text-[#D4A373] tracking-wider">{currentTime}</div>
            </div>
            <div className="w-12 h-12 bg-[#3D4A3A] rounded-2xl flex items-center justify-center text-white shadow-3xl">
                <ChefHat className="w-6 h-6" />
            </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 p-8 md:p-16 relative z-10 overflow-x-auto">
        <div className="max-w-screen-2xl mx-auto space-y-12">
            
            {/* Status Summary */}
            <div className="flex flex-wrap gap-8">
                <div className="flex-1 min-w-[200px] bg-white/5 p-8 rounded-[30px] border border-white/5 flex flex-col justify-between group hover:bg-white/10 transition-all">
                    <Flame className="w-6 h-6 text-orange-500 mb-6" />
                    <p className="text-[10px] uppercase tracking-[0.2em] opacity-40 font-black">Active Flames</p>
                    <h3 className="text-4xl font-playfair font-black">{orders.filter(o => o.status === 'preparing').length}</h3>
                </div>
                <div className="flex-1 min-w-[200px] bg-white/5 p-8 rounded-[30px] border border-white/5 flex flex-col justify-between group hover:bg-white/10 transition-all">
                    <CheckCircle2 className="w-6 h-6 text-[#3D4A3A] mb-6" />
                    <p className="text-[10px] uppercase tracking-[0.2em] opacity-40 font-black">Service Ready</p>
                    <h3 className="text-4xl font-playfair font-black">{orders.filter(o => o.status === 'ready').length}</h3>
                </div>
                <div className="flex-1 min-w-[200px] bg-white/5 p-8 rounded-[30px] border border-white/5 flex flex-col justify-between group hover:bg-white/10 transition-all">
                    <Timer className="w-6 h-6 text-[#D4A373] mb-6" />
                    <p className="text-[10px] uppercase tracking-[0.2em] opacity-40 font-black">Avg Precision</p>
                    <h3 className="text-4xl font-playfair font-black">12.4<span className="text-sm opacity-20 ml-2">min</span></h3>
                </div>
            </div>

            {/* Orders Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                <AnimatePresence mode="popLayout">
                    {orders.map((order) => (
                        <motion.div
                            layout
                            key={order.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className={`relative rounded-[40px] p-8 md:p-10 border transition-all duration-700 min-h-[400px] flex flex-col justify-between group overflow-hidden ${
                                order.status === "ready" 
                                    ? "bg-[#3D4A3A]/20 border-[#3D4A3A]/40" 
                                    : order.priority === "high"
                                        ? "bg-red-500/5 border-red-500/20"
                                        : "bg-white/5 border-white/10"
                            }`}
                        >
                            {/* Priority Badge */}
                            {order.priority === "high" && order.status !== "ready" && (
                                <div className="absolute top-6 right-6 bg-red-500 text-white text-[8px] font-black px-3 py-1 rounded-full uppercase tracking-widest animate-pulse">
                                    Priority
                                </div>
                            )}

                            {/* Ticket Number & Table */}
                            <div className="space-y-2">
                                <div className="flex justify-between items-end border-b border-white/10 pb-6 mb-6">
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-30 italic">Order Ticket</p>
                                        <h4 className="text-2xl font-playfair font-black">#{order.id}</h4>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-30 italic">Sanctuary Table</p>
                                        <h4 className="text-4xl font-playfair font-bold text-[#D4A373]">{order.table}</h4>
                                    </div>
                                </div>

                                {/* Items List */}
                                <div className="space-y-4">
                                    {order.items.map((item, i) => (
                                        <div key={i} className="flex items-start gap-4">
                                            <div className="w-1.5 h-1.5 rounded-full bg-[#D4A373] mt-2 group-hover:scale-150 transition-transform" />
                                            <p className="text-lg font-playfair italic flex-1">{item}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Bottom Controls */}
                            <div className="space-y-6 pt-10">
                                <div className="flex justify-between items-center text-[10px] uppercase font-black tracking-widest">
                                    <div className="flex items-center gap-2 opacity-40">
                                        <Clock className="w-3 h-3" />
                                        <span>Ordered {order.time}</span>
                                    </div>
                                    <div className={`px-4 py-1.5 rounded-full ${order.status === 'ready' ? "bg-[#3D4A3A] text-white" : "bg-white/5 opacity-50"}`}>
                                        {order.status}
                                    </div>
                                </div>

                                <button 
                                    onClick={() => completeOrder(order.id)}
                                    disabled={order.status === "ready"}
                                    className={`w-full py-5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-700 flex items-center justify-center gap-3 ${
                                        order.status === "ready"
                                            ? "bg-transparent border border-white/10 text-white/20"
                                            : "bg-[#D4A373] text-[#1A0F0A] hover:bg-[#FDF8F5] shadow-2xl"
                                    }`}
                                >
                                    {order.status === "ready" ? "Service Fulfilled" : "Mark as Culinary Art"} <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>

                            {/* Background Texture */}
                            <Sparkles className="absolute -bottom-10 -right-10 w-40 h-40 opacity-[0.02] text-[#D4A373] pointer-events-none group-hover:opacity-[0.05] transition-opacity" />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
      </div>

      {/* Culinary Silk Background Design */}
      <div className="absolute inset-0 pointer-events-none select-none z-0">
          <div className="absolute -top-1/4 -right-1/4 w-[120%] h-[120%] bg-gradient-to-bl from-[#D4A373]/10 via-transparent to-transparent rounded-full blur-[140px] opacity-100" />
          <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-[#3D4A3A]/10 rounded-full blur-[120px] opacity-100" />
      </div>

      {/* Floating Kitchen Alerts */}
      <div className="fixed bottom-12 right-12 z-50 flex flex-col gap-4">
          <div className="bg-[#1A0F0A] border border-white/10 p-6 rounded-3xl shadow-3xl text-sm flex items-center gap-8 backdrop-blur-xl animate-bounce">
              <div className="w-10 h-10 bg-red-500 rounded-2xl flex items-center justify-center animate-pulse">
                  <AlertTriangle className="w-5 h-5 text-white" />
              </div>
              <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-red-500 mb-1">Ritual Delay Risk</p>
                  <p className="text-white opacity-60 font-medium">Table 05: Truffle Artisan Prep over 15m</p>
              </div>
          </div>
      </div>
      
    </main>
  );
}
