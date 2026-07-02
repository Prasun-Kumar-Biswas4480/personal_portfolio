import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const ScrollContext = createContext(null);

export const ScrollProvider = ({ children }) => {
  const [activeSection, setActiveSection] = useState('hero');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [sectionProgress, setSectionProgress] = useState({});

  const sections = ['hero', 'about', 'skills', 'projects', 'contact'];

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight - windowHeight;
    const totalProgress = Math.min(scrollY / documentHeight, 1);
    setScrollProgress(totalProgress);

    const sectionPositions = {};
    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) {
        const rect = element.getBoundingClientRect();
        const elementTop = rect.top + scrollY;
        const elementHeight = rect.height;
        const sectionStart = elementTop - windowHeight * 0.3;
        const sectionEnd = elementTop + elementHeight - windowHeight * 0.7;
        const progress = Math.max(0, Math.min(1, (scrollY - sectionStart) / (sectionEnd - sectionStart)));
        sectionPositions[sectionId] = progress;

        if (progress > 0.5 && progress < 1.5) {
          setActiveSection(sectionId);
        }
      }
    });
    setSectionProgress(sectionPositions);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    // Defer the initial measurement to the next frame so we don't call
    // setState synchronously during the effect (avoids cascading renders).
    const raf = requestAnimationFrame(handleScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return (
    <ScrollContext.Provider value={{ activeSection, scrollProgress, sectionProgress }}>
      {children}
    </ScrollContext.Provider>
  );
};

export const useScroll = () => {
  const context = useContext(ScrollContext);
  if (!context) {
    throw new Error('useScroll must be used within a ScrollProvider');
  }
  return context;
};