import { useResume } from '../../context/ResumeContext';
import './LivePreview.css';

export default function LivePreview({ resume, accentColor }) {
  const { template } = useResume();
  const skillsArray = resume.skills;

  const hasAnySkills = (skillsArray.technical?.length > 0) || 
                      (skillsArray.soft?.length > 0) || 
                      (skillsArray.tools?.length > 0);

  return (
    <div className={`live-preview template-${template}`} style={{ '--accent-color': accentColor }}>
      <div className="resume-document">
        <header className="resume-header">
          <h1 className="resume-name">{resume.personalInfo.name || 'Your Name'}</h1>
          <div className="resume-contact">
            {resume.personalInfo.email && <span>{resume.personalInfo.email}</span>}
            {resume.personalInfo.phone && <span>{resume.personalInfo.phone}</span>}
            {resume.personalInfo.location && <span>{resume.personalInfo.location}</span>}
          </div>
        </header>

        {resume.summary && (
          <section className="resume-section">
            <h2>Summary</h2>
            <p>{resume.summary}</p>
          </section>
        )}

        {resume.education.length > 0 && (
          <section className="resume-section">
            <h2>Education</h2>
            {resume.education.map((edu) => (
              <div key={edu.id} className="resume-item">
                <div className="item-header">
                  <strong>{edu.school}</strong>
                  <span>{edu.year}</span>
                </div>
                <p>{edu.degree}</p>
              </div>
            ))}
          </section>
        )}

        {resume.experience.length > 0 && (
          <section className="resume-section">
            <h2>Experience</h2>
            {resume.experience.map((exp) => (
              <div key={exp.id} className="resume-item">
                <div className="item-header">
                  <strong>{exp.company}</strong>
                  <span>{exp.duration}</span>
                </div>
                <p className="item-role">{exp.role}</p>
                <p className="item-description">{exp.description}</p>
              </div>
            ))}
          </section>
        )}

        {resume.projects.length > 0 && (
          <section className="resume-section">
            <h2>Projects</h2>
            {resume.projects.map((proj) => (
              <div key={proj.id} className="project-card-preview">
                <div className="project-card-header">
                  <strong className="project-name">{proj.title}</strong>
                  <div className="project-links">
                    {proj.githubUrl && (
                      <a href={proj.githubUrl} target="_blank" rel="noopener noreferrer" className="project-link-icon">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                      </a>
                    )}
                    {proj.liveUrl && (
                      <a href={proj.liveUrl} target="_blank" rel="noopener noreferrer" className="project-link-icon">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                          <polyline points="15 3 21 3 21 9"></polyline>
                          <line x1="10" y1="14" x2="21" y2="3"></line>
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
                {proj.description && <p className="project-description">{proj.description}</p>}
                {(proj.techStack || []).length > 0 && (
                  <div className="project-tech">
                    {proj.techStack.map((tech, index) => (
                      <span key={index} className="tech-pill">{tech}</span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </section>
        )}

        {hasAnySkills && (
          <section className="resume-section">
            <h2>Skills</h2>
            {skillsArray.technical?.length > 0 && (
              <div className="skill-group">
                <span className="skill-group-label">Technical:</span>
                <div className="skills-list">
                  {skillsArray.technical.map((skill, index) => (
                    <span key={index} className="skill-tag">{skill}</span>
                  ))}
                </div>
              </div>
            )}
            {skillsArray.soft?.length > 0 && (
              <div className="skill-group">
                <span className="skill-group-label">Soft Skills:</span>
                <div className="skills-list">
                  {skillsArray.soft.map((skill, index) => (
                    <span key={index} className="skill-tag">{skill}</span>
                  ))}
                </div>
              </div>
            )}
            {skillsArray.tools?.length > 0 && (
              <div className="skill-group">
                <span className="skill-group-label">Tools:</span>
                <div className="skills-list">
                  {skillsArray.tools.map((skill, index) => (
                    <span key={index} className="skill-tag">{skill}</span>
                  ))}
                </div>
              </div>
            )}
          </section>
        )}

        {(resume.links.github || resume.links.linkedin) && (
          <section className="resume-section">
            <h2>Links</h2>
            <div className="links-list">
              {resume.links.github && <span>{resume.links.github}</span>}
              {resume.links.linkedin && <span>{resume.links.linkedin}</span>}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
