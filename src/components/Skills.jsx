import { motion } from 'framer-motion';

const skills = [
  { category: "Hardware & Embedded", items: ["ESP32", "Arduino", "Drone Assembly", "Soldering", "Circuit Design", "Flight Controllers"] },
  { category: "Software Development", items: ["Python", "JavaScript/TypeScript", "React", "Node.js", "Express", "Firebase", "Git/GitHub"] },
  { category: "Engineering Tools", items: ["CATIA V5", "Ansys", "Fusion 360", "MATLAB"] },
  { category: "AI & Security", items: ["Local LLM Deployment", "Ollama", "Llama 3", "Network Diagnostics", "NIDS"] }
];

const Skills = () => {
  return (
    <section id="skills" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold font-mono inline-flex items-center">
            <span className="text-target mr-2">02.</span> Skills Arsenal
          </h2>
          <div className="h-px bg-gray-800 w-full max-w-xs mt-4"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skills.map((skillGroup, index) => (
            <motion.div 
              key={skillGroup.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="target-box p-6 rounded-none border border-sensor/20 hover:border-sensor/30 transition-colors"
            >
              <h3 className="text-sm md:text-base font-bold text-white mb-4 border-b border-sensor/20 pb-2 break-words">
                {skillGroup.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {skillGroup.items.map((item) => (
                  <span 
                    key={item}
                    className="px-2 py-1 bg-transparent text-target font-mono text-[10px] md:text-xs rounded-none border border-sensor/20"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
