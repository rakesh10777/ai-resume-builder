import { useResume } from '../context/ResumeContext';
import './Preview.css';

export default function Preview() {
  const { resume } = useResume();
  const skillsArray = resume.skills.split(',').map(s => s.trim()).filter(Boolean);

  return (
    <div className="preview-page">
      <div className="preview-container">
        <article className="resume-preview">
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
                <div key={proj.id} className="entry">
                  <div className="entry-header">
                    <span className="entry-title">{proj.name}</span>
                    {proj.link && <span className="entry-link">{proj.link}</span>}
                  </div>
                  <p className="entry-description">{proj.description}</p>
                </div>
              ))}
            </section>
          )}

          {skillsArray.length > 0 && (
            <section className="resume-section">
              <h2>Skills</h2>
              <p className="skills-preview">{skillsArray.join(' • ')}</p>
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
  );
}
