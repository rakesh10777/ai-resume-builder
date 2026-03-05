import { useResume } from '../context/ResumeContext';
import TemplateTabs from '../components/TemplateTabs';
import ExportButtons from '../components/ExportButtons';
import './Preview.css';

export default function Preview() {
  const { resume, template } = useResume();
  const skillsArray = resume.skills;

  const hasAnySkills = (skillsArray.technical?.length > 0) || 
                      (skillsArray.soft?.length > 0) || 
                      (skillsArray.tools?.length > 0);

  return (
    <div className="preview-page">
      <TemplateTabs />
      <ExportButtons resume={resume} template={template} />
      <div className="preview-scroll">
        <div className="preview-container">
          <article className={`resume-preview template-${template}`}>
            <header className="resume-header">
              <h1>{resume.personalInfo.name || 'Your Name'}</h1>
              <div className="contact-info">
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
                  <div key={edu.id} className="entry">
                    <div className="entry-header">
                      <span className="entry-title">{edu.school}</span>
                      <span className="entry-date">{edu.year}</span>
                    </div>
                    <div className="entry-subtitle">{edu.degree}</div>
                  </div>
                ))}
              </section>
            )}

            {resume.experience.length > 0 && (
              <section className="resume-section">
                <h2>Experience</h2>
                {resume.experience.map((exp) => (
                  <div key={exp.id} className="entry">
                    <div className="entry-header">
                      <span className="entry-title">{exp.company}</span>
                      <span className="entry-date">{exp.duration}</span>
                    </div>
                    <div className="entry-subtitle">{exp.role}</div>
                    <p className="entry-description">{exp.description}</p>
                  </div>
                ))}
              </section>
            )}

            {resume.projects.length > 0 && (
              <section className="resume-section">
                <h2>Projects</h2>
                {resume.projects.map((proj) => (
                  <div key={proj.id} className="entry project-entry">
                    <div className="entry-header">
                      <span className="entry-title">{proj.title}</span>
                      <div className="project-links-row">
                        {proj.githubUrl && (
                          <a href={proj.githubUrl} target="_blank" rel="noopener noreferrer" className="entry-link">
                            GitHub
                          </a>
                        )}
                        {proj.liveUrl && (
                          <a href={proj.liveUrl} target="_blank" rel="noopener noreferrer" className="entry-link">
                            Live
                          </a>
                        )}
                      </div>
                    </div>
                    {proj.description && <p className="entry-description">{proj.description}</p>}
                    {(proj.techStack || []).length > 0 && (
                      <div className="project-tech-preview">
                        {proj.techStack.join(' • ')}
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
                  <div className="skill-group-preview">
                    <strong>Technical:</strong> {skillsArray.technical.join(', ')}
                  </div>
                )}
                {skillsArray.soft?.length > 0 && (
                  <div className="skill-group-preview">
                    <strong>Soft Skills:</strong> {skillsArray.soft.join(', ')}
                  </div>
                )}
                {skillsArray.tools?.length > 0 && (
                  <div className="skill-group-preview">
                    <strong>Tools:</strong> {skillsArray.tools.join(', ')}
                  </div>
                )}
              </section>
            )}

            {(resume.links.github || resume.links.linkedin) && (
              <section className="resume-section">
                <h2>Links</h2>
                <p className="links-preview">
                  {resume.links.github && <span>{resume.links.github}</span>}
                  {resume.links.github && resume.links.linkedin && <span> • </span>}
                  {resume.links.linkedin && <span>{resume.links.linkedin}</span>}
                </p>
              </section>
            )}
          </article>
        </div>
      </div>
    </div>
  );
}
