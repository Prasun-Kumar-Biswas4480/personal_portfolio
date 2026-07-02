import { Mail } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="target-box border-t border-sensor/20 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <span className="font-mono text-lg font-bold text-gradient">
              Prasun Kumar Biswas
            </span>
            <p className="text-sm text-phosphor/60 mt-1">
              Building at the intersection of hardware, aerospace, and AI.
            </p>
          </div>
          
          <div className="flex space-x-6">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-phosphor/60 hover:text-target transition-colors"
            >
              <span className="sr-only">GitHub</span>
              <FaGithub className="h-6 w-6" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-phosphor/60 hover:text-target transition-colors"
            >
              <span className="sr-only">LinkedIn</span>
              <FaLinkedin className="h-6 w-6" />
            </a>
            <a
              href="mailto:prasun.oct27@gmail.com"
              className="text-phosphor/60 hover:text-target transition-colors"
            >
              <span className="sr-only">Email</span>
              <Mail className="h-6 w-6" />
            </a>
          </div>
        </div>
        
        <div className="mt-8 border-t border-sensor/20 pt-8 flex items-center justify-center">
          <p className="text-sm text-phosphor/60 font-mono">
            &copy; {currentYear} Prasun Kumar Biswas. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
