"use client";
import { Section } from "@/components/Section";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Coffee, MapPin, Phone, Instagram, Facebook, Utensils, Wheat, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

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
  const [activeTab, setActiveTab] = useState("coffee");
  const [activeSection, setActiveSection] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Dynamic Navbar logic for scroll tracking
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 1.1]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  return (
    <main className="relative min-h-screen bg-[#FDF8F5] text-[#2C1810]">
      {/* Dynamic Navbar */}
      <nav className={`fixed top-0 w-full z-50 px-6 py-5 md:px-12 flex justify-between items-center transition-all duration-700 ${
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
        
        <div className="hidden lg:flex gap-8 text-[10px] uppercase tracking-[0.4em] font-black">
          {[
            { id: "home", label: "The Atelier" },
            { id: "story", label: "Our Story" },
            { id: "culinary", label: "Gastronomy" },
            { id: "menu", label: "The Library" },
            { id: "contact", label: "Reservations" }
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
           <button className="hidden lg:block text-[10px] uppercase tracking-[0.3em] font-black opacity-40 hover:opacity-100 transition-opacity">
             Our Story
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
                { id: "contact", label: "Reservations" }
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
            className="flex flex-col md:flex-row gap-8 justify-center pt-12"
          >
            <Link href="/menu" className="bg-[#D4A373] text-[#1A0F0A] px-12 py-5 rounded-full font-black uppercase tracking-widest text-[10px] hover:bg-[#FDF8F5] transition-all duration-700 shadow-2xl group flex items-center justify-center gap-2">
              Order Now <Sparkles className="w-3 h-3 group-hover:rotate-45 transition-transform" />
            </Link>
            <button className="bg-[#3D4A3A] text-[#FDF8F5] px-12 py-5 rounded-full font-black uppercase tracking-widest text-[10px] hover:bg-[#FDF8F5] hover:text-[#3D4A3A] transition-all duration-700 shadow-2xl">
              Taste The Kitchen
            </button>
          </motion.div>
        </div>

        <div className="absolute bottom-12 left-10 hidden xl:block">
           <div className="text-[10px] uppercase tracking-[0.4em] font-bold opacity-40 rotate-90 origin-left">
             SCROLL TO DISCOVER UNTOLD STORIES
           </div>
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
                     <h2 className="text-6xl md:text-8xl lg:text-9xl font-playfair leading-[1] text-[#FDF8F5]">Crafting <br /> <span className="italic font-light text-[#D4A373]">Heritage.</span></h2>
                     <p className="text-lg md:text-xl opacity-60 font-light leading-relaxed font-playfair italic max-w-xl">
                        What began as a single sack of beans in a small London atelier has evolved into a global sanctuary for the culinary avant-garde.
                     </p>
                  </motion.div>
                  <p className="opacity-40 text-sm md:text-base leading-relaxed max-w-lg">
                     At Brewed Craft, we don't just serve dishes; we curate memories. Our journey is defined by a relentless obsession with microscopic precision—from the exact altitude of our coffee beans to the 24-hour fermentation of our artisan sourdough.
                  </p>
               </div>
               
               <div className="lg:col-span-6 grid grid-cols-2 gap-4 md:gap-6">
                  <div className="space-y-4 md:space-y-6 pt-12">
                     <div className="h-64 md:h-80 relative rounded-3xl overflow-hidden border border-white/5 group shadow-2xl">
                        <Image src="/interior.png" fill alt="Our Atelier" className="object-cover group-hover:scale-110 transition-transform duration-1000" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#1A0F0A]/60 to-transparent" />
                     </div>
                     <div className="bg-white/5 p-8 md:p-10 rounded-3xl border border-white/5 space-y-4 hover:bg-white/10 transition-all">
                        <h4 className="text-4xl md:text-5xl font-playfair font-bold text-[#D4A373]">50+</h4>
                        <p className="text-[10px] md:text-[11px] uppercase tracking-widest opacity-40 font-bold">Regional Roast Variations <br/> Curated Yearly</p>
                     </div>
                  </div>
                  <div className="space-y-4 md:space-y-6">
                     <div className="bg-white/5 p-8 md:p-10 rounded-3xl border border-white/5 space-y-4 hover:bg-white/10 transition-all">
                        <h4 className="text-4xl md:text-5xl font-playfair font-bold text-[#3D4A3A]">12</h4>
                        <p className="text-[10px] md:text-[11px] uppercase tracking-widest opacity-40 font-bold">Michelin Trained Chefs <br/> in our Collective</p>
                     </div>
                     <div className="h-64 md:h-80 relative rounded-3xl overflow-hidden border border-white/5 group shadow-2xl">
                        <Image src="/pastry.png" fill alt="Our Kitchen" className="object-cover group-hover:scale-110 transition-transform duration-1000" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#1A0F0A]/60 to-transparent" />
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </Section>

      {/* Culinary Excellence Section */}
      <Section id="culinary" className="bg-[#FDF8F5] overflow-hidden">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="relative group">
             <motion.div 
               whileHover={{ scale: 0.98 }}
               className="relative h-[700px] w-full rounded-[60px] overflow-hidden shadow-2xl"
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

          <div className="space-y-12 pl-6">
             <div className="space-y-6">
                <span className="text-[#3D4A3A] uppercase tracking-[0.4em] text-[10px] font-black">Gastronomy Redefined</span>
                <h2 className="text-6xl md:text-8xl font-playfair leading-[0.9]">Beyond The <br/> <span className="text-[#3D4A3A]">Standard.</span></h2>
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
            <div className="inline-flex bg-white/5 p-2 rounded-full border border-white/10">
               <button 
                 onClick={() => setActiveTab("coffee")}
                 className={`px-10 py-3 rounded-full text-[10px] uppercase tracking-[0.2em] font-bold transition-all ${activeTab === "coffee" ? "bg-[#D4A373] text-[#1A0F0A]" : "text-white/40 hover:text-white"}`}
               >
                 The Roastery
               </button>
               <button 
                 onClick={() => setActiveTab("culinary")}
                 className={`px-10 py-3 rounded-full text-[10px] uppercase tracking-[0.2em] font-bold transition-all ${activeTab === "culinary" ? "bg-[#3D4A3A] text-[#FDF8F5]" : "text-white/40 hover:text-white"}`}
               >
                 The Kitchen
               </button>
            </div>
            <h2 className="text-5xl md:text-8xl font-playfair tracking-tighter">The Library of Taste</h2>
         </div>

         <div className="grid md:grid-cols-3 gap-8">
            <AnimatePresence>
               {menuItems[activeTab].map((item, idx) => (
                 <motion.div 
                   key={item.name}
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   exit={{ opacity: 0, y: -20 }}
                   transition={{ duration: 0.5, delay: idx * 0.1 }}
                   className="group relative bg-[#2C1810]/30 border border-white/5 p-10 rounded-[40px] hover:bg-[#2C1810]/50 transition-all duration-700"
                 >
                    <div className="absolute top-10 right-10 text-[#D4A373] text-xl font-playfair">{item.price}</div>
                    <div className="h-40 w-full relative mb-10 overflow-hidden rounded-2xl border border-[#D4A373]/20">
                       <Image src={item.img} alt={item.name} fill className="object-cover group-hover:scale-110 transition-all duration-1000" />
                    </div>
                    <h3 className="text-2xl font-playfair mb-4 group-hover:text-[#D4A373] transition-colors">{item.name}</h3>
                    <p className="text-sm opacity-40 font-light leading-relaxed">{item.desc}</p>
                    <button className="mt-8 opacity-0 group-hover:opacity-100 transition-all text-[9px] uppercase tracking-[0.3em] text-[#D4A373] flex items-center gap-2">
                       Detail <Sparkles className="w-3 h-3" />
                    </button>
                 </motion.div>
               ))}
            </AnimatePresence>
         </div>
      </Section>

      {/* The Visual Sanctuary (Horizontal Section) */}
      <section className="py-10 md:py-32 bg-[#FDF8F5] overflow-hidden">
         <div className="flex w-max animate-infinite-scroll hover:[animation-play-state:paused] group">
            {[...Array(2)].map((_, arrayIndex) => (
               <div key={arrayIndex} className="flex gap-4 md:gap-8 px-2 md:px-4" aria-hidden={arrayIndex === 1 ? "true" : "false"}>
                  {["/burger_bbq.png", "/pizza_truffle.png", "/pastry.png", "/interior.png", "/gelato_pistachio.png", "/juice.png"].map((src, i) => (
                     <div key={i} className="flex-shrink-0 w-[280px] md:w-[400px] h-[350px] md:h-[500px] relative rounded-[30px] md:rounded-[50px] overflow-hidden transition-all duration-1000 shadow-xl border border-[#D4A373]/10">
                        <Image src={src} alt="Gallery" fill className="object-cover" />
                     </div>
                  ))}
               </div>
            ))}
         </div>
      </section>

      {/* Final Sensory Section */}
      <Section id="contact" className="bg-[#3D4A3A] text-[#FDF8F5] !py-12 md:!py-32">
         <div className="grid lg:grid-cols-2 gap-16 lg:gap-32 items-center">
            <div className="space-y-8 md:space-y-12 text-center lg:text-left">
               <motion.div
                 initial={{ opacity: 0, x: -20 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true }}
                 className="space-y-4 md:space-y-6"
               >
                  <span className="text-[#D4A373] uppercase tracking-[0.4em] text-[10px] md:text-[12px] font-black">Private Experience</span>
                  <h2 className="text-5xl md:text-7xl lg:text-8xl font-playfair leading-[1.1] md:leading-[0.9]">
                    Reserve Your <br className="hidden md:block" /> 
                    Seat at <span className="italic font-normal text-[#D4A373]">The Table.</span>
                  </h2>
               </motion.div>
               
               <div className="space-y-8 max-w-md mx-auto lg:mx-0">
                   <div className="flex items-center gap-6 md:gap-10 justify-center lg:justify-start">
                      <div className="w-12 md:w-16 h-[1px] bg-white/20" />
                      <p className="opacity-60 text-[9px] md:text-[10px] uppercase tracking-[0.3em]">London • Paris • Tokyo • Mumbai</p>
                   </div>
               </div>
            </div>

            <motion.div 
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               className="bg-[#1A0F0A] p-8 md:p-16 rounded-[40px] md:rounded-[60px] shadow-3xl relative overflow-hidden group border border-white/5"
            >
               <div className="relative z-10 space-y-8 md:space-y-10">
                  <div className="space-y-2">
                     <h3 className="text-2xl md:text-3xl font-playfair">Global Reservations</h3>
                     <p className="text-xs opacity-50 font-light lowercase font-playfair">curate your bespoke dining journey</p>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-8 md:gap-10">
                     <div className="space-y-3">
                        <label className="text-[9px] uppercase tracking-widest opacity-40 font-bold">Date of Vist</label>
                        <input type="text" placeholder="OCT 24, 2026" className="w-full bg-transparent border-b border-white/10 py-3 md:py-4 focus:border-[#D4A373] outline-none transition-all placeholder:text-white/20 text-sm md:text-base" />
                     </div>
                     <div className="space-y-3">
                        <label className="text-[9px] uppercase tracking-widest opacity-40 font-bold">Party Size</label>
                        <input type="text" placeholder="02 PEOPLE" className="w-full bg-transparent border-b border-white/10 py-3 md:py-4 focus:border-[#D4A373] outline-none transition-all placeholder:text-white/20 text-sm md:text-base" />
                     </div>
                  </div>

                  <div className="space-y-3">
                     <label className="text-[9px] uppercase tracking-widest opacity-40 font-bold">Email Address</label>
                     <input type="email" placeholder="YOUR@VOGUE.COM" className="w-full bg-transparent border-b border-white/10 py-3 md:py-4 focus:border-[#D4A373] outline-none transition-all placeholder:text-white/20 text-sm md:text-base uppercase" />
                  </div>

                  <button className="w-full bg-[#3D4A3A] text-white py-5 md:py-7 rounded-full font-black uppercase tracking-[0.2em] text-[10px] md:text-[11px] hover:bg-[#FDF8F5] hover:text-[#1A0F0A] transition-all duration-700 shadow-2xl group flex items-center justify-center gap-3">
                    Secure Private Reservation <Sparkles className="w-4 h-4" />
                  </button>
               </div>
               <Sparkles className="absolute -bottom-10 -right-10 w-40 h-40 opacity-5 text-[#D4A373] group-hover:rotate-45 transition-transform duration-1000" />
            </motion.div>
         </div>
      </Section>

      {/* Testimonials Collective (Relocated) */}
      <Section className="bg-[#1A0F0A] text-[#FDF8F5] !py-32 border-t border-white/5">
         <div className="max-w-7xl mx-auto space-y-16">
            <div className="text-center space-y-4">
               <h3 className="text-4xl md:text-5xl font-playfair font-bold">The Collective Voice</h3>
               <div className="w-12 h-[1px] bg-[#D4A373] mx-auto opacity-40" />
            </div>

            <div className="grid md:grid-cols-3 gap-8">
               {[
                 { name: "Julian Thorne", role: "Gastronomy Critic", text: "The Wagyu burger is a masterclass in balance. I've travelled the world, but the precision here is simply unmatched." },
                 { name: "Elara Vance", role: "Vogue Collective", text: "A multi-sensory haven. From the velvet texture of the latte to the cinematic lighting, it's architectural artistry on a plate." },
                 { name: "Marcus Reid", role: "Roastery Artisan", text: "The bean sourcing profile here is better than most boutique ateliers in Milan. Truly gold-standard craftsmanship." }
               ].map((review, i) => (
                 <motion.div 
                   key={i}
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   transition={{ delay: i * 0.1 }}
                   className="bg-white/5 p-10 rounded-[40px] border border-white/5 space-y-8 flex flex-col justify-between hover:bg-white/[0.08] transition-all duration-700 group cursor-default"
                 >
                    <Utensils className="text-[#D4A373] w-6 h-6 opacity-20 group-hover:opacity-100 transition-opacity" />
                    <p className="text-sm md:text-base font-playfair italic leading-relaxed opacity-60 group-hover:opacity-100 transition-opacity">"{review.text}"</p>
                    <div className="space-y-2">
                       <h5 className="font-bold uppercase tracking-widest text-[10px]">{review.name}</h5>
                       <p className="text-[9px] opacity-30 uppercase tracking-[0.2em]">{review.role}</p>
                    </div>
                 </motion.div>
               ))}
            </div>
         </div>
      </Section>

      <footer className="bg-[#1A0F0A] text-[#FDF8F5] pt-12 md:pt-32 pb-12 px-6 md:px-12 lg:px-24 border-t border-white/5 relative overflow-hidden">
         {/* Background Subtle Logo Accent */}
         <div className="absolute top-0 right-0 opacity-[0.02] pointer-events-none translate-x-1/4 -translate-y-1/4">
            <h2 className="text-[20rem] font-black leading-none uppercase select-none">BREWED</h2>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 lg:gap-8 mb-24 relative z-10">
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
               <ul className="space-y-4 text-xs md:text-sm font-medium opacity-50">
                  {['the atelier', 'culinary art', 'the library', 'reservations'].map((item) => (
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
                    { day: 'Mon - Fri', hours: '07:00 — 22:00' },
                    { day: 'Sat - Sun', hours: '08:00 — 23:00' }
                  ].map((row) => (
                    <div key={row.day} className="flex flex-col md:flex-row md:justify-between items-center md:items-start border-b border-white/5 pb-3 gap-1 md:gap-0">
                       <span className="opacity-40 uppercase tracking-widest">{row.day}</span>
                       <span className="font-playfair tracking-wider italic font-bold">{row.hours}</span>
                    </div>
                  ))}
                  <p className="pt-4 text-[9px] opacity-30 uppercase tracking-[0.2em] font-bold">Private bookings available exclusively via concierge.</p>
               </div>
            </div>

            {/* Newsletter Column */}
            <div className="lg:col-span-3 space-y-8 text-center md:text-left">
               <h4 className="text-[11px] uppercase tracking-[0.4em] font-black text-[#D4A373]">The Journal</h4>
               <p className="text-xs opacity-50 font-medium leading-relaxed">Join our collective for seasonal menu releases and private event invitations.</p>
               <div className="relative group max-w-sm mx-auto md:mx-0">
                  <input 
                    type="email" 
                    placeholder="VOGUE@EMAIL.COM" 
                    className="w-full bg-white/5 border border-white/10 rounded-full py-4 pl-6 pr-12 text-[10px] font-bold tracking-widest outline-none focus:border-[#D4A373]/50 focus:bg-white/10 transition-all text-white placeholder:opacity-20"
                  />
                  <button className="absolute right-2 top-1/2 -translate-y-1/2 p-3 text-[#D4A373] hover:translate-x-1 transition-transform bg-[#D4A373]/10 rounded-full">
                     <Sparkles size={14} />
                  </button>
               </div>
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
