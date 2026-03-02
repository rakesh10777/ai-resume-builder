import { createContext, useContext, useState, useCallback, useEffect } from 'react';

const ResumeContext = createContext(null);

const STORAGE_KEY = 'resumeBuilderData';
const TEMPLATE_KEY = 'resumeBuilderTemplate';

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

function loadFromStorage() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error('Failed to load from localStorage:', e);
  }
  return initialResume;
}

function saveToStorage(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error('Failed to save to localStorage:', e);
  }
}

function loadTemplateFromStorage() {
  try {
    const stored = localStorage.getItem(TEMPLATE_KEY);
    if (stored) {
      return stored;
    }
  } catch (e) {
    console.error('Failed to load template from localStorage:', e);
  }
  return 'classic';
}

function saveTemplateToStorage(template) {
  try {
    localStorage.setItem(TEMPLATE_KEY, template);
  } catch (e) {
    console.error('Failed to save template to localStorage:', e);
  }
}

function countWords(text) {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function hasNumbers(text) {
  return /[\d%XxkK]/.test(text);
}

const ACTION_VERBS = ['Built', 'Developed', 'Designed', 'Implemented', 'Led', 'Improved', 'Created', 'Optimized', 'Automated', 'Managed', 'Created', 'Established', 'Launched', 'Delivered', 'Reduced', 'Increased', 'Built', 'Engineered', 'Architected', 'Spearheaded'];

function startsWithActionVerb(text) {
  const trimmed = text.trim();
  return ACTION_VERBS.some(verb => trimmed.toLowerCase().startsWith(verb.toLowerCase()));
}

function calculateATSScore(resume) {
  let score = 0;
  const suggestions = [];

  const summaryWords = countWords(resume.summary);
  if (summaryWords >= 40 && summaryWords <= 120) {
    score += 15;
  } else {
    suggestions.push('Write a stronger summary (40–120 words).');
  }

  if (resume.projects.length >= 2) {
    score += 10;
  } else {
    suggestions.push('Add at least 2 projects.');
  }

  if (resume.experience.length >= 1) {
    score += 10;
  } else {
    suggestions.push('Add at least 1 experience entry.');
  }

  const skillsArray = resume.skills.split(',').map(s => s.trim()).filter(Boolean);
  if (skillsArray.length >= 8) {
    score += 10;
  } else {
    suggestions.push('Add more skills (target 8+).');
  }

  if (resume.links.github || resume.links.linkedin) {
    score += 10;
  } else {
    suggestions.push('Add GitHub or LinkedIn link.');
  }

  const hasNumbersInBullets = resume.experience.some(exp => hasNumbers(exp.description)) ||
                              resume.projects.some(proj => hasNumbers(proj.description));
  if (hasNumbersInBullets) {
    score += 15;
  } else {
    suggestions.push('Add measurable impact (numbers) in bullets.');
  }

  const completeEducation = resume.education.filter(edu => edu.school && edu.degree && edu.year);
  if (completeEducation.length > 0) {
    score += 10;
  } else {
    suggestions.push('Complete all education fields.');
  }

  score = Math.min(score, 100);

  return { score, suggestions: suggestions.slice(0, 3) };
}

function calculateImprovements(resume) {
  const improvements = [];
  const summaryWords = countWords(resume.summary);
  const skillsArray = resume.skills.split(',').map(s => s.trim()).filter(Boolean);

  if (resume.projects.length < 2) {
    improvements.push('Add more projects to showcase your skills');
  }

  const hasNumbersInBullets = resume.experience.some(exp => hasNumbers(exp.description)) ||
                              resume.projects.some(proj => hasNumbers(proj.description));
  if (!hasNumbersInBullets) {
    improvements.push('Add measurable impact with numbers in your bullets');
  }

  if (summaryWords < 40) {
    improvements.push('Expand your summary to at least 40 words');
  }

  if (skillsArray.length < 8) {
    improvements.push('Add more skills (target 8+)');
  }

  if (resume.experience.length === 0) {
    improvements.push('Add experience or internship work');
  }

  return improvements.slice(0, 3);
}

export function ResumeProvider({ children }) {
  const [resume, setResume] = useState(loadFromStorage);
  const [template, setTemplate] = useState(loadTemplateFromStorage);
  const [atsScore, setAtsScore] = useState({ score: 0, suggestions: [] });
  const [improvements, setImprovements] = useState([]);

  useEffect(() => {
    saveToStorage(resume);
    setAtsScore(calculateATSScore(resume));
    setImprovements(calculateImprovements(resume));
  }, [resume]);

  useEffect(() => {
    saveTemplateToStorage(template);
  }, [template]);

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

  const clearData = useCallback(() => {
    setResume(initialResume);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const value = {
    resume,
    setResume,
    template,
    setTemplate,
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
    clearData,
    atsScore,
    improvements,
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
