import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink } from 'lucide-react';

const ProjectModal = ({ project, isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // We don't return null here so AnimatePresence can run exit animations

  const getProjectDetails = (projectId) => {
    const details = {
      1: {
        title: "Boeing Aeromodelling Competition",
        subtitle: "Team Leadership & Aircraft Design",
        description: "Led Team Wingineers in designing and building a competitive RC aircraft, optimizing for payload capacity and flight stability. The project involved comprehensive aerodynamic analysis, structural design, and team coordination to compete at the regional level.",
        fullDescription: "As the team leader of Wingineers, I spearheaded the design and construction of a competitive RC aircraft for the Boeing Aeromodelling Competition. The project involved:",
        challenges: [
          "Designing an aircraft structure that could accommodate payload requirements while maintaining optimal weight distribution",
          "Coordinating a team of 4 engineers across design, fabrication, and testing phases",
          "Performing aerodynamic analysis to optimize flight stability and control",
          "Managing time constraints to meet competition deadlines"
        ],
        images: [
          "/images/projects/boeing-aeromodelling-1.jpg",
          "/images/projects/boeing-aeromodelling-2.jpg"
        ],
        technologies: ["Aerodynamics", "RC Aircraft", "Leadership", "Structural Design", "Team Management"],
        outcome: "Successfully qualified for regional competition and gained valuable experience in aerospace project management and team leadership."
      },
      2: {
        title: "UAV CAD & Simulation",
        subtitle: "3D Aircraft Component Design & Analysis",
        description: "Developed 3D aircraft component models using CATIA V5 and performed structural/aerodynamic simulation analysis via Ansys. This comprehensive project involved creating detailed digital twins of aircraft components for optimization and validation.",
        fullDescription: "Created detailed 3D models of aircraft components using CATIA V5, then performed comprehensive simulation analysis using Ansys to validate design performance and optimize structural integrity.",
        challenges: [
          "Mastering CATIA V5 for complex aircraft component modeling",
          "Setting up accurate Ansys simulation parameters for aerodynamic analysis",
          "Interpreting simulation results to optimize component design",
          "Validating design against industry standards and requirements"
        ],
        images: [
          "/images/projects/uav-cad-1.png",
          "/images/projects/uav-cad-2.png"
        ],
        technologies: ["CATIA V5", "Ansys", "CFD", "FEA", "3D Modeling", "Simulation"],
        outcome: "Produced high-fidelity aircraft component models and validated designs through comprehensive simulation analysis, ensuring optimal performance and structural integrity."
      },
      3: {
        title: "Custom FPV Drones",
        subtitle: "DIY Drone Assembly & Tuning",
        description: "Built and fine-tuned 6S power setups and Tiny Whoops from scratch, optimizing PID controllers for aggressive freestyle flight. This hands-on project involved complete drone assembly, electronics integration, and performance optimization.",
        fullDescription: "Assembled and customized FPV drones from scratch, focusing on creating high-performance platforms for freestyle flying. The project involved complete system integration from power distribution to flight controller calibration.",
        challenges: [
          "Designing and building custom 6S power systems for optimal performance",
          "Soldering and assembling complex electronic components",
          "Tuning PID controllers for aggressive flight characteristics",
          "Optimizing weight distribution for agile maneuverability"
        ],
        images: [
          "/images/projects/fpv-drone-1.jpg",
          "/images/projects/fpv-drone-2.jpg"
        ],
        technologies: ["Betaflight", "Soldering", "LiPo", "Electronics", "PID Tuning", "Aerospace"],
        outcome: "Created high-performance FPV drones capable of aggressive freestyle flight with optimized control systems and reliable power delivery."
      },
      4: {
        title: "Wi-Fi Sentinel (NIDS)",
        subtitle: "Network Intrusion Detection System",
        description: "A Network Intrusion Detection System built with ESP32 to monitor local network traffic and identify anomalous patterns. This cybersecurity project involved real-time packet analysis and threat detection capabilities.",
        fullDescription: "Developed a comprehensive Network Intrusion Detection System using ESP32 microcontroller to monitor and analyze network traffic patterns. The system identifies potential security threats and anomalous activities in real-time.",
        challenges: [
          "Implementing real-time packet capture and analysis on ESP32",
          "Developing algorithms to detect network anomalies and threats",
          "Creating a user-friendly interface for monitoring system status",
          "Optimizing performance for continuous network surveillance"
        ],
        images: [
          "/images/projects/nids-1.jpg",
          "/images/projects/nids-2.jpg"
        ],
        technologies: ["ESP32", "C++", "Networking", "Cybersecurity", "Packet Analysis", "Real-time Processing"],
        outcome: "Successfully deployed a functional NIDS capable of detecting and alerting on potential network security threats, presented at college expos."
      },
      5: {
        title: "Sky Node",
        subtitle: "Disaster Communication Mesh Network",
        description: "A disaster communication payload utilizing microcontrollers to establish emergency mesh networks when primary infrastructure fails. This critical communication system ensures connectivity during emergency situations.",
        fullDescription: "Designed and implemented a disaster communication payload using microcontrollers to create resilient mesh networks that can operate independently when traditional communication infrastructure is compromised. The system provides critical communication capabilities during emergency situations.",
        challenges: [
          "Designing a self-healing mesh network topology",
          "Implementing robust error correction and data transmission protocols",
          "Creating a compact, energy-efficient hardware solution",
          "Ensuring reliable communication in challenging environmental conditions"
        ],
        images: [
          "/images/projects/sky-node-1.jpg",
          "/images/projects/sky-node-2.jpg"
        ],
        technologies: ["LoRa", "Arduino", "Mesh Networking", "Emergency Communications", "Embedded Systems"],
        outcome: "Created a reliable disaster communication system capable of establishing emergency networks in areas where traditional infrastructure has failed."
      },
      6: {
        title: "Local AI Infrastructure",
        subtitle: "Offline LLM Deployment",
        description: "Deployed Ollama and Llama 3 models on personal hardware to enable completely offline, private AI inference pipelines. This project demonstrates the ability to run sophisticated AI models locally without internet connectivity.",
        fullDescription: "Set up a complete AI inference pipeline using Ollama to run Llama 3 models locally on personal hardware. The system provides private, offline AI capabilities for various applications including text generation, analysis, and automation.",
        challenges: [
          "Optimizing hardware configuration for AI model inference",
          "Setting up and configuring Ollama for local model deployment",
          "Implementing efficient memory management for large language models",
          "Creating a user-friendly interface for AI interaction"
        ],
        images: [
          "/images/projects/ai-infra-1.jpg",
          "/images/projects/ai-infra-2.jpg"
        ],
        technologies: ["Ollama", "Llama 3", "Python", "Local LLMs", "AI Infrastructure", "Edge Computing"],
        outcome: "Successfully deployed a complete offline AI inference pipeline capable of running sophisticated language models locally, ensuring complete privacy and data security."
      },
      7: {
        title: "Business Management Web App",
        subtitle: "Full-Stack MERN Application",
        description: "Full-stack MERN application integrating Firebase Realtime Database for business inventory and sales tracking. This comprehensive solution streamlines business operations through real-time data management and visualization.",
        fullDescription: "Developed a complete business management web application using the MERN stack (MongoDB, Express.js, React, Node.js) with Firebase Realtime Database integration. The application provides comprehensive inventory management, sales tracking, and data visualization capabilities for small businesses.",
        challenges: [
          "Designing a scalable database schema for business operations",
          "Implementing real-time data synchronization with Firebase",
          "Creating an intuitive user interface for business analytics",
          "Ensuring data security and backup mechanisms"
        ],
        images: [
          "/images/projects/business-app-1.jpg",
          "/images/projects/business-app-2.jpg"
        ],
        technologies: ["React", "Node.js", "Firebase", "MongoDB", "Express.js", "Full-Stack", "Business Logic"],
        outcome: "Delivered a functional business management solution that streamlines inventory tracking and sales analytics, improving operational efficiency for small businesses."
      }
    };
    
    return details[projectId] || {};
  };

  const details = project ? getProjectDetails(project.id) : null;

  return createPortal(
    <AnimatePresence>
      {isOpen && project && details && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: -20 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-void border border-sensor/30 rounded-none max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 p-2 bg-surface/80 hover:bg-target/20 rounded-none transition-colors"
              >
                <X className="h-5 w-5 text-project" />
              </button>
              
              <div className="p-8">
                <div className="mb-6">
                  <h2 className="text-3xl font-bold text-white mb-2">{details.title}</h2>
                  <h3 className="text-xl text-target font-mono mb-4">{details.subtitle}</h3>
                  <p className="text-project/60 text-lg leading-relaxed mb-6">{details.description}</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h4 className="text-lg font-bold text-white mb-3">Project Overview</h4>
                    <p className="text-project/60 leading-relaxed mb-4">{details.fullDescription}</p>
                    
                    <h4 className="text-lg font-bold text-white mb-3">Key Challenges</h4>
                    <ul className="space-y-2">
                      {details.challenges.map((challenge, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-target mt-1">▸</span>
                          <span className="text-project/60 text-sm">{challenge}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-bold text-white mb-3">Technologies Used</h4>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {details.technologies.map((tech, index) => (
                        <span key={index} className="px-3 py-1 bg-transparent text-target font-mono text-xs rounded-none border border-sensor/20">
                          {tech}
                        </span>
                      ))}
                    </div>
                    
                    <h4 className="text-lg font-bold text-white mb-3">Outcome</h4>
                    <p className="text-project/60 leading-relaxed">{details.outcome}</p>
                  </div>
                </div>
                
                <div className="border-t border-sensor/20 pt-6">
                  <h4 className="text-lg font-bold text-white mb-4">Project Gallery</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {details.images.map((image, index) => (
                      <div key={index} className="aspect-video bg-surface/50 border border-sensor/20 rounded-none overflow-hidden">
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-project/40 font-mono text-sm">Image Placeholder {index + 1}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="border-t border-sensor/20 pt-6 mt-6 flex gap-4">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-hud inline-flex items-center gap-2"
                    >
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.069 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.536-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.472 5.931.43.372.823 1.102.823 2.222v3.293c0 .316.192.694.801.576 4.765-1.587 8.208-6.085 8.208-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                      View Code
                    </a>
                  )}
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-hud inline-flex items-center gap-2"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Live Demo
                    </a>
                  )}
                </div>
                
                <div className="mt-6 pt-4 border-t border-sensor/20">
                  <p className="text-xs text-project/40 font-mono">
                    Contact: <a href="mailto:prasun.oct27@gmail.com" className="text-target hover:underline">prasun.oct27@gmail.com</a>
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default ProjectModal;