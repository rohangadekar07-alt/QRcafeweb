"use client";
import { useEffect, useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import AdminSidebar from "@/components/AdminSidebar";
import AdminHeader from "@/components/AdminHeader";
import { getTables, generateTables } from "@/utils/api";
import { Grid, Sparkles, Download, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";

export default function AdminTables() {
  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchT = async () => {
    try {
      setTables(await getTables());
    } catch(err) { console.error(err); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchT(); }, []);

  const handleGenerate = async () => {
      try {
          setLoading(true);
          await generateTables();
          await fetchT();
          alert("Sanctuary mapped: T1-T10 created.");
      } catch(err) {
          alert("Error: " + err.message);
          setLoading(false);
      }
  };

  return (
    <ProtectedRoute roleNeeded="admin">
      <div className="min-h-screen bg-[#FDF8F5] flex">
        <AdminSidebar />
        
        <div className="flex-1 flex flex-col h-screen overflow-hidden">
          <AdminHeader />
          
          <main className="flex-1 overflow-y-auto p-10 space-y-12 no-scrollbar">
             <div className="flex justify-between items-end border-b border-[#1A0F0A]/5 pb-8">
               <div className="space-y-2">
                  <h2 className="text-4xl font-playfair font-black text-[#1A0F0A]">Table Management</h2>
                  <p className="text-xs text-[#1A0F0A]/40 font-medium">Connecting the physical atelier to our digital pulse.</p>
               </div>
               <button 
                 onClick={handleGenerate}
                 className="bg-[#1A0F0A] text-white px-8 py-4 rounded-full text-[10px] uppercase tracking-[0.2em] font-black hover:bg-[#3D4A3A] transition-all flex items-center gap-3 shadow-xl"
               >
                  <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} /> Remap Sanctuary
               </button>
             </div>
             
             {loading ? (
               <div className="h-64 flex flex-col items-center justify-center gap-4">
                  <div className="w-8 h-8 border-4 border-[#D4A373] border-t-transparent rounded-full animate-spin" />
                  <p className="text-[10px] uppercase tracking-widest font-black text-[#1A0F0A]/30">Scanning Grids...</p>
               </div>
             ) : tables.length === 0 ? (
                <div className="bg-white rounded-[50px] p-24 text-center border border-[#2C1810]/5 flex flex-col items-center group shadow-sm">
                   <div className="w-24 h-24 bg-[#1A0F0A]/5 rounded-[40px] flex items-center justify-center text-[#1A0F0A]/20 mb-8 group-hover:scale-110 transition-transform">
                      <Grid className="w-10 h-10" />
                   </div>
                   <h2 className="text-2xl font-playfair font-bold text-[#1A0F0A]">Disconnected Space</h2>
                   <p className="text-xs text-[#1A0F0A]/40 mt-3 font-medium max-w-xs">No ritual points have been established yet in the sanctuary.</p>
                </div>
             ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
                   {tables.map((t, i) => (
                       <motion.div 
                         initial={{ opacity: 0, scale: 0.9 }}
                         animate={{ opacity: 1, scale: 1 }}
                         transition={{ delay: i * 0.05 }}
                         key={t._id} 
                         className="bg-white p-8 rounded-[40px] shadow-[0_20px_50px_rgba(44,24,16,0.03)] border border-[#2C1810]/5 flex flex-col items-center text-center group hover:-translate-y-2 transition-all duration-500"
                       >
                           <div className="w-10 h-10 rounded-2xl bg-[#D4A373]/10 flex items-center justify-center text-[#D4A373] font-black text-xl mb-6 shadow-sm">
                              {t.tableId}
                           </div>
                           <div className="relative p-2 bg-white rounded-2xl border border-[#D4A373]/20 mb-6 group-hover:border-[#D4A373]/60 transition-colors">
                              <img src={t.qrCodeUrl} alt={t.tableId} className="w-full max-w-[140px] rounded-xl" />
                              <div className="absolute inset-0 bg-white/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-xl">
                                  <a href={t.qrCodeUrl} download={`${t.tableId}.png`} className="p-4 bg-[#1A0F0A] text-white rounded-2xl shadow-xl hover:scale-110 transition-transform">
                                     <Download className="w-5 h-5" />
                                  </a>
                              </div>
                           </div>
                           <p className="text-[10px] text-[#1A0F0A]/30 font-black uppercase tracking-widest group-hover:text-[#D4A373] transition-colors">Point {t.tableId}</p>
                       </motion.div>
                   ))}
                </div>
             )}
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
