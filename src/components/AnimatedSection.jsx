import { motion } from "framer-motion";

export default function AnimatedSection({ children, id, className }) {
  return (
    <motion.section
      id={id}
      className={className}
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
    >
      {children}
    </motion.section>
  );
}
