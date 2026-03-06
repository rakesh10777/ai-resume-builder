import { useState, useEffect } from 'react';
import './ExportButtons.css';

export default function ExportButtons({ resume }) {
  const [copied, setCopied] = useState(false);
  const [warning, setWarning] = useState('');
  const [toast, setToast] = useState(false);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const hasName = resume.personalInfo.name.trim().length > 0;
  const hasContent = resume.experience.length > 0 || resume.projects.length > 0;

  const generatePlainText = () => {
    const skillsArray = resume.skills;
    
    let text = '';
    
    text += resume.personalInfo.name || 'Your Name';
    text += '\n';
    
    const contactParts = [];
    if (resume.personalInfo.email) contactParts.push(resume.personalInfo.email);
    if (resume.personalInfo.phone) contactParts.push(resume.personalInfo.phone);
    if (resume.personalInfo.location) contactParts.push(resume.personalInfo.location);
    text += contactParts.join(' | ');
    text += '\n\n';

    if (resume.summary) {
      text += 'SUMMARY\n';
      text += '-'.repeat(40) + '\n';
      text += resume.summary + '\n\n';
    }

    if (resume.education.length > 0) {
      text += 'EDUCATION\n';
      text += '-'.repeat(40) + '\n';
      resume.education.forEach(edu => {
        text += `${edu.school} (${edu.year})\n`;
        text += `${edu.degree}\n\n`;
      });
    }

    if (resume.experience.length > 0) {
      text += 'EXPERIENCE\n';
      text += '-'.repeat(40) + '\n';
      resume.experience.forEach(exp => {
        text += `${exp.company} | ${exp.duration}\n`;
        text += `${exp.role}\n`;
        text += `${exp.description}\n\n`;
      });
    }

    if (resume.projects.length > 0) {
      text += 'PROJECTS\n';
      text += '-'.repeat(40) + '\n';
      resume.projects.forEach(proj => {
        text += `${proj.title}\n`;
        text += `${proj.description}\n`;
        if (proj.techStack?.length > 0) text += `Tech: ${proj.techStack.join(', ')}\n`;
        if (proj.liveUrl) text += `Live: ${proj.liveUrl}\n`;
        if (proj.githubUrl) text += `GitHub: ${proj.githubUrl}\n`;
        text += '\n';
      });
    }

    const hasAnySkills = (skillsArray.technical?.length > 0) || 
                        (skillsArray.soft?.length > 0) || 
                        (skillsArray.tools?.length > 0);

    if (hasAnySkills) {
      text += 'SKILLS\n';
      text += '-'.repeat(40) + '\n';
      if (skillsArray.technical?.length > 0) {
        text += `Technical: ${skillsArray.technical.join(', ')}\n`;
      }
      if (skillsArray.soft?.length > 0) {
        text += `Soft Skills: ${skillsArray.soft.join(', ')}\n`;
      }
      if (skillsArray.tools?.length > 0) {
        text += `Tools: ${skillsArray.tools.join(', ')}\n`;
      }
      text += '\n';
    }

    if (resume.links.github || resume.links.linkedin) {
      text += 'LINKS\n';
      text += '-'.repeat(40) + '\n';
      if (resume.links.github) text += `GitHub: ${resume.links.github}\n`;
      if (resume.links.linkedin) text += `LinkedIn: ${resume.links.linkedin}\n`;
    }

    return text;
  };

  const checkAndWarn = () => {
    if (!hasName || !hasContent) {
      setWarning('Your resume may look incomplete.');
      setTimeout(() => setWarning(''), 4000);
    }
  };

  const handlePrint = () => {
    checkAndWarn();
    setToast(true);
    setTimeout(() => {
      window.print();
    }, 100);
  };

  const handleCopyText = () => {
    checkAndWarn();
    const text = generatePlainText();
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="export-buttons">
      <button className="btn-export btn-print" onClick={handlePrint}>
        Print / Save as PDF
      </button>
      <button className="btn-export btn-copy" onClick={handleCopyText}>
        {copied ? 'Copied!' : 'Copy Resume as Text'}
      </button>
      {warning && <div className="export-warning">{warning}</div>}
      {toast && <div className="export-toast">PDF export ready! Check your downloads.</div>}
    </div>
  );
}
