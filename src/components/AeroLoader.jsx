import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AeroLoader = () => {
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState('Initializing');

  useEffect(() => {
    const stages = [
      'Initializing Systems...',
      'Loading Aerospace Data...',
      'Calibrating Flight Controls...',
      'Establishing Connection...',
      'Ready for Launch!'
    ];

    let currentStageIndex = 0;
    let currentProgress = 0;

    const progressInterval = setInterval(() => {
      currentProgress += Math.random() * 15 + 5;
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(progressInterval);
      }
      setProgress(Math.min(currentProgress, 100));
    }, 300);

    const stageInterval = setInterval(() => {
      if (currentStageIndex < stages.length - 1) {
        currentStageIndex++;
        setStage(stages[currentStageIndex]);
      } else {
        clearInterval(stageInterval);
      }
    }, 1000);

    return () => {
      clearInterval(progressInterval);
      clearInterval(stageInterval);
    };
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-void"
      >
        <div className="relative flex flex-col items-center justify-center w-full max-w-2xl px-8">
          {/* Aerospace Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Flying aircraft silhouettes */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              className="absolute top-20 left-0 w-full"
            >
              <div className="flex items-center justify-center space-x-12 opacity-20">
                <div className="w-16 h-8 bg-target/30 rounded-none rotate-12" />
                <div className="w-20 h-10 bg-target/30 rounded-none -rotate-6" />
                <div className="w-16 h-8 bg-target/30 rounded-none rotate-6" />
              </div>
            </motion.div>
            
            {/* Satellite orbiting */}
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            >
              <div className="w-32 h-32 border border-target/20 rounded-none" />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-target/10 rounded-none" />
            </motion.div>
            
            {/* Rocket launch trail */}
            <motion.div
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: [0, 0.5, 0], y: -50 }}
              transition={{ duration: 3, repeat: Infinity, ease: 'ease-in-out' }}
              className="absolute bottom-20 left-1/2 transform -translate-x-1/2"
            >
              <div className="w-2 h-20 bg-gradient-to-t from-target to-transparent rounded-none" />
            </motion.div>
          </div>

          {/* Main Loading Content */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 w-full max-w-lg"
          >
            {/* Logo/Brand */}
            <div className="flex flex-col items-center mb-8">
              <motion.div
                initial={{ rotate: -180, scale: 0 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ type: 'spring', damping: 20, stiffness: 100 }}
                className="w-24 h-24 mb-4 relative"
              >
                <div className="w-full h-full border-4 border-target/30 rounded-none flex items-center justify-center">
                  <span className="font-mono text-2xl font-bold text-target">PKB</span>
                </div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-target/50 rounded-none"
                />
              </motion.div>
              <h1 className="text-3xl font-bold font-mono text-white mb-2">Prasun Kumar Biswas</h1>
              <p className="text-target font-mono text-sm">Aerospace Engineer Portfolio</p>
            </div>

            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-phosphor/60 font-mono text-sm">SYSTEM STATUS</span>
                <span className="text-target font-mono text-sm">{Math.round(progress)}%</span>
              </div>
              <div className="w-full h-2 bg-surface/50 rounded-none overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="h-full bg-gradient-to-r from-target to-sensor rounded-none"
                />
              </div>
            </div>

            {/* Stage Display */}
            <div className="mb-8 p-4 bg-surface/30 rounded-none border border-sensor/20 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="w-4 h-4 border-2 border-target rounded-none"
                />
                <span className="font-mono text-phosphor/80 text-sm">{stage}</span>
              </div>
            </div>

            {/* Technical Details */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-center p-3 bg-surface/20 rounded-none border border-sensor/20"
              >
                <div className="text-target font-mono font-bold text-lg">9</div>
                <div className="text-phosphor/40 font-mono text-xs">PROJECTS</div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-center p-3 bg-surface/20 rounded-none border border-sensor/20"
              >
                <div className="text-target font-mono font-bold text-lg">3</div>
                <div className="text-phosphor/40 font-mono text-xs">CATEGORIES</div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="text-center p-3 bg-surface/20 rounded-none border border-sensor/20"
              >
                <div className="text-target font-mono font-bold text-lg">100%</div>
                <div className="text-phosphor/40 font-mono text-xs">OPTIMIZED</div>
              </motion.div>
            </div>

            {/* Loading Message */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-phosphor/60 font-mono text-sm text-center"
            >
              Initializing aerospace engineering portfolio...
              <br />
              <span className="text-target/60">Preparing flight systems for takeoff.</span>
            </motion.p>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AeroLoader;