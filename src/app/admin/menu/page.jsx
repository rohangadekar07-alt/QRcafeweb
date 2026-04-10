"use client";
import { useEffect, useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import AdminSidebar from "@/components/AdminSidebar";
import AdminHeader from "@/components/AdminHeader";
import { fetchMenu, addMenuItem, deleteMenuItem } from "@/utils/api";
import { Plus, Trash2, Edit3, Filter } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminMenu() {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Beverages");
  const [price, setPrice] = useState("");

  const loadMenu = async () => {
    try {
      setMenuItems(await fetchMenu());
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadMenu(); }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!name || !price) return;
    try {
      await addMenuItem({ name, category, price: Number(price) });
      setName(""); setPrice("");
      setIsModalOpen(false);
      await loadMenu();
    } catch (err) { alert(err.message); }
  };

  const handleDelete = async (id) => {
    if (!confirm("Remove this masterpiece from the library?")) return;
    try {
      await deleteMenuItem(id);
      await loadMenu();
    } catch (err) { alert(err.message); }
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
                  <h2 className="text-4xl font-playfair font-black text-[#1A0F0A]">The Library</h2>
                  <p className="text-xs text-[#1A0F0A]/40 font-medium leading-relaxed">Curating the artisanal flavors and sensory experiences of Brewed Craft.</p>
               </div>
               <button 
                 onClick={() => setIsModalOpen(true)}
                 className="bg-[#2C1810] text-[#FDF8F5] px-8 py-4 rounded-full text-[10px] uppercase tracking-[0.2em] font-black hover:bg-[#3D4A3A] transition-all flex items-center gap-3 shadow-xl"
               >
                  <Plus className="w-4 h-4" /> Add Masterpiece
               </button>
            </div>

            <div className="bg-white rounded-[50px] shadow-[0_20px_50px_rgba(44,24,16,0.03)] border border-[#2C1810]/5 overflow-hidden">
               {loading ? (
                  <div className="p-20 text-center flex flex-col items-center gap-4">
                     <div className="w-8 h-8 border-4 border-[#D4A373] border-t-transparent rounded-full animate-spin" />
                     <p className="text-[10px] uppercase tracking-widest font-black text-[#1A0F0A]/30">Reading Library...</p>
                  </div>
               ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                       <thead>
                          <tr className="bg-[#1A0F0A]/[0.02] border-b border-[#1A0F0A]/5">
                             <th className="p-8 text-[10px] uppercase tracking-widest font-black text-[#1A0F0A]/40">Experience Name</th>
                             <th className="p-8 text-[10px] uppercase tracking-widest font-black text-[#1A0F0A]/40">Classification</th>
                             <th className="p-8 text-[10px] uppercase tracking-widest font-black text-[#1A0F0A]/40">Value</th>
                             <th className="p-8 text-[10px] uppercase tracking-widest font-black text-[#1A0F0A]/40">Status</th>
                             <th className="p-8 text-[10px] uppercase tracking-widest font-black text-[#1A0F0A]/40">Actions</th>
                          </tr>
                       </thead>
                       <tbody className="divide-y divide-[#1A0F0A]/5">
                          {menuItems.map((item, i) => (
                             <motion.tr 
                               initial={{ opacity: 0, x: -10 }}
                               animate={{ opacity: 1, x: 0 }}
                               transition={{ delay: i * 0.05 }}
                               key={item._id} 
                               className="hover:bg-[#FDF8F5]/50 transition-colors group"
                             >
                                <td className="p-8">
                                   <div className="flex items-center gap-4">
                                      <div className="w-10 h-10 rounded-2xl bg-[#D4A373]/10 flex items-center justify-center text-[#D4A373] group-hover:bg-[#D4A373] group-hover:text-white transition-all">
                                         <Coffee className="w-5 h-5" />
                                      </div>
                                      <span className="text-base font-playfair font-bold text-[#1A0F0A]">{item.name}</span>
                                   </div>
                                </td>
                                <td className="p-8">
                                   <span className="text-[10px] uppercase tracking-widest font-black text-[#3D4A3A] bg-[#3D4A3A]/5 px-4 py-2 rounded-full">{item.category}</span>
                                </td>
                                <td className="p-8 text-lg font-playfair font-black text-[#1A0F0A]">${item.price}</td>
                                <td className="p-8">
                                   <span className={`inline-flex items-center gap-2 text-[9px] uppercase tracking-widest font-black ${item.available ? "text-[#3D4A3A]" : "text-red-400"}`}>
                                      <div className={`w-1.5 h-1.5 rounded-full ${item.available ? "bg-[#3D4A3A]" : "bg-red-400"}`} />
                                      {item.available ? "Available" : "Out of Stock"}
                                   </span>
                                </td>
                                <td className="p-8">
                                   <div className="flex items-center gap-4">
                                      <button className="p-3 hover:bg-[#1A0F0A]/5 rounded-xl transition-all text-[#1A0F0A]/20 hover:text-[#1A0F0A]">
                                         <Edit3 className="w-4 h-4" />
                                      </button>
                                      <button 
                                        onClick={() => handleDelete(item._id)}
                                        className="p-3 hover:bg-red-500/5 rounded-xl transition-all text-[#1A0F0A]/20 hover:text-red-500"
                                      >
                                         <Trash2 className="w-4 h-4" />
                                      </button>
                                   </div>
                                </td>
                             </motion.tr>
                          ))}
                       </tbody>
                    </table>
                  </div>
               )}
            </div>

            {/* Modal Overlay */}
            <AnimatePresence>
               {isModalOpen && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[60] bg-[#1A0F0A]/40 backdrop-blur-md flex items-center justify-center p-6"
                  >
                     <motion.div 
                       initial={{ scale: 0.9, y: 20 }}
                       animate={{ scale: 1, y: 0 }}
                       exit={{ scale: 0.9, y: 20 }}
                       className="bg-[#FDF8F5] rounded-[50px] p-12 max-w-lg w-full shadow-2xl space-y-10"
                     >
                        <div className="space-y-2">
                           <h3 className="text-3xl font-playfair font-black text-[#1A0F0A]">Curate Ritual</h3>
                           <p className="text-[10px] uppercase tracking-[0.3em] text-[#1A0F0A]/40 font-black">Add new essence to the library</p>
                        </div>

                        <form onSubmit={handleAdd} className="space-y-6">
                           <div className="space-y-2">
                              <label className="text-[9px] uppercase tracking-widest font-black text-[#1A0F0A]/40 ml-4">Masterpiece Name</label>
                              <input 
                                required 
                                type="text" 
                                value={name} 
                                onChange={e=>setName(e.target.value)} 
                                placeholder="e.g. Bourbon Latte"
                                className="w-full bg-[#1A0F0A]/5 border-none rounded-3xl p-6 outline-none focus:bg-[#1A0F0A]/10 transition-all font-playfair text-lg text-[#1A0F0A]"
                              />
                           </div>

                           <div className="grid grid-cols-2 gap-6">
                              <div className="space-y-2">
                                 <label className="text-[9px] uppercase tracking-widest font-black text-[#1A0F0A]/40 ml-4">Classification</label>
                                 <select 
                                   value={category} 
                                   onChange={e=>setCategory(e.target.value)}
                                   className="w-full bg-[#1A0F0A]/5 border-none rounded-3xl p-6 outline-none focus:bg-[#1A0F0A]/10 transition-all font-playfair text-[#1A0F0A]"
                                 >
                                    <option>Beverages</option>
                                    <option>Snacks</option>
                                    <option>Main Course</option>
                                 </select>
                              </div>
                              <div className="space-y-2">
                                 <label className="text-[9px] uppercase tracking-widest font-black text-[#1A0F0A]/40 ml-4">Value ($)</label>
                                 <input 
                                   required 
                                   type="number" 
                                   value={price} 
                                   onChange={e=>setPrice(e.target.value)} 
                                   className="w-full bg-[#1A0F0A]/5 border-none rounded-3xl p-6 outline-none focus:bg-[#1A0F0A]/10 transition-all font-playfair text-[#1A0F0A]"
                                 />
                              </div>
                           </div>

                           <div className="flex gap-4 pt-6">
                              <button 
                                type="button" 
                                onClick={() => setIsModalOpen(false)}
                                className="flex-1 py-6 rounded-full text-[10px] uppercase tracking-widest font-black text-[#1A0F0A]/40 hover:text-[#1A0F0A] transition-all"
                              >
                                 Abort
                              </button>
                              <button 
                                type="submit"
                                className="flex-1 bg-[#1A0F0A] text-white py-6 rounded-full text-[10px] uppercase tracking-widest font-black shadow-xl hover:bg-[#3D4A3A] transition-all"
                              >
                                 Finalize Creation
                              </button>
                           </div>
                        </form>
                     </motion.div>
                  </motion.div>
               )}
            </AnimatePresence>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
