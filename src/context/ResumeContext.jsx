import { createContext, useContext, useState, useCallback } from 'react';

const ResumeContext = createContext(null);

const initialResume = {
  personalInfo: {
    name: '',
    email: '',
    phone: '',
    location: '',
  },
  summary: '',
  education: [],
  experience: [],
  projects: [],
  skills: '',
  links: {
    github: '',
    linkedin: '',
  },
};

export function ResumeProvider({ children }) {
  const [resume, setResume] = useState(initialResume);

  const updatePersonalInfo = useCallback((field, value) => {
    setResume(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value },
    }));
  }, []);

  const updateSummary = useCallback((value) => {
    setResume(prev => ({ ...prev, summary: value }));
  }, []);

  const updateSkills = useCallback((value) => {
    setResume(prev => ({ ...prev, skills: value }));
  }, []);

  const updateLinks = useCallback((field, value) => {
    setResume(prev => ({
      ...prev,
      links: { ...prev.links, [field]: value },
    }));
  }, []);

  const addEducation = useCallback(() => {
    setResume(prev => ({
      ...prev,
      education: [...prev.education, { id: Date.now(), school: '', degree: '', year: '' }],
    }));
  }, []);

  const updateEducation = useCallback((id, field, value) => {
    setResume(prev => ({
      ...prev,
      education: prev.education.map(edu => 
        edu.id === id ? { ...edu, [field]: value } : edu
      ),
    }));
  }, []);

  const removeEducation = useCallback((id) => {
    setResume(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu.id !== id),
    }));
  }, []);

  const addExperience = useCallback(() => {
    setResume(prev => ({
      ...prev,
      experience: [...prev.experience, { id: Date.now(), company: '', role: '', duration: '', description: '' }],
    }));
  }, []);

  const updateExperience = useCallback((id, field, value) => {
    setResume(prev => ({
      ...prev,
      experience: prev.experience.map(exp => 
        exp.id === id ? { ...exp, [field]: value } : exp
      ),
    }));
  }, []);

  const removeExperience = useCallback((id) => {
    setResume(prev => ({
      ...prev,
      experience: prev.experience.filter(exp => exp.id !== id),
    }));
  }, []);

  const addProject = useCallback(() => {
    setResume(prev => ({
      ...prev,
      projects: [...prev.projects, { id: Date.now(), name: '', description: '', link: '' }],
    }));
  }, []);

  const updateProject = useCallback((id, field, value) => {
    setResume(prev => ({
      ...prev,
      projects: prev.projects.map(proj => 
        proj.id === id ? { ...proj, [field]: value } : proj
      ),
    }));
  }, []);

  const removeProject = useCallback((id) => {
    setResume(prev => ({
      ...prev,
      projects: prev.projects.filter(proj => proj.id !== id),
    }));
  }, []);

  const loadSampleData = useCallback(() => {
    setResume({
      personalInfo: {
        name: 'Alex Johnson',
        email: 'alex.johnson@email.com',
        phone: '+1 (555) 123-4567',
        location: 'San Francisco, CA',
      },
      summary: 'Full-stack developer with 5 years of experience building scalable web applications. Passionate about clean code, performance optimization, and user experience. Proven track record of delivering high-quality products in agile environments.',
      education: [
        { id: 1, school: 'Stanford University', degree: 'B.S. Computer Science', year: '2019' },
        { id: 2, school: 'UC Berkeley', degree: 'M.S. Software Engineering', year: '2021' },
      ],
      experience: [
        { id: 1, company: 'TechCorp Inc.', role: 'Senior Developer', duration: '2021 - Present', description: 'Lead development of customer-facing dashboard serving 100k+ users. Implemented microservices architecture reducing latency by 40%.' },
        { id: 2, company: 'StartupXYZ', role: 'Full Stack Developer', duration: '2019 - 2021', description: 'Built and maintained e-commerce platform from scratch. Integrated payment gateways and real-time inventory system.' },
      ],
      projects: [
        { id: 1, name: 'AI Code Assistant', description: 'VS Code extension using OpenAI API for intelligent code completion', link: 'https://github.com/alex/ai-code-assistant' },
        { id: 2, name: 'TaskFlow', description: 'Project management app with real-time collaboration features', link: 'https://taskflow.app' },
      ],
      skills: 'JavaScript, TypeScript, React, Node.js, Python, PostgreSQL, MongoDB, AWS, Docker, Kubernetes',
      links: {
        github: 'https://github.com/alexjohnson',
        linkedin: 'https://linkedin.com/in/alexjohnson',
      },
    });
  }, []);

  const value = {
    resume,
    setResume,
    updatePersonalInfo,
    updateSummary,
    updateSkills,
    updateLinks,
    addEducation,
    updateEducation,
    removeEducation,
    addExperience,
    updateExperience,
    removeExperience,
    addProject,
    updateProject,
    removeProject,
    loadSampleData,
  };

  return (
    <ResumeContext.Provider value={value}>
      {children}
    </ResumeContext.Provider>
  );
}

export function useResume() {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
}
