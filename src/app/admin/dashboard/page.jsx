"use client";
import { useEffect, useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import AdminSidebar from "@/components/AdminSidebar";
import AdminHeader from "@/components/AdminHeader";
import { getOrders } from "@/utils/api";
import { io } from "socket.io-client";
import { motion, AnimatePresence } from "framer-motion";
import { 
  TrendingUp, 
  Clock, 
  CheckCircle2, 
  Flame, 
  Coffee,
  ShoppingBag,
  ArrowRight
} from "lucide-react";

export default function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setOrders(await getOrders());
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();

    const socket = io("http://localhost:5000");
    socket.on("new_order", (o) => setOrders(prev => [o, ...prev]));
    socket.on("order_updated", (o) => setOrders(prev => prev.map(p => p._id === o._id ? o : p)));
    socket.on("order_completed", (o) => setOrders(prev => prev.map(p => p._id === o._id ? o : p)));

    return () => socket.disconnect();
  }, []);

  const stats = [
    { label: "Total Rituals", value: orders.length, icon: ShoppingBag, color: "text-[#1A0F0A]", bg: "bg-white" },
    { label: "Pending", value: orders.filter(o => o.status === "pending").length, icon: Clock, color: "text-amber-600", bg: "bg-amber-50" },
    { label: "Preparing", value: orders.filter(o => o.status === "preparing").length, icon: Flame, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Completed", value: orders.filter(o => o.status === "completed").length, icon: CheckCircle2, color: "text-[#3D4A3A]", bg: "bg-[#3D4A3A]/10" },
  ];

  const filteredOrders = orders.filter(o => filter === "all" || o.status === filter);

  return (
    <ProtectedRoute roleNeeded="admin">
      <div className="min-h-screen bg-[#FDF8F5] flex">
        <AdminSidebar />
        
        <div className="flex-1 flex flex-col h-screen overflow-hidden">
          <AdminHeader />
          
          <main className="flex-1 overflow-y-auto p-10 space-y-12 no-scrollbar">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, i) => (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  key={stat.label}
                  className={`${stat.bg} ${stat.color} p-8 rounded-[40px] shadow-[0_20px_50px_rgba(44,24,16,0.03)] border border-[#2C1810]/5 group hover:-translate-y-2 transition-all duration-500`}
                >
                  <div className="flex justify-between items-start mb-6">
                    <div className="p-4 bg-white/50 rounded-2xl">
                      <stat.icon className="w-6 h-6" />
                    </div>
                  </div>
                  <p className="text-[10px] uppercase tracking-[0.2em] opacity-60 font-black mb-2">{stat.label}</p>
                  <h3 className="text-4xl font-playfair font-black">{stat.value}</h3>
                </motion.div>
              ))}
            </div>

            {/* Orders Section */}
            <section className="space-y-8">
              <div className="flex justify-between items-end border-b border-[#1A0F0A]/5 pb-6">
                <div className="space-y-2">
                  <h2 className="text-3xl font-playfair font-black text-[#1A0F0A]">Real-time Flow</h2>
                  <p className="text-xs text-[#1A0F0A]/40 font-medium">Monitoring the current rhythmic pulse of the café.</p>
                </div>
                
                <div className="flex bg-[#1A0F0A]/5 p-1.5 rounded-2xl gap-2">
                   {["all", "pending", "preparing", "completed"].map(tab => (
                     <button 
                       key={tab} 
                       onClick={() => setFilter(tab)}
                       className={`px-6 py-2.5 rounded-xl text-[10px] uppercase tracking-widest font-black transition-all ${
                         filter === tab ? "bg-[#1A0F0A] text-white shadow-xl" : "text-[#1A0F0A]/30 hover:text-[#1A0F0A]"
                       }`}
                     >
                       {tab}
                     </button>
                   ))}
                </div>
              </div>

              {loading ? (
                <div className="h-64 flex items-center justify-center">
                  <div className="w-8 h-8 border-4 border-[#D4A373] border-t-transparent rounded-full animate-spin" />
                </div>
              ) : filteredOrders.length === 0 ? (
                <div className="bg-white rounded-[50px] p-20 text-center border border-[#2C1810]/5 shadow-sm">
                   <p className="text-gray-400 font-playfair italic">No echoes detected in this quadrant...</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  <AnimatePresence mode="popLayout">
                    {filteredOrders.map(order => (
                      <motion.div
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        key={order._id}
                        className="bg-white rounded-[40px] p-8 shadow-[0_20px_50px_rgba(44,24,16,0.03)] border border-[#2C1810]/5 group hover:border-[#D4A373]/30 transition-all duration-500 flex flex-col"
                      >
                        <div className="flex justify-between items-start mb-8">
                          <div className="space-y-1">
                            <span className="text-[9px] uppercase tracking-[0.3em] font-black text-[#D4A373]">Sanctuary</span>
                            <h4 className="text-4xl font-playfair font-black text-[#1A0F0A]">{order.tableId}</h4>
                          </div>
                          <div className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${
                            order.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                            order.status === 'preparing' ? 'bg-blue-100 text-blue-700' : 'bg-[#3D4A3A]/10 text-[#3D4A3A]'
                          }`}>
                            {order.status}
                          </div>
                        </div>

                        <ul className="space-y-4 mb-10 flex-grow">
                          {order.items.map((item, i) => (
                            <li key={i} className="flex items-center gap-4">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#D4A373]" />
                              <span className="text-sm font-playfair italic text-[#1A0F0A]/80">
                                <span className="font-bold text-[#1A0F0A] mr-2">{item.qty}x</span>
                                {item.name}
                              </span>
                            </li>
                          ))}
                        </ul>

                        <div className="pt-6 border-t border-[#1A0F0A]/5 flex justify-between items-center text-[10px] uppercase tracking-widest font-black text-[#1A0F0A]/30">
                          <div className="flex items-center gap-2">
                             <Clock className="w-3.5 h-3.5" />
                             {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </div>
                          <button className="flex items-center gap-2 text-[#D4A373] hover:text-[#1A0F0A] transition-colors group/btn">
                             View Details <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </section>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
