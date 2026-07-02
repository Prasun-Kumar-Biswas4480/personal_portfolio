import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';

const projectsData = [
  {
    id: 1,
    title: "Boeing Aeromodelling Competition",
    description: "Led Team Wingineers in designing and building a competitive RC aircraft, optimizing for payload capacity and flight stability.",
    category: "Aerospace",
    tags: ["Aerodynamics", "RC Aircraft", "Leadership", "Structural Design"],
    github: null,
    link: null
  },
  {
    id: 2,
    title: "UAV CAD & Simulation",
    description: "Developed 3D aircraft component models using CATIA V5 and performed structural/aerodynamic simulation analysis via Ansys.",
    category: "Aerospace",
    tags: ["CATIA V5", "Ansys", "CFD", "FEA"],
    github: null,
    link: null
  },
  {
    id: 3,
    title: "Custom FPV Drones",
    description: "Built and fine-tuned 6S power setups and Tiny Whoops from scratch, optimizing PID controllers for aggressive freestyle flight.",
    category: "Hardware",
    tags: ["Betaflight", "Soldering", "LiPo", "Electronics"],
    github: null,
    link: null
  },
  {
    id: 4,
    title: "Wi-Fi Sentinel (NIDS)",
    description: "A Network Intrusion Detection System built with ESP32 to monitor local network traffic and identify anomalous patterns.",
    category: "Hardware",
    tags: ["ESP32", "C++", "Networking", "Cybersecurity"],
    github: "https://github.com",
    link: null
  },
  {
    id: 5,
    title: "Sky Node",
    description: "A disaster communication payload utilizing microcontrollers to establish emergency mesh networks when primary infrastructure fails.",
    category: "Hardware",
    tags: ["LoRa", "Arduino", "Mesh Networking"],
    github: null,
    link: null
  },
  {
    id: 6,
    title: "Local AI Infrastructure",
    description: "Deployed Ollama and Llama 3 models on personal hardware to enable completely offline, private AI inference pipelines.",
    category: "Software & AI",
    tags: ["Ollama", "Llama 3", "Python", "Local LLMs"],
    github: "https://github.com",
    link: null
  },
  {
    id: 7,
    title: "Business Management Web App",
    description: "Full-stack MERN application integrating Firebase Realtime Database for business inventory and sales tracking.",
    category: "Software & AI",
    tags: ["React", "Node.js", "Firebase", "MongoDB"],
    github: "https://github.com",
    link: "https://example.com"
  }
];

const categories = ["All", "Aerospace", "Hardware", "Software & AI"];

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects = activeCategory === "All" 
    ? projectsData 
    : projectsData.filter(project => project.category === activeCategory);

  return (
    <section id="projects" className="py-20 relative overflow-hidden">
      {/* Background Refraction Orbs have been moved to App.jsx for global scope */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div className="group">
            <h2 className="text-3xl font-heading inline-flex items-center tracking-widest text-sensor">
              <span className="text-target mr-4">03.</span> ACTIVE_OPERATIONS
            </h2>
            <div className="h-px bg-sensor/20 w-full max-w-md mt-4 transition-all group-hover:max-w-lg group-hover:bg-target/40"></div>
          </div>
          
          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-none text-xs font-mono uppercase tracking-widest transition-all ${
                  activeCategory === category 
                    ? 'bg-target text-white font-bold border border-target' 
                    : 'bg-void/40 backdrop-blur-md text-project/60 hover:text-target border border-sensor/20 hover:border-target/50'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-12"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, ease: "circOut" }}
                className={index % 3 === 1 ? "lg:translate-y-12" : ""}
              >
                <ProjectCard 
                  project={project} 
                  index={index}
                  onClick={() => setSelectedProject(project)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <ProjectModal
          project={selectedProject}
          isOpen={selectedProject !== null}
          onClose={() => setSelectedProject(null)}
        />
      </div>
    </section>
  );
};

export default Projects;
