"use client";
import { useEffect, useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import { getOrders, updateOrderStatus } from "@/utils/api";
import { io } from "socket.io-client";
import { LogOut, Flame, Clock, CheckCircle2, ChefHat, Sparkles, Timer, Utensils, Zap, Filter } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function ChefDashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchRealOrders = async () => {
      try {
        setOrders(await getOrders());
      } catch (err) {
        console.error("Failed to load orders:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchRealOrders();

    const socket = io("http://localhost:5000");
    socket.on("new_order", (o) => setOrders(prev => [o, ...prev]));
    socket.on("order_updated", (o) => setOrders(prev => prev.map(p => p._id === o._id ? o : p)));
    socket.on("order_completed", (o) => setOrders(prev => prev.map(p => p._id === o._id ? o : p)));

    return () => socket.disconnect();
  }, []);

  const handleUpdate = async (id, status) => {
     try {
         await updateOrderStatus(id, status);
     } catch(err) {
         alert(err.message);
     }
  };

  const handleLogout = () => {
      localStorage.removeItem("token");
      localStorage.removeItem("userRole");
      router.push("/login");
  };

  const activeOrders = orders.filter(o => o.status !== "completed");
  const urgentCount = activeOrders.filter(o => {
      const waitTime = (new Date() - new Date(o.createdAt)) / (1000 * 60);
      return waitTime > 15;
  }).length;

  return (
    <ProtectedRoute roleNeeded="chef">
      <div className="min-h-screen bg-[#0A0A0B] text-[#F3F4F6] flex flex-col font-sans selection:bg-[#D4A373]/30">
          
          {/* Executive Header */}
          <header className="h-20 bg-[#121214] px-8 flex justify-between items-center border-b border-white/5 shadow-2xl z-50">
             <div className="flex items-center gap-8">
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 bg-[#D4A373] rounded-xl flex items-center justify-center shadow-lg shadow-[#D4A373]/20">
                      <ChefHat className="text-[#0A0A0B] w-6 h-6" />
                   </div>
                   <div className="flex flex-col">
                      <h1 className="text-lg font-black tracking-widest text-white leading-none">KITCHEN<span className="text-[#D4A373]">OS</span></h1>
                      <span className="text-[9px] uppercase tracking-[0.3em] font-bold text-white/30">Command Center • v2.4</span>
                   </div>
                </div>
                
                <div className="hidden md:flex items-center gap-6 ml-4">
                   <div className="h-8 w-[1px] bg-white/10" />
                   <div className="flex gap-4">
                      <div className="flex items-center gap-2 px-4 py-1.5 bg-white/5 rounded-full border border-white/5">
                         <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_#22c55e]" />
                         <span className="text-[10px] font-black uppercase tracking-widest text-white/60">{activeOrders.length} Active</span>
                      </div>
                      {urgentCount > 0 && (
                         <div className="flex items-center gap-2 px-4 py-1.5 bg-red-500/10 rounded-full border border-red-500/20">
                            <Zap className="w-3 h-3 text-red-500 animate-bounce" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-red-500">{urgentCount} Urgent</span>
                         </div>
                      )}
                   </div>
                </div>
             </div>

             <div className="flex items-center gap-6">
                <div className="hidden sm:flex flex-col text-right">
                   <span className="text-[10px] font-black uppercase tracking-widest text-[#D4A373]">Executive Chef</span>
                   <span className="text-xs font-semibold text-white/60 mt-0.5">Kitchen Station 01</span>
                </div>
                <button 
                  onClick={handleLogout} 
                  className="w-12 h-12 flex items-center justify-center bg-white/5 rounded-xl text-white/40 hover:text-red-500 hover:bg-red-500/10 transition-all border border-white/10 group"
                >
                  <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform"/>
                </button>
             </div>
          </header>
          
          <main className="flex-1 p-8 overflow-y-auto no-scrollbar bg-[radial-gradient(circle_at_top_right,#121214,transparent_40%)]">
             <div className="max-w-[1920px] mx-auto">
               
               {/* Quick Info Bar */}
               <div className="flex justify-between items-center mb-8">
                  <div className="flex items-center gap-2 text-white/40">
                     <Filter className="w-3.5 h-3.5" />
                     <span className="text-[10px] uppercase font-black tracking-widest">Showing All Orders</span>
                  </div>
                  <div className="flex items-center gap-3">
                     <span className="text-[10px] uppercase font-black tracking-widest text-white/20">Auto-Refresh Active</span>
                     <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-ping" />
                  </div>
               </div>

               {loading ? (
                  <div className="h-[60vh] flex flex-col items-center justify-center gap-6">
                     <div className="relative">
                        <div className="w-16 h-16 border-4 border-white/5 border-t-[#D4A373] rounded-full animate-spin" />
                        <Sparkles className="absolute inset-0 m-auto text-[#D4A373] w-6 h-6 animate-pulse" />
                     </div>
                     <p className="text-[11px] uppercase tracking-[0.5em] font-black text-white/20">Syncing Production Cloud...</p>
                  </div>
               ) : activeOrders.length === 0 ? (
                  <div className="h-[60vh] flex flex-col items-center justify-center gap-6">
                     <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center">
                        <CheckCircle2 className="w-10 h-10 text-white/10" />
                     </div>
                     <div className="text-center space-y-2">
                        <h2 className="text-2xl font-black text-white/20 uppercase tracking-[0.2em]">Kitchen Clear</h2>
                        <p className="text-[10px] uppercase tracking-[0.4em] text-white/10 font-bold">Awaiting sensory transmission</p>
                     </div>
                  </div>
               ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
                    <AnimatePresence mode="popLayout" initial={false}>
                      {activeOrders.map(order => (
                          <motion.div 
                            layout
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9, x: -20 }}
                            key={order._id} 
                            className={`flex flex-col rounded-3xl overflow-hidden shadow-2xl border transition-all duration-500 ${
                               order.status === 'preparing' 
                                 ? 'bg-[#121214] border-blue-500/30' 
                                 : 'bg-[#121214] border-white/5'
                            }`}
                          >
                             {/* Card Header */}
                             <div className={`p-6 flex justify-between items-start border-b border-white/5 ${
                                order.status === 'preparing' ? 'bg-blue-500/5' : 'bg-white/[0.02]'
                             }`}>
                                <div className="space-y-1">
                                   <div className="flex items-center gap-2">
                                      <span className="text-[10px] font-black uppercase tracking-widest text-white/30">Table</span>
                                      <div className={`w-2 h-2 rounded-full ${order.status === 'preparing' ? 'bg-blue-500 animate-pulse' : 'bg-amber-400'}`} />
                                   </div>
                                   <h3 className="text-5xl font-black text-white tracking-tighter">{order.tableId}</h3>
                                </div>
                                <div className="flex flex-col items-end gap-2">
                                   <div className="flex items-center gap-2 text-white/60">
                                      <Clock className="w-3.5 h-3.5" />
                                      <span className="text-xs font-mono font-bold">{new Date(order.createdAt).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}</span>
                                   </div>
                                   <OrderTimer createdAt={order.createdAt} />
                                </div>
                             </div>

                             {/* Items List */}
                             <div className="flex-1 p-6 space-y-4">
                                <div className="flex items-center gap-2 mb-2">
                                   <Utensils className="w-3 h-3 text-[#D4A373]" />
                                   <span className="text-[9px] font-black uppercase tracking-widest text-[#D4A373]">Fulfillment List</span>
                                </div>
                                <div className="space-y-3">
                                   {order.items.map((item, idx) => (
                                      <div key={idx} className="flex items-center gap-4 bg-white/5 p-3 rounded-2xl border border-white/5 group hover:bg-white/10 transition-colors">
                                         <div className="w-10 h-10 bg-[#D4A373] text-[#0A0A0B] rounded-xl flex items-center justify-center font-black text-lg shadow-lg">
                                            {item.qty}
                                         </div>
                                         <div className="flex flex-col">
                                            <span className="text-sm font-bold text-white group-hover:text-[#D4A373] transition-colors">{item.name}</span>
                                            <span className="text-[8px] font-black uppercase tracking-widest text-white/20">Standard Prep</span>
                                         </div>
                                      </div>
                                   ))}
                                </div>
                             </div>

                             {/* Action Footer */}
                             <div className="p-4 bg-white/[0.02] border-t border-white/5">
                                {order.status === "pending" ? (
                                    <button 
                                      onClick={() => handleUpdate(order._id, "preparing")} 
                                      className="w-full py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black uppercase text-[10px] tracking-[0.3em] flex items-center justify-center gap-3 shadow-lg shadow-blue-600/20 active:scale-[0.98] transition-all"
                                    >
                                       <Flame className="w-4 h-4 fill-white" /> Start Preparation
                                    </button>
                                ) : (
                                    <button 
                                      onClick={() => handleUpdate(order._id, "completed")} 
                                      className="w-full py-5 bg-[#22c55e] hover:bg-[#16a34a] text-[#0A0A0B] rounded-2xl font-black uppercase text-[10px] tracking-[0.3em] flex items-center justify-center gap-3 shadow-lg shadow-[#22c55e]/20 active:scale-[0.98] transition-all"
                                    >
                                       <CheckCircle2 className="w-4 h-4" /> Ready for Pickup
                                    </button>
                                )}
                             </div>
                          </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
               )}
             </div>
          </main>
      </div>
    </ProtectedRoute>
  );
}

function OrderTimer({ createdAt }) {
   const [time, setTime] = useState("");

   useEffect(() => {
      const update = () => {
         const diff = new Date() - new Date(createdAt);
         const mins = Math.floor(diff / 60000);
         const secs = Math.floor((diff % 60000) / 1000);
         setTime(`${mins}m ${secs}s`);
      };
      update();
      const interval = setInterval(update, 1000);
      return () => clearInterval(interval);
   }, [createdAt]);

   const isUrgent = parseInt(time) >= 15;

   return (
      <div className={`px-2.5 py-1 rounded-md text-[9px] font-black tracking-widest uppercase flex items-center gap-1.5 transition-colors ${
         isUrgent ? 'bg-red-500 text-white animate-pulse' : 'bg-white/10 text-white/40'
      }`}>
         <Timer className="w-2.5 h-2.5" />
         {time}
      </div>
   );
}
