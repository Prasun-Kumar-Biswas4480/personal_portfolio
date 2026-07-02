import { useState, useEffect, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AeroLoader from './components/AeroLoader';
import { ScrollProvider } from './components/ScrollContext';
// Hero3D pulls in Three.js (~1MB); lazy-load it so it lands in its own chunk
// and never blocks first paint of the page content.
const Hero3D = lazy(() => import('./components/Hero3D').then((m) => ({ default: m.Hero3D })));

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ScrollProvider>
      <div className="min-h-screen bg-void text-phosphor selection:bg-target selection:text-void">
        <div className="scanlines"></div>
        
        {/* Global 3D Background - Fixed behind all content */}
        <div className="fixed inset-0 -z-10 pointer-events-none z-0">
          <Suspense fallback={null}>
            <Hero3D />
          </Suspense>
        </div>
        
        {/* Global Background Animations */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Dynamic Background Glow - Deep space nebula glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-[500px] bg-[#1a00ff]/5 rounded-full blur-[150px] animate-pulse" />
          
          {/* Floating Orbs */}
          <div className="orb orb-1" />
          <div className="orb orb-2" />
          <div className="orb orb-3" />
          
          {/* Tactical HUD Crosshair */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.08, scale: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            <img 
              src="https://cdn.jsdelivr.net/npm/game-icons-transparent@latest/svgs/delapouite/crosshair.svg" 
              className="w-[500px] h-[500px] md:w-[700px] md:h-[700px] animate-[spin_180s_linear_infinite]" 
              style={{ filter: "invert(1) sepia(1) saturate(5) hue-rotate(-20deg)" }}
              alt=""
            />
            <div className="absolute inset-0 bg-void/40 backdrop-blur-[2px] rounded-full" />
          </motion.div>
        </div>
        
        <AnimatePresence>
          {isLoading && (
            <motion.div
              key="loader"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="relative z-50"
            >
              <AeroLoader />
            </motion.div>
          )}
        </AnimatePresence>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoading ? 0 : 1 }}
          transition={{ duration: 0.5 }}
          className={`relative z-10 flex flex-col min-h-screen ${isLoading ? 'pointer-events-none' : 'pointer-events-auto'}`}
        >
          <Navbar />
          <main className="flex-grow">
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Contact />
          </main>
          <Footer />
        </motion.div>
      </div>
    </ScrollProvider>
  );
}

export default App;
