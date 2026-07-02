import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section id="hero" className="min-h-screen flex flex-col items-center justify-center pt-20 px-4 text-center relative overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto px-6 w-full flex flex-col items-center">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-6 text-target font-mono text-[clamp(0.6rem,2vw,0.875rem)] tracking-[0.4em] animate-pulse uppercase text-center"
        >
          SYSTEM.INITIALIZE // PORTFOLIO_V2.0
        </motion.div>
        
        <div className="relative w-full flex justify-center">


          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="font-heading text-[clamp(1.5rem,7.5vw,5.5rem)] mb-6 md:mb-8 tracking-[0.1em] sm:tracking-[0.2em] text-sensor drop-shadow-[0_0_20px_rgba(0,229,255,0.3)] inline-grid grid-cols-[1fr_auto_1fr] items-center"
          >
            <span className="text-right">PRASUN</span>
            <span className="text-target px-1 sm:px-2 md:px-4">_</span>
            <span className="text-left">KUMAR</span>
          </motion.h1>
        </div>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="max-w-4xl mx-auto text-phosphor/50 text-[clamp(0.7rem,2.5vw,1.1rem)] md:text-xl mb-8 md:mb-12 leading-relaxed font-mono tracking-wide"
        >
          AEROSPACE ENGINEER // FULL-STACK DEVELOPER // AI SYSTEMS ARCHITECT
          <span className="text-[clamp(0.5rem,1.5vw,0.75rem)] md:text-xs tracking-[0.3em] sm:tracking-[0.6em] opacity-30 mt-4 md:mt-6 block uppercase font-mono">
            LAT: 20.2961° N // LONG: 85.8245° E
          </span>
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-col sm:flex-row justify-center gap-4 md:gap-8"
        >
          <a href="#projects" className="btn-hud text-base md:text-lg px-10 py-4 group min-w-[220px]">
            <span className="group-hover:tracking-[0.25em] transition-all duration-500">ENGAGE OPTICS</span>
          </a>
          <a 
            href="/resume.pdf" 
            className="btn-hud text-base md:text-lg px-10 py-4 !border-phosphor/10 !text-phosphor/30 group min-w-[220px] hover:!border-phosphor/40 hover:!text-phosphor/60"
          >
            <span className="group-hover:tracking-[0.1em] transition-all duration-500">SECURE_CV.PDF</span>
          </a>
        </motion.div>
      </div>
      

    </section>
  );
};

export default Hero;
