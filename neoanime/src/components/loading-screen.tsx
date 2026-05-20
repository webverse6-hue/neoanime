import { motion } from "framer-motion";

export function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background">
      <div className="relative flex flex-col items-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          className="w-24 h-24 rounded-full border-t-2 border-r-2 border-primary border-b-2 border-b-transparent border-l-2 border-l-transparent"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
          className="absolute top-2 w-20 h-20 rounded-full border-b-2 border-l-2 border-accent border-t-2 border-t-transparent border-r-2 border-r-transparent"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="w-8 h-8 rounded-full bg-primary/20 blur-md" />
        </motion.div>
        
        <h2 className="mt-8 font-display text-xl tracking-[0.3em] bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent animate-pulse">
          LOADING
        </h2>
      </div>
    </div>
  );
}
