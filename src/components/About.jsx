import { motion } from 'framer-motion';
import { Cpu, Plane, Code2 } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="py-20 target-box">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold font-mono inline-flex items-center">
            <span className="text-target mr-2">01.</span> About Me
          </h2>
          <div className="h-px bg-gray-800 w-full max-w-xs mt-4"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-6 text-phosphor/60 text-lg"
          >
            <p>
              I am a multidisciplinary engineer studying at <span className="text-white">Centurion University of Technology and Management (CUTM)</span>. 
              My journey began with a fascination for flight and evolved into a deep dive into the systems that make autonomous and intelligent machines possible.
            </p>
            <p>
              My core philosophy centers around building from the ground up. Whether it's designing the physical airframe of a drone, soldering the flight controller, or deploying a local Large Language Model to process telemetry data, I thrive at the intersection of hardware and software.
            </p>
            <p>
              I don't just write code; I engineer systems that interact with the physical world.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            <div className="p-6 bg-transparent rounded-none border border-sensor/20 hover:border-sensor/50 transition-colors">
              <Plane className="text-target h-8 w-8 mb-4" />
              <h3 className="text-sm md:text-base font-bold text-white mb-2 break-words">Aerospace</h3>
              <p className="text-sm text-phosphor/60">Flight mechanics, 3D CAD modeling, and CFD simulations.</p>
            </div>
            <div className="p-6 bg-transparent rounded-none border border-sensor/20 hover:border-sensor/50 transition-colors">
              <Cpu className="text-target h-8 w-8 mb-4" />
              <h3 className="text-sm md:text-base font-bold text-white mb-2 break-words">Hardware</h3>
              <p className="text-sm text-phosphor/60">Embedded systems, custom drone builds, and circuit design.</p>
            </div>
            <div className="p-6 bg-transparent rounded-none border border-sensor/20 hover:border-sensor/50 transition-colors sm:col-span-2">
              <Code2 className="text-target h-8 w-8 mb-4" />
              <h3 className="text-sm md:text-base font-bold text-white mb-2 break-words">Software & AI</h3>
              <p className="text-sm text-phosphor/60">Full-stack web development and local LLM deployment (Ollama, Llama 3) for edge computing.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
