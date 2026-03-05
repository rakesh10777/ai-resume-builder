import { useState } from 'react';
import TagInput from './TagInput';
import './ProjectCard.css';

export default function ProjectCard({ project, onUpdate, onRemove, onAddTech, onRemoveTech }) {
  const [isOpen, setIsOpen] = useState(true);
  const [techInput, setTechInput] = useState('');

  const handleTechKeyDown = (e) => {
    if (e.key === 'Enter' && techInput.trim()) {
      e.preventDefault();
      onAddTech(project.id, techInput.trim());
      setTechInput('');
    }
  };

  const descriptionLength = project.description?.length || 0;

  return (
    <div className="project-card">
      <div className="project-header" onClick={() => setIsOpen(!isOpen)}>
        <span className="project-toggle">{isOpen ? '▼' : '▶'}</span>
        <span className="project-title-display">
          {project.title || 'New Project'}
        </span>
        <button 
          className="btn-delete-project" 
          onClick={(e) => {
            e.stopPropagation();
            onRemove(project.id);
          }}
        >
          Delete
        </button>
      </div>
      
      {isOpen && (
        <div className="project-content">
          <div className="input-field">
            <label>Project Title</label>
            <input
              type="text"
              value={project.title}
              onChange={(e) => onUpdate(project.id, 'title', e.target.value)}
              placeholder="My Awesome Project"
            />
          </div>
          
          <div className="input-field">
            <label>Description <span className="char-count">({descriptionLength}/200)</span></label>
            <textarea
              value={project.description}
              onChange={(e) => {
                if (e.target.value.length <= 200) {
                  onUpdate(project.id, 'description', e.target.value);
                }
              }}
              placeholder="Brief description of what you built..."
              rows={3}
            />
          </div>
          
          <div className="input-field">
            <label>Tech Stack</label>
            <div className="tech-stack-container">
              <div className="tech-tags">
                {(project.techStack || []).map((tech, index) => (
                  <span key={index} className="tech-tag">
                    {tech}
                    <button 
                      type="button" 
                      className="tech-remove"
                      onClick={() => onRemoveTech(project.id, tech)}
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              <input
                type="text"
                className="tech-input"
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                onKeyDown={handleTechKeyDown}
                placeholder={(project.techStack || []).length === 0 ? 'Type and press Enter' : ''}
              />
            </div>
          </div>
          
          <div className="form-row">
            <div className="input-field">
              <label>Live URL (optional)</label>
              <input
                type="url"
                value={project.liveUrl || ''}
                onChange={(e) => onUpdate(project.id, 'liveUrl', e.target.value)}
                placeholder="https://myproject.vercel.app"
              />
            </div>
            <div className="input-field">
              <label>GitHub URL (optional)</label>
              <input
                type="url"
                value={project.githubUrl || ''}
                onChange={(e) => onUpdate(project.id, 'githubUrl', e.target.value)}
                placeholder="https://github.com/username/repo"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
