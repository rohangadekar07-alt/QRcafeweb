"use client";
import { useEffect, useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import AdminSidebar from "@/components/AdminSidebar";
import AdminHeader from "@/components/AdminHeader";
import { getAllReservations, cancelReservation } from "@/utils/api";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Calendar, 
  User, 
  Users, 
  Clock, 
  Trash2, 
  Search,
  CheckCircle2,
  XCircle,
  Cake
} from "lucide-react";

export default function ReservationsPage() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isBirthdayOnly, setIsBirthdayOnly] = useState(false);
  const [modal, setModal] = useState({ show: false, type: 'confirm', title: '', message: '', data: null });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await getAllReservations();
      setReservations(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => setModal(p => ({ ...p, show: false }));

  const handleCancelClick = (id) => {
    setModal({
      show: true,
      type: 'confirm',
      title: 'De-list Sanctuary Ritual',
      message: 'Are you certain you wish to remove this rhythmic guest encounter from the sanctuary registry?',
      data: id,
    });
  };

  const executeModalAction = async () => {
    if (modal.type === 'confirm' && modal.data) {
      try {
        await cancelReservation(modal.data);
        await fetchData();
        closeModal();
      } catch (err) {
        setModal({
          show: true,
          type: 'error',
          title: 'Protocol Error',
          message: err.message,
          data: null
        });
      }
    } else {
      closeModal();
    }
  };

  const filtered = reservations.filter(r => {
    const matchesSearch = r.name.toLowerCase().includes(searchTerm.toLowerCase()) || r.tableNumber.toString().includes(searchTerm);
    const actualIsBirthday = r.isBirthday === true || r.tableNumber === "BIRTHDAY";
    const matchesBirthday = isBirthdayOnly ? actualIsBirthday : true;
    return matchesSearch && matchesBirthday;
  });

  return (
    <ProtectedRoute roleNeeded="admin">
      <div className={`min-h-screen flex transition-colors duration-700 ${isBirthdayOnly ? "bg-[#1a0035]" : "bg-[#FDF8F5]"}`}>
        <AdminSidebar />
        
        <div className="flex-1 flex flex-col h-screen overflow-hidden">
          <AdminHeader />
          
          <main className="flex-1 overflow-y-auto p-6 md:p-10 space-y-8 no-scrollbar">
            {/* Header Content */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
              <div className="space-y-1">
                <h2 className={`text-3xl font-playfair font-black transition-colors ${isBirthdayOnly ? "text-white" : "text-[#1A0F0A]"}`}>Booking Registry</h2>
                <p className={`text-[11px] font-medium transition-colors ${isBirthdayOnly ? "text-white/40" : "text-[#1A0F0A]/40"}`}>
                  Monitoring the sanctuary's rhythmic guest encounters.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                {/* Birthday Toggle */}
                <button 
                  onClick={() => setIsBirthdayOnly(!isBirthdayOnly)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all duration-500 shadow-xl ${
                    isBirthdayOnly 
                    ? "bg-pink-500 text-white ring-4 ring-pink-500/20" 
                    : "bg-white text-[#1A0F0A]/40 hover:text-[#1A0F0A] border border-[#1A0F0A]/5"
                  }`}
                >
                  <Cake className={`w-3.5 h-3.5 ${isBirthdayOnly ? "animate-bounce" : ""}`} />
                  {isBirthdayOnly ? "Celebrating Birthdays" : "Show Birthdays Only"}
                </button>

                <div className="relative">
                  <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 ${isBirthdayOnly ? "text-white/20" : "text-[#1A0F0A]/20"}`} />
                  <input 
                    type="text"
                    placeholder="Search by name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={`rounded-2xl pl-11 pr-5 py-3 text-[11px] outline-none transition-all w-56 shadow-sm ${
                      isBirthdayOnly 
                      ? "bg-white/5 border-white/10 text-white placeholder:text-white/10 focus:border-pink-500/50" 
                      : "bg-white border-[#2C1810]/5 text-[#1A0F0A] focus:border-[#D4A373]/30"
                    }`}
                  />
                </div>
              </div>
            </div>

            {/* Reservations List */}
            <div className={`rounded-[30px] shadow-2xl border transition-all duration-500 overflow-hidden ${
              isBirthdayOnly ? "bg-white/5 border-white/10" : "bg-white border-[#2C1810]/5"
            }`}>
               {loading ? (
                 <div className="h-96 flex items-center justify-center">
                    <div className={`w-8 h-8 border-4 border-t-transparent rounded-full animate-spin ${isBirthdayOnly ? "border-pink-500" : "border-[#D4A373]"}`} />
                 </div>
               ) : filtered.length === 0 ? (
                 <div className={`h-80 flex flex-col items-center justify-center space-y-4 opacity-30 ${isBirthdayOnly ? "text-white" : "text-[#1A0F0A]"}`}>
                    <Calendar className="w-10 h-10" />
                    <p className="font-playfair italic text-sm">No rituals found in this quadrant.</p>
                 </div>
               ) : (
                 <div className="overflow-x-auto lg:overflow-visible">
                    <table className="w-full text-left border-collapse min-w-[800px] lg:min-w-0">
                      <thead>
                        <tr className={`border-b transition-colors ${
                          isBirthdayOnly ? "border-white/5 bg-white/5" : "border-[#1A0F0A]/5 bg-[#1A0F0A]/[0.02]"
                        }`}>
                          <th className={`px-6 py-4 text-[9px] uppercase tracking-[0.2em] font-black transition-colors ${isBirthdayOnly ? "text-white/40" : "text-[#1A0F0A]/40"}`}>Guest</th>
                          <th className={`px-6 py-4 text-[9px] uppercase tracking-[0.2em] font-black transition-colors ${isBirthdayOnly ? "text-white/40" : "text-[#1A0F0A]/40"}`}>Sanctuary</th>
                          <th className={`px-6 py-4 text-[9px] uppercase tracking-[0.2em] font-black transition-colors ${isBirthdayOnly ? "text-white/40" : "text-[#1A0F0A]/40"}`}>Timing</th>
                          <th className={`px-6 py-4 text-[9px] uppercase tracking-[0.2em] font-black transition-colors ${isBirthdayOnly ? "text-white/40" : "text-[#1A0F0A]/40"}`}>Ceremony</th>
                          <th className={`px-6 py-4 text-[9px] uppercase tracking-[0.2em] font-black transition-colors ${isBirthdayOnly ? "text-white/40" : "text-[#1A0F0A]/40"} text-right font-inter`}>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <AnimatePresence mode="popLayout">
                          {filtered.map((res, i) => {
                            const isActualBirthday = res.isBirthday === true || res.tableNumber === "BIRTHDAY";
                            return (
                              <motion.tr 
                                key={res._id}
                                layout
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className={`group transition-colors border-b ${
                                  isBirthdayOnly ? "border-white/5 hover:bg-white/5" : "border-[#1A0F0A]/5 hover:bg-[#FDF8F5]"
                                }`}
                              >
                                <td className="px-6 py-4">
                                  <div className="flex items-center gap-3">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-black border transition-all ${
                                      isActualBirthday 
                                      ? 'bg-pink-500 text-white border-pink-400' 
                                      : (isBirthdayOnly ? 'bg-white/10 text-white border-white/10' : 'bg-[#1A0F0A]/5 text-[#1A0F0A] border-transparent')
                                    }`}>
                                      {isActualBirthday ? <Cake className="w-4 h-4" /> : res.name.charAt(0)}
                                    </div>
                                    <div>
                                      <p className={`text-xs font-playfair font-black transition-colors ${isBirthdayOnly ? "text-white" : "text-[#1A0F0A]"}`}>{res.name}</p>
                                      <p className={`text-[8px] uppercase tracking-widest leading-none mt-1 transition-colors ${isBirthdayOnly ? "text-white/20" : "text-[#1A0F0A]/30"}`}>{res.email}</p>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-6 py-4">
                                  <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full transition-all ${
                                    isBirthdayOnly ? "bg-white/10 text-pink-400" : "bg-[#D4A373]/5 text-[#D4A373]"
                                  }`}>P {res.tableNumber}</span>
                                </td>
                                <td className="px-6 py-4">
                                  <div className="space-y-1">
                                    <div className={`flex items-center gap-2 text-[9px] font-bold transition-colors ${isBirthdayOnly ? "text-white/40" : "text-[#1A0F0A]/60"}`}>
                                      <Calendar className="w-3 h-3" /> {new Date(res.date).toLocaleDateString()}
                                    </div>
                                    <div className={`flex items-center gap-2 text-[8px] font-black uppercase tracking-widest transition-colors ${isBirthdayOnly ? "text-pink-400" : "text-[#D4A373]"}`}>
                                      <Clock className="w-3 h-3" /> {res.time}
                                    </div>
                                  </div>
                                </td>
                                <td className="px-6 py-4">
                                  {isActualBirthday ? (
                                    <span className="px-2 py-0.5 rounded-full bg-pink-500/10 text-pink-500 text-[8px] font-black uppercase tracking-[0.1em] flex items-center gap-1.5 w-fit">
                                      <Cake className="w-2.5 h-2.5" /> Ritual Bday
                                    </span>
                                  ) : (
                                    <span className={`text-[8px] font-black uppercase tracking-[0.1em] transition-colors ${isBirthdayOnly ? "text-white/10" : "text-[#1A0F0A]/20"}`}>Regular</span>
                                  )}
                                </td>
                              <td className="px-6 py-4 text-right">
                                <button 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleCancelClick(res._id);
                                  }}
                                  className={`relative z-30 p-3 rounded-xl transition-all duration-300 transform hover:scale-110 active:scale-95 ${
                                    isBirthdayOnly 
                                    ? "text-white/20 hover:text-pink-500 hover:bg-white/10" 
                                    : "text-[#1A0F0A]/30 hover:text-red-500 hover:bg-red-50"
                                  } cursor-pointer`}
                                  title="Cancel Ritual"
                                >
                                  <Trash2 className="w-5 h-5 pointer-events-none" />
                                </button>
                              </td>
                            </motion.tr>
                            );
                          })}
                        </AnimatePresence>
                      </tbody>
                    </table>
                 </div>
               )}
            </div>
          </main>
        </div>

        {/* ── Professional Modal Overlay ── */}
        <AnimatePresence>
          {modal.show && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
              {/* Backdrop */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={closeModal}
                className="absolute inset-0 bg-[#1A0F0A]/60 backdrop-blur-md"
              />
              
              {/* Modal Card */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative w-full max-w-md bg-white rounded-[40px] shadow-2xl overflow-hidden border border-[#1A0F0A]/5"
              >
                <div className="p-10 space-y-6 text-center">
                  <div className={`w-20 h-20 rounded-full mx-auto flex items-center justify-center ${modal.type === 'confirm' ? 'bg-[#D4A373]/10' : 'bg-red-50'}`}>
                    {modal.type === 'confirm' ? (
                      <Trash2 className="w-8 h-8 text-[#D4A373]" />
                    ) : (
                      <XCircle className="w-8 h-8 text-red-500" />
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-2xl font-playfair font-black text-[#1A0F0A]">{modal.title}</h3>
                    <p className="text-sm text-[#1A0F0A]/40 font-medium leading-relaxed">{modal.message}</p>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button 
                      onClick={closeModal}
                      className="flex-1 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest text-[#1A0F0A]/40 hover:text-[#1A0F0A] transition-all"
                    >
                      Dismiss
                    </button>
                    <button 
                      onClick={() => executeModalAction()}
                      className={`flex-1 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest text-white shadow-xl transition-transform active:scale-95 ${modal.type === 'confirm' ? 'bg-[#1A0F0A]' : 'bg-red-500'}`}
                    >
                      {modal.type === 'confirm' ? 'Confirm Action' : 'Acknowledge'}
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </ProtectedRoute>
  );
}
