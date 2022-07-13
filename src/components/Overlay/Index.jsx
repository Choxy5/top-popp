import { motion } from 'framer-motion';
import './style.css';

export function Overlay({ children, onClick }) {
  return (
    <motion.div
      onClick={onClick}
      className="overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  );
}
