"use client";
import { Section } from "@/components/Section";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Coffee, MapPin, Phone, Instagram, Facebook, Utensils, Wheat, Sparkles, ChevronUp, ChevronDown, ChevronLeft, ChevronRight, ArrowRight, Cake, Wine, Camera, Flower2, Gift, PartyPopper, Minus, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { createReservation } from "@/utils/api";

const menuItems = {
  coffee: [
    { name: "Bourbon Latte", price: "$12", desc: "House blend with oaky undertones & vanilla cloud foam", img: "/latte.png" },
    { name: "Espresso Roman", price: "$8", desc: "Double shot of single-origin robusta with lemon twist", img: "/espresso.png" },
    { name: "Caramel Velvet", price: "$14", desc: "Slow-drip cold brew with salted artisanal caramel", img: "/coldbrew.png" }
  ],
  culinary: [
    { name: "Wagyu Heritage Burger", price: "$28", desc: "Aged cheddar, caramelized onions, truffle aioli, toasted brioche", img: "/burger.png" },
    { name: "Neapolitan Gold Pizza", price: "$24", desc: "Buffalo mozzarella, San Marzano tomatoes, fresh basil, extra virgin olive oil", img: "/pizza.png" },
    { name: "Mushroom Gruyère Burger", price: "$26", desc: "Sautéed cremini mushrooms, melted swiss, garlic confit", img: "/burger_mushroom.png" }
  ]
};

export default function LandingPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LandingContent />
    </Suspense>
  );
}

