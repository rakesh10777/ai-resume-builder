import './LivePreview.css';

export default function LivePreview({ resume }) {
  const skillsArray = resume.skills.split(',').map(s => s.trim()).filter(Boolean);

  return (
    <div className="live-preview">
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
              <div key={proj.id} className="resume-item">
                <div className="item-header">
                  <strong>{proj.name}</strong>
                  {proj.link && <span className="item-link">{proj.link}</span>}
                </div>
                <p className="item-description">{proj.description}</p>
              </div>
            ))}
          </section>
        )}

        {skillsArray.length > 0 && (
          <section className="resume-section">
            <h2>Skills</h2>
            <div className="skills-list">
              {skillsArray.map((skill, index) => (
                <span key={index} className="skill-tag">{skill}</span>
              ))}
            </div>
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
