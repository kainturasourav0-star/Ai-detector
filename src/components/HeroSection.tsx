import { Shield, Eye, AudioLines, FileText, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroBg} alt="" className="w-full h-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
        <div className="absolute inset-0 scanline pointer-events-none" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 mb-8 animate-pulse-glow"
        >
          <span className="w-2 h-2 rounded-full bg-safe animate-pulse" />
          <span className="text-sm font-display text-primary tracking-wider uppercase">System Active</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-5xl md:text-7xl font-bold font-display tracking-tight mb-6"
        >
          <span className="text-foreground">Guardian</span>
          <span className="text-primary text-glow">AI</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed font-body"
        >
          Multi-modal defense system that detects and blocks AI-generated deepfakes, 
          voice clones, and social engineering attacks in real-time.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="flex flex-wrap justify-center gap-6 mb-12"
        >
          {[
            { icon: Eye, label: "Deepfake Video" },
            { icon: AudioLines, label: "Voice Clone" },
            { icon: FileText, label: "Text Scam" },
          ].map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-card/50 backdrop-blur-sm"
            >
              <Icon className="w-4 h-4 text-primary" />
              <span className="text-sm font-display text-secondary-foreground">{label}</span>
            </div>
          ))}
        </motion.div>

        <motion.a
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 1.0 }}
          href="#scanner"
          className="inline-flex items-center gap-2 px-8 py-3 rounded-lg bg-primary text-primary-foreground font-display font-semibold tracking-wide hover:box-glow-strong transition-shadow duration-300"
        >
          <Shield className="w-5 h-5" />
          Launch Scanner
        </motion.a>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.3 }}
          className="mt-16 animate-bounce"
        >
          <ChevronDown className="w-6 h-6 text-muted-foreground mx-auto" />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