function LandingContent() {
  const searchParams = useSearchParams();
  const tableId = searchParams.get("table");
  
  const [activeTab, setActiveTab] = useState("coffee");
  const [activeSection, setActiveSection] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ name: "", text: "" });
  const [activeReviewIndex, setActiveReviewIndex] = useState(0);

  // ─── Reservation Form State ───────────────────────────────────────────────
  const [isBirthday, setIsBirthday] = useState(false);
  const [resForm, setResForm] = useState({ name: "", email: "", tableNumber: "T1", date: "", time: "07:00 PM", partySize: 2, isBirthday: false });
  const [resStatus, setResStatus] = useState(null); // null | 'loading' | 'success' | 'conflict' | 'error'
  const [resMessage, setResMessage] = useState("");
  const [openDropdown, setOpenDropdown] = useState(null); // null | 'time' | 'table'

  const handleReservation = async (e) => {
    e.preventDefault();
    setResStatus("loading");
    setResMessage("");
    try {
      // Force sync current birthday state to form payload
      const finalPayload = { ...resForm, isBirthday: isBirthday };
      await createReservation(finalPayload);
      setResStatus("success");
      setResMessage("Your reservation is confirmed! See you soon.");
      setResForm({ name: "", email: "", tableNumber: "T1", date: "", time: "07:00 PM", partySize: 2 });
    } catch (err) {
      if (err.conflict) {
        setResStatus("conflict");
      } else {
        setResStatus("error");
      }
      setResMessage(err.message || "Something went wrong. Please try again.");
    }
  };

  const nextReview = () => {
    setActiveReviewIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setActiveReviewIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const submitReview = () => {
    if (newReview.name && newReview.text) {
      setReviews([{ ...newReview, role: "Community Member" }, ...reviews]);
      setNewReview({ name: "", text: "" });
      setActiveReviewIndex(0);
    }
  };
  
  // Dynamic Navbar logic for scroll tracking and section detection
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);

    const sections = ["home", "story", "culinary", "menu", "gallery", "contact", "reviews"];
    const observerOptions = {
        root: null,
        rootMargin: '-40% 0px -40% 0px', 
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setActiveSection(entry.target.id);
            }
        });
    }, observerOptions);

    sections.forEach(id => {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
    });

    const handleClickOutside = (e) => {
      if (!e.target.closest('.relative')) {
        setOpenDropdown(null);
      }
    };
    window.addEventListener("click", handleClickOutside);

    return () => {
        window.removeEventListener("scroll", handleScroll);
        window.removeEventListener("click", handleClickOutside);
        observer.disconnect();
    };
  }, [openDropdown]);

  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 1.1]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  return (
    <main className="relative w-full min-h-screen bg-[#FDF8F5] text-[#2C1810] overflow-x-hidden">
      {/* Dynamic Navbar */}
      <nav className={`fixed top-0 w-full z-[100] px-6 py-5 md:px-12 flex justify-between items-center gap-12 transition-all duration-700 ${
        isScrolled 
          ? "bg-[#FDF8F5]/40 backdrop-blur-3xl border-b border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.05)]" 
          : "bg-transparent border-transparent"
      }`}>
        <div className="flex items-center gap-3 cursor-pointer group" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
          <Sparkles className="text-[#D4A373] w-5 h-5 group-hover:rotate-180 transition-transform duration-1000" />
          <div className="text-xl md:text-2xl font-playfair font-black tracking-tighter text-[#2C1810]">
            BREWED<span className="text-[#3D4A3A]">CRAFT</span>
          </div>
        </div>
        
        <div className="hidden lg:flex gap-12 text-[10px] uppercase tracking-[0.4em] font-black">
          {[
            { id: "home", label: "The Atelier" },
            { id: "story", label: "Our Story" },
            { id: "culinary", label: "Gastronomy" },
            { id: "menu", label: "The Library" },
            { id: "gallery", label: "Sanctuary" }
          ].map((nav) => (
            <a 
              key={nav.id} 
              href={`#${nav.id}`} 
              className={`relative transition-all duration-500 group ${activeSection === nav.id ? "text-[#D4A373]" : "hover:text-[#3D4A3A]"}`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(nav.id)?.scrollIntoView({ behavior: 'smooth' });
                setActiveSection(nav.id);
              }}
            >
              {nav.label}
              <span className={`absolute -bottom-2 left-1/2 -translate-x-1/2 h-[2px] bg-[#D4A373] transition-all duration-500 ${activeSection === nav.id ? "w-full" : "w-0 group-hover:w-full"}`} />
            </a>
          ))}
        </div>

        <div className="flex gap-4 items-center">
           <button 
             onClick={() => document.getElementById('reviews')?.scrollIntoView({ behavior: 'smooth' })}
             className={`hidden lg:block text-[10px] uppercase tracking-[0.4em] font-black group px-2 py-1 relative transition-all duration-500 ${activeSection === "reviews" ? "text-[#D4A373]" : "text-[#2C1810]"}`}
           >
             <div className="flex items-center gap-2">
               <div className={`w-1 h-1 bg-[#D4A373] rounded-full transition-all duration-700 ${activeSection === "reviews" ? "scale-100 opacity-100 animate-pulse shadow-[0_0_8px_#D4A373]" : "scale-0 opacity-0"}`} />
               <span className={`font-black transition-all duration-500 ${activeSection !== "reviews" ? "group-hover:text-[#3D4A3A]" : ""}`}>Journal</span>
             </div>
             <span className={`absolute -bottom-2 left-1/2 -translate-x-1/2 h-[2px] bg-[#D4A373] transition-all duration-500 ${activeSection === "reviews" ? "w-full" : "w-0 group-hover:w-full"}`} />
           </button>
           <button 
             onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
             className="hidden lg:block bg-[#2C1810] text-[#FDF8F5] px-8 py-3 rounded-full text-[10px] uppercase tracking-[0.2em] font-black hover:bg-[#3D4A3A] hover:scale-105 active:scale-95 transition-all duration-500 shadow-xl"
           >
             Book a Table
           </button>
           {/* Mobile Menu Toggle */}
           <button 
             onClick={() => setIsMenuOpen(!isMenuOpen)}
             className="lg:hidden p-3 bg-[#2C1810] text-[#FDF8F5] rounded-full shadow-xl hover:bg-[#3D4A3A] transition-all"
           >
             <div className="flex flex-col gap-1.5 w-5">
               <span className={`block h-[1px] w-full bg-white transition-all duration-500 ${isMenuOpen ? "rotate-45 translate-y-2" : ""}`} />
               <span className={`block h-[1px] w-full bg-white transition-all duration-500 ${isMenuOpen ? "opacity-0" : ""}`} />
               <span className={`block h-[1px] w-full bg-white transition-all duration-500 ${isMenuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
             </div>
           </button>
        </div>
      </nav>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[60] bg-[#1A0F0A] flex flex-col items-center justify-center space-y-12 text-center"
          >
            <button 
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-8 right-8 text-[#FDF8F5]/40 hover:text-white uppercase tracking-widest text-[10px] flex gap-2 items-center"
            >
              Close <div className="w-8 h-[1px] bg-[#FDF8F5]/20" />
            </button>

            <div className="space-y-4">
              <Sparkles className="text-[#D4A373] w-8 h-8 mx-auto" />
              <h2 className="text-4xl font-playfair font-black text-[#FDF8F5]">BREWEDCRAFT</h2>
            </div>

            <div className="flex flex-col space-y-8">
              {[
                { id: "home", label: "The Atelier" },
                { id: "story", label: "Our Story" },
                { id: "culinary", label: "Gastronomy" },
                { id: "menu", label: "The Library" },
                { id: "gallery", label: "Sanctuary" },
                { id: "reviews", label: "Journal" }
              ].map((nav) => (
                <a 
                  key={nav.id}
                  href={`#${nav.id}`}
                  className="text-2xl font-playfair text-[#FDF8F5] hover:text-[#D4A373] transition-all"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsMenuOpen(false);
                    document.getElementById(nav.id)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  {nav.label}
                </a>
              ))}
            </div>

            <div className="w-full px-12 pt-12 border-t border-white/5 space-y-6">
              <button 
                onClick={() => {
                   setIsMenuOpen(false);
                   document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full bg-[#D4A373] text-[#1A0F0A] py-5 rounded-full font-black uppercase tracking-widest text-[10px] shadow-2xl"
              >
                Book a Table
              </button>
              <div className="flex justify-center gap-10 opacity-40">
                <Instagram className="w-5 h-5 text-white" />
                <Facebook className="w-5 h-5 text-white" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Re-imagined Hero Section */}
      <section id="home" className="h-[110vh] relative overflow-hidden flex items-center justify-center px-6 md:px-12">
        <motion.div style={{ scale, opacity: heroOpacity }} className="absolute inset-0 z-0">
          <Image 
            src="/hero.png" 
            alt="Cinematic cafe interior" 
            fill
            className="object-cover brightness-[0.5] sepia-[0.1]"
            priority
          />
        </motion.div>

        {/* ── Animated Smoke Rising from Coffee Cup ── */}
        <div className="smoke-container">
          <motion.div style={{ opacity: heroOpacity }} className="relative w-full h-full">
            {/* Wisp A — drifts left */}
            <span style={{
              position: 'absolute', bottom: 0, left: '50%',
              width: '18px', height: '18px', borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(255,255,255,0.80) 0%, rgba(220,210,200,0.4) 50%, transparent 80%)',
              filter: 'blur(5px)',
              animation: 'smokeA 3.2s ease-out infinite',
            }} />
            {/* Wisp B — drifts right */}
            <span style={{
              position: 'absolute', bottom: 0, left: '50%',
              width: '22px', height: '22px', borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(255,255,255,0.75) 0%, rgba(230,215,200,0.35) 50%, transparent 80%)',
              filter: 'blur(7px)',
              animation: 'smokeB 3.8s ease-out 0.7s infinite',
            }} />
            {/* Wisp C — center, tallest */}
            <span style={{
              position: 'absolute', bottom: 0, left: '50%',
              width: '28px', height: '28px', borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(255,255,255,0.70) 0%, rgba(215,205,195,0.30) 50%, transparent 80%)',
              filter: 'blur(9px)',
              animation: 'smokeC 4.4s ease-out 1.4s infinite',
            }} />
            {/* Wisp D — wide airy puff */}
            <span style={{
              position: 'absolute', bottom: 0, left: '50%',
              width: '34px', height: '34px', borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(255,255,255,0.55) 0%, rgba(210,200,190,0.22) 50%, transparent 80%)',
              filter: 'blur(13px)',
              animation: 'smokeD 5.0s ease-out 2.1s infinite',
            }} />
            {/* Wisp E — thin quick wisp */}
            <span style={{
              position: 'absolute', bottom: 0, left: '50%',
              width: '14px', height: '14px', borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(255,255,255,0.85) 0%, rgba(240,230,220,0.40) 50%, transparent 80%)',
              filter: 'blur(4px)',
              animation: 'smokeE 2.8s ease-out 0.3s infinite',
            }} />
            {/* Wisp F — slow big cloud */}
            <span style={{
              position: 'absolute', bottom: 0, left: '50%',
              width: '40px', height: '40px', borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(255,255,255,0.45) 0%, rgba(200,195,185,0.18) 50%, transparent 80%)',
              filter: 'blur(16px)',
              animation: 'smokeF 6.0s ease-out 3.0s infinite',
            }} />
          </motion.div>
        </div>
        
        <div className="relative z-10 text-center text-[#FDF8F5] space-y-12 max-w-5xl">
          <motion.h1 
            initial={{ opacity: 0, y: 30, letterSpacing: "-0.02em" }}
            animate={{ opacity: 1, y: 0, letterSpacing: "0.02em" }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-6xl lg:text-[5rem] font-playfair leading-[1.1] font-bold"
          >
            Gourmet Artistry, <br/> 
            <span className="italic font-light text-[#D4A373] opacity-90">Artisanal Brews.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-base md:text-xl font-normal max-w-2xl mx-auto opacity-90 leading-relaxed font-playfair italic"
          >
            Experience a symphony of specialized roasting and handcrafted cuisine. <br className="hidden lg:block" /> A 5-star haven where world-class plates meet the perfect pour.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
            className="flex flex-col md:flex-row gap-5 md:gap-8 justify-center pt-8 md:pt-12"
          >
            <Link href={`/menu${tableId ? `?table=${tableId}` : ""}`} className="bg-[#D4A373] text-[#1A0F0A] px-8 md:px-12 py-4 md:py-5 rounded-full font-black uppercase tracking-widest text-[9px] md:text-[10px] hover:bg-[#FDF8F5] transition-all duration-700 shadow-2xl group flex items-center justify-center gap-2">
              Order Now <Sparkles className="w-3 h-3 group-hover:rotate-45 transition-transform" />
            </Link>
            <button className="bg-[#3D4A3A] text-[#FDF8F5] px-8 md:px-12 py-4 md:py-5 rounded-full font-black uppercase tracking-widest text-[9px] md:text-[10px] hover:bg-[#FDF8F5] hover:text-[#3D4A3A] transition-all duration-700 shadow-2xl">
              Taste The Kitchen
            </button>
          </motion.div>
        </div>


      </section>

      {/* Our Story Section */}
      <Section id="story" className="bg-[#1A0F0A] text-[#FDF8F5] !py-24 md:!py-32 overflow-hidden relative">
         {/* Decorative Element */}
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#3D4A3A] rounded-full blur-[160px] opacity-[0.05] pointer-events-none" />
         
         <div className="relative z-10 max-w-7xl mx-auto space-y-24 px-4 md:px-0">
            {/* Story Header */}
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
               <div className="lg:col-span-6 space-y-8 md:space-y-10">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="space-y-6"
                  >
                     <span className="text-[#D4A373] uppercase tracking-[0.4em] text-[10px] md:text-[11px] font-black">Since 1994</span>
                     <h2 className="text-5xl md:text-7xl lg:text-9xl font-playfair leading-[1] text-[#FDF8F5]">Crafting <br /> <span className="italic font-light text-[#D4A373]">Heritage.</span></h2>
                     <p className="text-base md:text-lg lg:text-xl opacity-60 font-light leading-relaxed font-playfair italic max-w-xl">
                        What began as a single sack of beans in a small London atelier has evolved into a global sanctuary for the culinary avant-garde.
                     </p>
                  </motion.div>
                  <p className="opacity-40 text-sm md:text-base leading-relaxed max-w-lg">
                     At Brewed Craft, we don't just serve dishes; we curate memories. Our journey is defined by a relentless obsession with microscopic precision—from the exact altitude of our coffee beans to the 24-hour fermentation of our artisan sourdough.
                  </p>
               </div>
               
               <div className="lg:col-span-6 grid grid-cols-2 gap-3 md:gap-6">
                  <div className="space-y-4 md:space-y-6 pt-8 md:pt-12">
                     <div className="h-48 md:h-80 relative rounded-2xl md:rounded-3xl overflow-hidden border border-white/5 group shadow-2xl">
                        <Image src="/interior.png" fill alt="Our Atelier" className="object-cover group-hover:scale-110 transition-transform duration-1000" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#1A0F0A]/60 to-transparent" />
                     </div>
                     <div className="bg-white/5 p-5 md:p-10 rounded-2xl md:rounded-3xl border border-white/5 space-y-3 md:space-y-4 hover:bg-white/10 transition-all">
                        <h4 className="text-3xl md:text-5xl font-playfair font-bold text-[#D4A373]">50+</h4>
                        <p className="text-[9px] md:text-[11px] uppercase tracking-widest opacity-40 font-bold">Regional Roast Variations <br/> Curated Yearly</p>
                     </div>
                  </div>
                  <div className="space-y-4 md:space-y-6">
                     <div className="bg-white/5 p-5 md:p-10 rounded-2xl md:rounded-3xl border border-white/5 space-y-3 md:space-y-4 hover:bg-white/10 transition-all">
                        <h4 className="text-3xl md:text-5xl font-playfair font-bold text-[#3D4A3A]">12</h4>
                        <p className="text-[9px] md:text-[11px] uppercase tracking-widest opacity-40 font-bold">Michelin Trained Chefs <br/> in our Collective</p>
                     </div>
                     <div className="h-48 md:h-80 relative rounded-2xl md:rounded-3xl overflow-hidden border border-white/5 group shadow-2xl">
                        <Image src="/pastry.png" fill alt="Our Kitchen" className="object-cover group-hover:scale-110 transition-transform duration-1000" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#1A0F0A]/60 to-transparent" />
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </Section>

      {/* Culinary Excellence Section */}
      <Section id="culinary" className="bg-[#FDF8F5] overflow-hidden relative">
         {/* Highly Visible Fluid Silk Background Design */}
         <div className="absolute inset-0 pointer-events-none select-none z-0">
            {/* Main Top Swirl - High Visibility */}
            <div className="absolute -top-1/4 -right-1/4 w-[120%] h-[120%] bg-gradient-to-bl from-[#D4A373]/30 via-[#C28A5E]/40 to-transparent rounded-full blur-[140px] opacity-100" />
            
            {/* Deep Silk Flow Line 1 */}
            <svg className="absolute top-1/2 left-0 w-full h-full opacity-60 text-[#D4A373]" viewBox="0 0 1440 800" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path d="M-100 200C200 400 600 100 900 300C1200 500 1600 200 1800 400" stroke="currentColor" strokeWidth="180" strokeLinecap="round" className="blur-[120px]" />
            </svg>

            {/* Deep Silk Flow Line 2 */}
            <svg className="absolute -bottom-1/4 -left-1/4 w-full h-full opacity-50 text-[#C28A5E]" viewBox="0 0 1440 800" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path d="M1600 600C1300 400 900 700 600 500C300 300 -100 600 -300 400" stroke="currentColor" strokeWidth="220" strokeLinecap="round" className="blur-[160px]" />
            </svg>

            {/* Glowing Accent Point */}
            <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-[#D4A373]/20 rounded-full blur-[120px] opacity-100" />
         </div>

         <div className="grid lg:grid-cols-2 gap-20 items-center relative z-10">
          <div className="relative group">
             <motion.div 
               whileHover={{ scale: 0.98 }}
               className="relative h-[360px] md:h-[560px] lg:h-[700px] w-full rounded-[30px] md:rounded-[60px] overflow-hidden shadow-2xl"
             >
                <Image src="/gourmet.png" alt="Culinary Art" fill className="object-cover transition-transform duration-1000 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#3D4A3A]/80 to-transparent flex items-end p-12">
                   <div className="text-[#FDF8F5] space-y-4">
                      <h3 className="text-4xl font-playfair">The Truffle Series</h3>
                      <p className="opacity-80 text-sm italic">Sourced directly from the Piedmont region, curated for your morning ritual.</p>
                   </div>
                </div>
             </motion.div>
             {/* Floating Accent */}
             <motion.div 
               animate={{ y: [0, -20, 0] }}
               transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
               className="absolute -top-10 -right-10 bg-[#D4A373] p-10 rounded-full shadow-2xl hidden md:block"
             >
                <Utensils className="text-[#1A0F0A] w-8 h-8" />
             </motion.div>
          </div>

          <div className="space-y-8 md:space-y-12 pl-0 md:pl-6">
             <div className="space-y-6">
                <span className="text-[#3D4A3A] uppercase tracking-[0.4em] text-[10px] font-black">Gastronomy Redefined</span>
                <h2 className="text-5xl md:text-7xl lg:text-8xl font-playfair leading-[0.9]">Beyond The <br/> <span className="text-[#3D4A3A]">Standard.</span></h2>
                <div className="w-24 h-[2px] bg-[#3D4A3A]" />
             </div>
             
             <p className="text-xl leading-relaxed text-[#2C1810]/70 font-light max-w-lg">
                At Brewed Craft, we believe the plate is as important as the cup. Our kitchen operates with the same microscopic precision as our roastery—elevating humble ingredients into 5-star culinary moments.
             </p>

             <div className="grid sm:grid-cols-2 gap-10 pt-6">
                <div className="space-y-4 p-6 bg-white rounded-3xl shadow-sm border border-[#D4A373]/10">
                   <Wheat className="text-[#3D4A3A] w-6 h-6" />
                   <h4 className="font-bold uppercase tracking-widest text-[10px]">Artisanal Grains</h4>
                   <p className="text-xs opacity-60 italic">Stone-milled flours for our 24-hour fermented sourdough.</p>
                </div>
                <div className="space-y-4 p-6 bg-white rounded-3xl shadow-sm border border-[#D4A373]/10">
                   <Utensils className="text-[#D4A373] w-6 h-6" />
                   <h4 className="font-bold uppercase tracking-widest text-[10px]">Chef's Table</h4>
                   <p className="text-xs opacity-60 italic">Experimental monthly menus that challenge the palate.</p>
                </div>
             </div>
          </div>
        </div>
      </Section>

      {/* The Library (Integrated Menu) */}
      <Section id="menu" className="bg-[#1A0F0A] text-[#FDF8F5] !py-32 !pt-16">
         <div className="max-w-4xl mx-auto text-center space-y-10 mb-12 md:mb-24">
            <div className="inline-flex bg-white/5 p-1.5 rounded-full border border-white/10 max-w-full overflow-x-auto">
               <button 
                 onClick={() => setActiveTab("coffee")}
                 className={`px-6 md:px-10 py-3 rounded-full text-[10px] uppercase tracking-[0.2em] font-bold transition-all whitespace-nowrap ${activeTab === "coffee" ? "bg-[#D4A373] text-[#1A0F0A]" : "text-white/40 hover:text-white"}`}
               >
                 The Roastery
               </button>
               <button 
                 onClick={() => setActiveTab("culinary")}
                 className={`px-6 md:px-10 py-3 rounded-full text-[10px] uppercase tracking-[0.2em] font-bold transition-all whitespace-nowrap ${activeTab === "culinary" ? "bg-[#3D4A3A] text-[#FDF8F5]" : "text-white/40 hover:text-white"}`}
               >
                 The Kitchen
               </button>
            </div>
            <h2 className="text-4xl md:text-6xl lg:text-8xl font-playfair tracking-tighter">The Library of Taste</h2>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <AnimatePresence>
               {menuItems[activeTab].map((item, idx) => (
                 <motion.div 
                   key={item.name}
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   exit={{ opacity: 0, y: -20 }}
                   transition={{ duration: 0.5, delay: idx * 0.1 }}
                   className="group relative bg-[#2C1810]/30 border border-white/5 p-6 md:p-10 rounded-[24px] md:rounded-[40px] hover:bg-[#2C1810]/50 transition-all duration-700"
                 >
                    <div className="absolute top-6 right-6 md:top-10 md:right-10 text-[#D4A373] text-xl font-playfair">{item.price}</div>
                    <div className="h-36 md:h-40 w-full relative mb-6 md:mb-10 overflow-hidden rounded-xl md:rounded-2xl border border-[#D4A373]/20">
                       <Image src={item.img} alt={item.name} fill className="object-cover group-hover:scale-110 transition-all duration-1000" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-playfair mb-3 md:mb-4 group-hover:text-[#D4A373] transition-colors">{item.name}</h3>
                    <p className="text-sm opacity-40 font-light leading-relaxed">{item.desc}</p>
                    <button className="mt-6 md:mt-8 opacity-0 group-hover:opacity-100 transition-all text-[9px] uppercase tracking-[0.3em] text-[#D4A373] flex items-center gap-2">
                       Detail <Sparkles className="w-3 h-3" />
                    </button>
                 </motion.div>
               ))}
            </AnimatePresence>
         </div>
      </Section>

      {/* The Visual Sanctuary (Horizontal Section) */}
      <section id="gallery" className="py-10 md:py-32 bg-[#FDF8F5] overflow-hidden">
         <div className="flex w-max animate-infinite-scroll hover:[animation-play-state:paused] group">
            {[...Array(2)].map((_, arrayIndex) => (
               <div key={arrayIndex} className="flex gap-4 md:gap-8 px-2 md:px-4" aria-hidden={arrayIndex === 1 ? "true" : "false"}>
                  {["/burger_bbq.png", "/pizza_truffle.png", "/pastry.png", "/interior.png", "/gelato_pistachio.png", "/juice.png"].map((src, i) => (
                     <div key={i} className="flex-shrink-0 w-[200px] md:w-[400px] h-[250px] md:h-[500px] relative rounded-[20px] md:rounded-[50px] overflow-hidden transition-all duration-1000 shadow-xl border border-[#D4A373]/10">
                        <Image src={src} alt="Gallery" fill className="object-cover" />
                     </div>
                  ))}
               </div>
            ))}
         </div>
      </section>


      {/* ── Reservation / Birthday Section ── */}
      <motion.section
        id="contact"
        animate={{
          backgroundColor: isBirthday ? "#1a0030" : "#3D4A3A",
        }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="relative w-full text-[#FDF8F5] py-12 md:py-32 px-4 md:px-12 lg:px-24 overflow-hidden"
      >
        {/* ── Birthday floating emojis ── */}
        <AnimatePresence>
          {isBirthday && ["🎂","🎉","🎈","✨","🥂","🎊","🎁","🕯️"].map((em, i) => (
            <motion.span
              key={em + i}
              initial={{ opacity: 0, y: 80, x: Math.random() * 100 - 50 }}
              animate={{ opacity: [0, 1, 0.8, 0], y: -200, x: (i % 2 === 0 ? 40 : -40) }}
              transition={{ duration: 4 + i * 0.4, repeat: Infinity, delay: i * 0.6, ease: "easeOut" }}
              style={{ left: `${8 + i * 11}%`, bottom: "5%" }}
              className="absolute text-3xl md:text-4xl pointer-events-none select-none z-0"
            >
              {em}
            </motion.span>
          ))}
        </AnimatePresence>

        {/* ── Glowing birthday orbs ── */}
        {isBirthday && (
          <>
            <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full blur-[160px] opacity-30 pointer-events-none" style={{ background: "radial-gradient(circle, #ff6eb4, transparent)" }} />
            <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full blur-[140px] opacity-25 pointer-events-none" style={{ background: "radial-gradient(circle, #a855f7, transparent)" }} />
          </>
        )}

        <div className="w-full max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 lg:gap-32 items-center relative z-10">

          {/* ── LEFT: Dynamic text ── */}
          <div className="space-y-8 md:space-y-12 text-center lg:text-left">
            <AnimatePresence mode="wait">
              {isBirthday ? (
                <motion.div
                  key="birthday-text"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -24 }}
                  transition={{ duration: 0.6 }}
                  className="space-y-6"
                >
                  <span className="text-pink-400 uppercase tracking-[0.4em] text-[10px] md:text-[12px] font-black">🎂 Birthday Celebration</span>
                  <h2 className="text-5xl md:text-7xl lg:text-8xl font-playfair leading-[1.0]">
                    Make It A <br className="hidden md:block" />
                    <span className="italic font-normal" style={{ color: "#f472b6" }}>Night To Remember.</span>
                  </h2>
                  <p className="text-base md:text-xl opacity-70 font-playfair italic leading-relaxed max-w-md mx-auto lg:mx-0">
                    Let us craft an unforgettable birthday experience — from a candlelit table adorned with roses to a bespoke celebration cake baked by our Michelin-trained pâtissier.
                  </p>
                  <div className="space-y-4 pt-4">
                    {[
                      { Icon: Flower2,     text: "Personalized table décor & floral arrangement", delay: 0.1 },
                      { Icon: Cake,        text: "Custom celebration cake from our artisan kitchen", delay: 0.2 },
                      { Icon: Wine,        text: "Complimentary welcome sparkling on arrival",       delay: 0.3 },
                      { Icon: Camera,      text: "Dedicated photography corner setup",               delay: 0.4 },
                    ].map(({ Icon, text, delay }) => (
                      <motion.div
                        key={text}
                        initial={{ opacity: 0, x: -16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay }}
                        className="flex items-center gap-4 text-sm"
                      >
                        <div
                          className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                          style={{ background: "rgba(244,114,182,0.15)", border: "1px solid rgba(244,114,182,0.2)" }}
                        >
                          <Icon className="w-4 h-4" style={{ color: "#f472b6" }} />
                        </div>
                        <span className="font-light opacity-80">{text}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="regular-text"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -24 }}
                  transition={{ duration: 0.6 }}
                  className="space-y-4 md:space-y-6"
                >
                  <span className="text-[#D4A373] uppercase tracking-[0.4em] text-[10px] md:text-[12px] font-black">Private Experience</span>
                  <h2 className="text-5xl md:text-7xl lg:text-8xl font-playfair leading-[1.1] md:leading-[0.9]">
                    Reserve Your <br className="hidden md:block" />
                    Seat at <span className="italic font-normal text-[#D4A373]">The Table.</span>
                  </h2>
                  <div className="flex items-center gap-6 md:gap-10 justify-center lg:justify-start pt-4">
                    <div className="w-12 md:w-16 h-[1px] bg-white/20" />
                    <p className="opacity-60 text-[9px] md:text-[10px] uppercase tracking-[0.3em]">London • Paris • Tokyo • Mumbai</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ── RIGHT: Form card ── */}

          <motion.div
            animate={{
              borderColor: isBirthday ? "rgba(244,114,182,0.25)" : "rgba(255,255,255,0.05)",
              background: isBirthday ? "#2d0050" : "#1A0F0A",
            }}
            transition={{ duration: 0.8 }}
            className="p-6 md:p-16 rounded-[30px] md:rounded-[60px] shadow-3xl relative overflow-hidden group border"
          >
            {/* Shimmer on birthday */}
            {isBirthday && (
              <motion.div
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
                className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-[-20deg] pointer-events-none z-0"
              />
            )}

            <div className="relative z-10 space-y-8 md:space-y-10">

              {/* Card header — clean, no clutter */}
              <div className="space-y-2">
                <AnimatePresence mode="wait">
                  {isBirthday ? (
                    <motion.h3
                      key="bday-title"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-2xl md:text-3xl font-playfair flex items-center gap-3"
                      style={{ color: "#f472b6" }}
                    >
                      <Cake className="w-7 h-7" style={{ color: "#f472b6" }} />
                      Birthday Table
                    </motion.h3>
                  ) : (
                    <motion.h3
                      key="reg-title"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-2xl md:text-3xl font-playfair"
                    >
                      Global Reservations
                    </motion.h3>
                  )}
                </AnimatePresence>
                <p className="text-xs opacity-50 font-light lowercase font-playfair">
                  {isBirthday ? "reserve your special celebration table" : "curate your bespoke dining journey"}
                </p>
              </div>

              {/* ── Professional Birthday Toggle — full-width row ── */}
              <motion.button
                onClick={() => {
                  setIsBirthday(b => !b);
                  setResForm(p => ({ ...p, isBirthday: !isBirthday }));
                }}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                animate={{
                  borderColor: isBirthday ? "rgba(244,114,182,0.5)" : "rgba(255,255,255,0.10)",
                }}
                transition={{ duration: 0.4 }}
                className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl border cursor-pointer relative overflow-hidden text-left"
                style={{
                  background: isBirthday
                    ? "linear-gradient(135deg,rgba(236,72,153,0.14),rgba(168,85,247,0.14))"
                    : "rgba(255,255,255,0.04)",
                  boxShadow: isBirthday
                    ? "0 0 28px rgba(244,114,182,0.20), inset 0 0 16px rgba(168,85,247,0.08)"
                    : "none",
                }}
              >
                {/* shimmer sweep when ON */}
                {isBirthday && (
                  <motion.div
                    animate={{ x: ["-120%", "220%"] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear", repeatDelay: 2.5 }}
                    className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/[0.06] to-transparent skew-x-[-15deg] pointer-events-none"
                  />
                )}

                {/* icon */}
                <motion.div
                  animate={{ rotate: isBirthday ? [0, -12, 12, -6, 0] : 0, scale: isBirthday ? 1.1 : 1 }}
                  transition={{ duration: 0.55 }}
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-400"
                  style={{
                    background: isBirthday
                      ? "linear-gradient(135deg,#ec4899,#a855f7)"
                      : "rgba(255,255,255,0.08)",
                    boxShadow: isBirthday ? "0 4px 16px rgba(244,114,182,0.4)" : "none",
                  }}
                >
                  <Cake className="w-5 h-5" style={{ color: isBirthday ? "white" : "rgba(255,255,255,0.4)" }} />
                </motion.div>

                {/* label */}
                <div className="flex-1 min-w-0">
                  <p
                    className="text-[11px] font-black uppercase tracking-[0.18em] leading-none"
                    style={{ color: isBirthday ? "#f472b6" : "rgba(255,255,255,0.60)" }}
                  >
                    Birthday Celebration
                  </p>
                  <p
                    className="text-[10px] mt-1 leading-tight font-light"
                    style={{ color: isBirthday ? "rgba(244,114,182,0.65)" : "rgba(255,255,255,0.25)" }}
                  >
                    {isBirthday
                      ? "Celebration active — package included"
                      : "Reserve our one-of-a-kind birthday table"}
                  </p>
                </div>

                {/* switch */}
                <div
                  className="relative w-12 h-6 rounded-full flex-shrink-0 transition-all duration-500"
                  style={{
                    background: isBirthday
                      ? "linear-gradient(135deg,#ec4899,#a855f7)"
                      : "rgba(255,255,255,0.12)",
                    boxShadow: isBirthday ? "0 0 14px rgba(244,114,182,0.55)" : "none",
                  }}
                >
                  <motion.div
                    animate={{ x: isBirthday ? 24 : 2 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    className="absolute top-[3px] w-[18px] h-[18px] rounded-full shadow-lg flex items-center justify-center"
                    style={{ background: "white" }}
                  >
                    {isBirthday && (
                      <PartyPopper className="w-2.5 h-2.5" style={{ color: "#ec4899" }} />
                    )}
                  </motion.div>
                </div>
              </motion.button>

              {/* Birthday package badge */}
              <AnimatePresence>
                {isBirthday && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="grid grid-cols-2 gap-3"
                  >
                    {[
                      { Icon: Flower2,     label: "Table Décor" },
                      { Icon: Cake,        label: "Celebration Cake" },
                      { Icon: Wine,        label: "Welcome Sparkling" },
                      { Icon: Camera,      label: "Photo Corner" },
                    ].map(({ Icon, label }) => (
                      <div
                        key={label}
                        className="flex items-center gap-3 rounded-xl p-3 border"
                        style={{ background: "rgba(244,114,182,0.07)", borderColor: "rgba(244,114,182,0.2)" }}
                      >
                        <div
                          className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                          style={{ background: "rgba(244,114,182,0.15)" }}
                        >
                          <Icon className="w-3.5 h-3.5" style={{ color: "#f472b6" }} />
                        </div>
                        <p className="text-[10px] font-bold tracking-wide" style={{ color: "rgba(244,114,182,0.85)" }}>
                          {label}
                        </p>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Status banners */}
              {resStatus === "success" && (
                <div className="flex items-center gap-3 bg-green-500/10 border border-green-500/20 rounded-2xl p-4">
                  <Sparkles className="w-4 h-4 text-green-400 shrink-0" />
                  <p className="text-xs text-green-400 font-bold tracking-wide">{resMessage}</p>
                </div>
              )}
              {(resStatus === "conflict" || resStatus === "error") && (
                <div className="flex items-start gap-3 bg-red-500/10 border border-red-500/20 rounded-2xl p-4">
                  <span className="text-red-400 text-lg leading-none shrink-0">⚠</span>
                  <p className="text-xs text-red-400 font-bold tracking-wide leading-relaxed">{resMessage}</p>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleReservation} className="space-y-8 md:space-y-10">

                {/* The birthday person's name label changes */}
                <div className="space-y-3">
                  <label className="text-[9px] uppercase tracking-widest opacity-40 font-bold">
                    {isBirthday ? "Birthday Person's Name 🎂" : "Full Name"}
                  </label>
                  <input
                    required
                    type="text"
                    placeholder={isBirthday ? "THE STAR OF THE NIGHT" : "JOHN DOE"}
                    value={resForm.name}
                    onChange={(e) => setResForm(p => ({ ...p, name: e.target.value }))}
                    className="w-full bg-transparent border-b py-3 md:py-4 outline-none transition-all placeholder:text-white/20 text-sm md:text-base uppercase focus:border-[#D4A373] active:border-[#D4A373]"
                    style={{
                      borderColor: isBirthday ? "rgba(244,114,182,0.3)" : "rgba(255,255,255,0.1)",
                    }}
                  />
                </div>

                {/* Date — always shown. In birthday mode: full-width only field */}
                {isBirthday ? (
                  <div className="space-y-3">
                    <label className="text-[9px] uppercase tracking-widest opacity-40 font-bold">
                      🎂 Birthday Date
                    </label>
                    <input
                      required
                      type="date"
                      value={resForm.date}
                      min={new Date().toISOString().split('T')[0]}
                      onChange={(e) => setResForm(p => ({ ...p, date: e.target.value, tableNumber: "BIRTHDAY", time: "19:00" }))}
                      className="w-full bg-transparent border-b py-3 md:py-4 outline-none transition-all text-sm md:text-base [color-scheme:dark]"
                      style={{ borderColor: "rgba(244,114,182,0.3)" }}
                    />
                    {/* Hidden info tag */}
                    <p className="text-[10px]" style={{ color: "rgba(244,114,182,0.5)" }}>
                      Our dedicated birthday table will be reserved for the full evening.
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="grid md:grid-cols-2 gap-8 md:gap-10">
                      <div className="space-y-3">
                        <label className="text-[9px] uppercase tracking-widest opacity-40 font-bold">Date of Visit</label>
                        <input
                          required
                          type="date"
                          value={resForm.date}
                          min={new Date().toISOString().split('T')[0]}
                          onChange={(e) => setResForm(p => ({ ...p, date: e.target.value }))}
                          className="w-full bg-transparent border-b py-3 md:py-4 outline-none transition-all text-sm md:text-base [color-scheme:dark]"
                          style={{ borderColor: "rgba(255,255,255,0.1)" }}
                        />
                      </div>
                      <div className="space-y-3 relative">
                        <label className="text-[9px] uppercase tracking-widest opacity-40 font-bold">Preferred Time</label>
                        <div 
                          className="w-full border-b py-3 md:py-4 flex justify-between items-center cursor-pointer group hover:border-[#D4A373]/50 transition-all"
                          style={{ borderColor: "rgba(255,255,255,0.1)" }}
                          onClick={() => setOpenDropdown(openDropdown === 'time' ? null : 'time')}
                        >
                          <span className="text-sm md:text-base text-white/90 font-medium">{resForm.time}</span>
                          <ChevronDown className={`w-4 h-4 text-[#D4A373] transition-transform duration-500 ${openDropdown === 'time' ? 'rotate-180' : ''}`} />
                        </div>
                        
                        <AnimatePresence>
                          {openDropdown === 'time' && (
                            <motion.div
                              initial={{ opacity: 0, y: 10, scale: 0.98 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: 10, scale: 0.98 }}
                              className="absolute left-0 right-0 top-full mt-2 bg-[#1A0F0A] border border-white/10 rounded-2xl shadow-2xl z-50 py-3 max-h-60 overflow-y-auto no-scrollbar"
                            >
                              {[
                                "08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM", 
                                "12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM", 
                                "04:00 PM", "05:00 PM", "06:00 PM", "07:00 PM", 
                                "08:00 PM", "09:00 PM", "10:00 PM"
                              ].map((t) => (
                                <div
                                  key={t}
                                  className={`px-6 py-3 text-sm cursor-pointer transition-colors flex items-center justify-between group/opt ${resForm.time === t ? 'text-[#D4A373] bg-white/5' : 'text-white/60 hover:text-white hover:bg-white/5'}`}
                                  onClick={() => {
                                    setResForm(p => ({ ...p, time: t }));
                                    setOpenDropdown(null);
                                  }}
                                >
                                  {t}
                                  {resForm.time === t && <div className="w-1.5 h-1.5 bg-[#D4A373] rounded-full" />}
                                </div>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 md:gap-10">
                      <div className="space-y-3 relative">
                        <label className="text-[9px] uppercase tracking-widest opacity-40 font-bold">Table Number</label>
                        <div 
                          className="w-full border-b py-3 md:py-4 flex justify-between items-center cursor-pointer group hover:border-[#D4A373]/50 transition-all"
                          style={{ borderColor: "rgba(255,255,255,0.1)" }}
                          onClick={() => setOpenDropdown(openDropdown === 'table' ? null : 'table')}
                        >
                          <span className="text-sm md:text-base text-white/90 font-medium">{resForm.tableNumber}</span>
                          <ChevronDown className={`w-4 h-4 text-[#D4A373] transition-transform duration-500 ${openDropdown === 'table' ? 'rotate-180' : ''}`} />
                        </div>

                        <AnimatePresence>
                          {openDropdown === 'table' && (
                            <motion.div
                              initial={{ opacity: 0, y: 10, scale: 0.98 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: 10, scale: 0.98 }}
                              className="absolute left-0 right-0 top-full mt-2 bg-[#1A0F0A] border border-white/10 rounded-2xl shadow-2xl z-50 py-3 max-h-60 overflow-y-auto no-scrollbar"
                            >
                              {["T1","T2","T3","T4","T5","T6","T7","T8","T9","T10"].map((t) => (
                                <div
                                  key={t}
                                  className={`px-6 py-3 text-sm cursor-pointer transition-colors flex items-center justify-between group/opt ${resForm.tableNumber === t ? 'text-[#D4A373] bg-white/5' : 'text-white/60 hover:text-white hover:bg-white/5'}`}
                                  onClick={() => {
                                    setResForm(p => ({ ...p, tableNumber: t }));
                                    setOpenDropdown(null);
                                  }}
                                >
                                  {t}
                                  {resForm.tableNumber === t && <div className="w-1.5 h-1.5 bg-[#D4A373] rounded-full" />}
                                </div>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                      <div className="space-y-3">
                        <label className="text-[9px] uppercase tracking-widest opacity-40 font-bold">Party Size</label>
                        <div 
                          className="w-full border-b py-3 md:py-4 flex items-center justify-between"
                          style={{ borderColor: "rgba(255,255,255,0.1)" }}
                        >
                          <button 
                            type="button"
                            onClick={() => setResForm(p => ({ ...p, partySize: Math.max(1, p.partySize - 1) }))}
                            className="w-8 h-8 rounded-full border border-[#D4A373]/30 flex items-center justify-center hover:bg-[#D4A373] hover:text-[#1A0F0A] transition-all duration-500"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          
                          <div className="flex flex-col items-center">
                            <span className="text-xl md:text-2xl font-playfair text-white">{resForm.partySize}</span>
                            <span className="text-[8px] uppercase tracking-widest opacity-30 font-bold">Guests</span>
                          </div>

                          <button 
                            type="button"
                            onClick={() => setResForm(p => ({ ...p, partySize: Math.min(12, p.partySize + 1) }))}
                            className="w-8 h-8 rounded-full border border-[#D4A373]/30 flex items-center justify-center hover:bg-[#D4A373] hover:text-[#1A0F0A] transition-all duration-500"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                <div className="space-y-3">
                  <label className="text-[9px] uppercase tracking-widest opacity-40 font-bold">Email Address</label>
                  <input
                    required
                    type="email"
                    placeholder="YOUR@VOGUE.COM"
                    value={resForm.email}
                    onChange={(e) => setResForm(p => ({ ...p, email: e.target.value }))}
                    className="w-full bg-transparent border-b py-3 md:py-4 outline-none transition-all placeholder:text-white/20 text-sm md:text-base focus:border-[#D4A373] active:border-[#D4A373]"
                    style={{ borderColor: isBirthday ? "rgba(244,114,182,0.3)" : "rgba(255,255,255,0.1)" }}
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={resStatus === "loading"}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  animate={{
                    background: isBirthday
                      ? ["linear-gradient(135deg,#ec4899,#a855f7)", "linear-gradient(135deg,#a855f7,#ec4899)"]
                      : "#3D4A3A",
                  }}
                  transition={{ background: { duration: 2, repeat: Infinity, repeatType: "reverse" } }}
                  className="w-full text-white py-5 md:py-7 rounded-full font-black uppercase tracking-[0.2em] text-[10px] md:text-[11px] transition-all duration-700 shadow-2xl flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {resStatus === "loading"
                    ? "Securing..."
                    : isBirthday
                    ? "🎉 Reserve Birthday Table"
                    : "Secure Private Reservation"}
                  <Sparkles className="w-4 h-4" />
                </motion.button>
              </form>
            </div>

            {/* Bottom glow */}
            <motion.div
              animate={{ opacity: isBirthday ? 0.15 : 0.05 }}
              className="absolute -bottom-10 -right-10 w-40 h-40"
            >
              <Sparkles
                className="w-full h-full"
                style={{ color: isBirthday ? "#f472b6" : "#D4A373" }}
              />
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Testimonials Collective & Review Pad (Optimized Spacing) */}
      <Section id="reviews" className="bg-[#FDF8F5] text-[#1A0F0A] !py-12 border-t border-[#D4A373]/20 relative">
         <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            
            {/* Left: Review Writing Pad */}
            <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-32">
               <div className="space-y-4">
                  <span className="text-[#D4A373] uppercase tracking-[0.4em] text-[10px] font-black">Share Your Voice</span>
                  <h3 className="text-3xl md:text-4xl font-playfair font-bold">The Roasting <br/> Journal.</h3>
                  <p className="opacity-60 text-xs font-light leading-relaxed max-w-xs">
                     Every palette tells a story. Share your experience with our artisanal blends and curated gastronomy.
                  </p>
               </div>

               <div className="bg-white p-6 md:p-8 rounded-[30px] shadow-2xl border border-[#D4A373]/10 space-y-6">
                  <div className="space-y-3">
                     <label className="text-[8px] uppercase tracking-widest opacity-40 font-bold">Your Identity</label>
                     <input 
                       value={newReview.name}
                       onChange={(e) => setNewReview({...newReview, name: e.target.value})}
                       type="text" 
                       placeholder="NAME / CRITIC" 
                       className="w-full bg-transparent border-b border-[#D4A373]/20 py-3 focus:border-[#D4A373] outline-none transition-all placeholder:text-[#1A0F0A]/20 text-xs font-bold tracking-widest uppercase" 
                     />
                  </div>
                  <div className="space-y-3">
                     <label className="text-[8px] uppercase tracking-widest opacity-40 font-bold">The Experience</label>
                     <textarea 
                       value={newReview.text}
                       onChange={(e) => setNewReview({...newReview, text: e.target.value})}
                       placeholder="TELL US ABOUT THE SENSES..." 
                       rows={3}
                       className="w-full bg-transparent border border-[#D4A373]/10 rounded-xl p-4 focus:border-[#D4A373] outline-none transition-all placeholder:text-[#1A0F0A]/20 text-xs italic font-playfair"
                     />
                  </div>
                  <button 
                    onClick={submitReview}
                    className="w-full bg-[#1A0F0A] text-white py-4 rounded-full font-black uppercase tracking-[0.2em] text-[9px] hover:bg-[#D4A373] transition-all duration-700 shadow-xl flex items-center justify-center gap-2"
                  >
                    Publish to Collective <Sparkles className="w-3 h-3" />
                  </button>
               </div>
            </div>

            {/* Right: Stacked Cards Review Deck */}
            <div className="lg:col-span-7 relative h-[380px] md:h-[500px] flex items-center justify-center pt-16 md:pt-20">
               {/* Deck Layout buttons (Smaller) */}
               <div className="absolute top-0 right-0 flex gap-3 z-30">
                  <button onClick={prevReview} className="bg-white p-4 rounded-2xl shadow-lg border border-[#D4A373]/20 hover:bg-[#D4A373] hover:text-white transition-all transform hover:scale-110">
                     <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button onClick={nextReview} className="bg-[#1A0F0A] text-white p-4 rounded-2xl shadow-lg border border-white/10 hover:bg-[#D4A373] transition-all transform hover:scale-110">
                     <ChevronRight className="w-5 h-5" />
                  </button>
               </div>

               <div className="relative w-full h-full max-w-lg mx-auto">
                  {/* Delicate Floating Design in Blank Space */}
                  <div className="absolute -bottom-10 -right-20 opacity-[0.05] pointer-events-none select-none z-0">
                     <svg className="w-[400px] h-auto text-[#D4A373] rotate-[15deg]" viewBox="0 0 100 100" fill="currentColor">
                        <path d="M10,90 C30,85 60,80 90,20 M50,55 L40,45 M55,50 L65,40 M65,35 L75,25 M30,70 C25,65 20,50 25,40" stroke="currentColor" strokeWidth="0.2" fill="none" />
                        <ellipse cx="25" cy="40" rx="3" ry="6" transform="rotate(-20 25 40)" />
                        <ellipse cx="90" cy="20" rx="4" ry="7" transform="rotate(20 90 20)" />
                        <ellipse cx="40" cy="45" rx="2" ry="4" />
                        <ellipse cx="65" cy="40" rx="2" ry="4" />
                     </svg>
                  </div>

                  <AnimatePresence mode="popLayout" initial={false}>
                    {reviews.map((review, i) => {
                      const offset = (i - activeReviewIndex + reviews.length) % reviews.length;
                      const isVisible = offset < 3; // Show only top 3 cards in the stack
                      
                      if (!isVisible) return null;

                      return (
                        <motion.div 
                          key={review.name + i}
                          initial={{ opacity: 0, x: 100 }}
                          animate={{ 
                            opacity: 1 - offset * 0.3, 
                            x: offset * 30, 
                            y: offset * -15,
                            scale: 1 - offset * 0.05,
                            rotate: offset * 1.5
                          }}
                          exit={{ opacity: 0, x: -150 }}
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                          style={{ zIndex: 50 - offset }}
                          className="absolute inset-x-0 top-0 bg-white p-6 md:p-10 rounded-[30px] md:rounded-[40px] shadow-[0_20px_60px_rgba(212,163,115,0.12)] border border-[#D4A373]/10 h-[280px] md:h-[350px] flex flex-col justify-between cursor-pointer group"
                        >
                           <Utensils className="text-[#D4A373] w-6 h-6 md:w-8 md:h-8 opacity-30 group-hover:scale-110 transition-transform" />
                           <div className="space-y-3 md:space-y-4">
                              <p className="text-lg md:text-2xl font-playfair italic leading-relaxed text-[#1A0F0A] font-light">"{review.text}"</p>
                              <div className="w-10 h-[1px] bg-[#D4A373] opacity-30" />
                           </div>
                           <div className="flex justify-between items-end">
                              <div className="space-y-1">
                                 <h5 className="font-bold uppercase tracking-[0.4em] text-[10px] text-[#1A0F0A]">{review.name}</h5>
                                 <p className="text-[9px] opacity-40 uppercase tracking-[0.2em] font-medium">{review.role}</p>
                              </div>
                              <div className="flex gap-1 text-[#D4A373]">
                                 {[...Array(5)].map((_, star) => (
                                   <Sparkles key={star} className="w-2.5 h-2.5" />
                                 ))}
                              </div>
                           </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
               </div>
               
               {/* Layout Legend */}
               <div className="absolute bottom-0 right-0 flex items-center gap-4 text-[9px] uppercase tracking-[0.4em] font-black opacity-20">
                  <span className="text-[#D4A373]">Archived Voices</span>
                  <div className="w-12 h-[1px] bg-[#D4A373]" />
                  <span>0{activeReviewIndex + 1} / 0{reviews.length}</span>
               </div>
            </div>
         </div>
      </Section>

      <footer className="bg-[#1A0F0A] text-[#FDF8F5] pt-6 md:pt-12 pb-12 px-4 md:px-12 lg:px-24 border-t border-white/5 relative overflow-hidden">
         {/* Background Subtle Full Logo Accent (Optimized for Visibility) */}
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none whitespace-nowrap">
            <h2 className="text-[4rem] md:text-[8rem] lg:text-[12rem] font-black leading-none uppercase select-none tracking-tighter">BREWEDCRAFT</h2>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 lg:gap-8 mb-0 relative z-10">
            {/* Brand Column */}
            <div className="lg:col-span-4 space-y-8 md:space-y-10 text-center md:text-left">
               <div className="flex items-center gap-3 justify-center md:justify-start group cursor-pointer">
                  <Sparkles className="text-[#D4A373] w-5 h-5 group-hover:rotate-180 transition-transform duration-1000" />
                  <div className="text-2xl md:text-3xl font-playfair font-black tracking-tighter">
                     BREWED<span className="text-[#3D4A3A]">CRAFT</span>
                  </div>
               </div>
               <p className="opacity-60 text-sm leading-relaxed font-light font-playfair italic max-w-sm mx-auto md:mx-0">
                  "A multi-sensory sanctuary where the precision of specialized roasting meets the artistry of international gastronomy."
               </p>
               <div className="flex gap-6 justify-center md:justify-start pt-2">
                  {[Instagram, Facebook].map((Icon, i) => (
                    <div key={i} className="group relative">
                       <div className="absolute inset-0 bg-[#D4A373] scale-0 group-hover:scale-100 transition-transform duration-500 rounded-full blur-md opacity-20" />
                       <Icon className="w-5 h-5 md:w-6 md:h-6 hover:text-[#D4A373] cursor-pointer transition-all relative z-10" />
                    </div>
                  ))}
               </div>
            </div>

            {/* Navigation Column */}
            <div className="lg:col-span-2 space-y-8 text-center md:text-left">
               <h4 className="text-[11px] uppercase tracking-[0.4em] font-black text-[#D4A373]">Selection</h4>
               <ul className="space-y-4 text-xs md:text-sm font-medium opacity-50 mb-8">
                  {['the atelier', 'gastronomy', 'the library', 'the sanctuary', 'the journal'].map((item) => (
                    <li key={item} className="hover:opacity-100 hover:text-[#D4A373] transition-all cursor-pointer group flex items-center justify-center md:justify-start gap-2">
                       <span className="w-0 group-hover:w-4 h-[1px] bg-[#D4A373] transition-all" />
                       <span className="capitalize">{item}</span>
                    </li>
                  ))}
               </ul>
            </div>

            {/* Hours Column */}
            <div className="lg:col-span-3 space-y-8 text-center md:text-left">
               <h4 className="text-[11px] uppercase tracking-[0.4em] font-black text-[#3D4A3A]">Sanctuary Schedule</h4>
               <div className="space-y-4 text-[11px] md:text-xs">
                  {[
                    { day: 'Mon - Sat', hours: '10:00 — 20:00' },
                    { day: 'Sunday', hours: 'CLOSED' }
                  ].map((row) => (
                    <div key={row.day} className="flex flex-col md:flex-row md:justify-between items-center md:items-start border-b border-white/5 pb-3 gap-1 md:gap-0">
                       <span className="opacity-40 uppercase tracking-widest">{row.day}</span>
                       <span className="font-playfair tracking-wider italic font-bold">{row.hours}</span>
                    </div>
                  ))}
                  <p className="pt-4 text-[9px] opacity-30 uppercase tracking-[0.2em] font-bold">Private bookings available exclusively via concierge.</p>
               </div>
            </div>

            {/* Staff Login Column */}
            <div className="lg:col-span-3 space-y-8 text-center md:text-left">
               <h4 className="text-[11px] uppercase tracking-[0.4em] font-black text-[#D4A373]">Staff Portal</h4>
               <p className="text-xs opacity-50 font-medium leading-relaxed">Access the administrative and back-of-house management systems.</p>
               <Link 
                 href="/login" 
                 className="inline-flex items-center gap-3 bg-white/5 border border-white/10 px-8 py-4 rounded-full text-[10px] font-bold tracking-[0.3em] uppercase hover:bg-[#D4A373] hover:text-[#1A0F0A] transition-all duration-500 group"
               >
                 Internal Login <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
               </Link>
            </div>
         </div>

         {/* Bottom Bar */}
         <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10 relative z-10">
            <div className="text-[9px] uppercase tracking-[0.5em] opacity-30 font-black text-center md:text-left">
               © 2026 BREWED CRAFT ARTISANAL COLLECTIVE. ALL RIGHTS RESERVED.
            </div>
            <div className="flex flex-wrap justify-center gap-8 md:gap-12 text-[9px] uppercase tracking-[0.3em] font-black opacity-30">
               {['privacy policy', 'terms of merit', 'accessibility'].map((text) => (
                  <span key={text} className="hover:opacity-100 hover:text-[#D4A373] cursor-pointer transition-all">{text}</span>
               ))}
            </div>
         </div>
      </footer>
    </main>
  );
}
