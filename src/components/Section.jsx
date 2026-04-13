"use client";
import { motion } from "framer-motion";

export function Section({ children, id, className = "" }) {
  return (
    <section id={id} className={`w-full py-12 md:py-24 px-4 md:px-12 lg:px-24 scroll-mt-20 ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, margin: "-100px" }}
      >
        {children}
      </motion.div>
    </section>
  );
}
