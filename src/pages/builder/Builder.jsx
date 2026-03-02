import { useResume } from '../../context/ResumeContext';
import ATSScore from '../../components/ATSScore';
import LivePreview from './LivePreview';
import './Builder.css';

function FormSection({ title, children }) {
  return (
    <div className="form-section">
      <h3 className="section-title">{title}</h3>
      {children}
    </div>
  );
}

function InputField({ label, value, onChange, placeholder, type = 'text' }) {
  return (
    <div className="input-field">
      <label>{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
}

function TextAreaField({ label, value, onChange, placeholder, rows = 4 }) {
  return (
    <div className="input-field">
      <label>{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
      />
    </div>
  );
}

export default function Builder() {
  const {
    resume,
    atsScore,
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
  } = useResume();

  return (
    <div className="builder-page">
      <div className="builder-header">
        <h2>Resume Builder</h2>
        <button className="btn-sample" onClick={loadSampleData}>
          Load Sample Data
        </button>
      </div>
      
      <div className="builder-container">
        <div className="builder-form">
          <FormSection title="Personal Info">
            <div className="form-row">
              <InputField
                label="Full Name"
                value={resume.personalInfo.name}
                onChange={(v) => updatePersonalInfo('name', v)}
                placeholder="John Doe"
              />
              <InputField
                label="Email"
                value={resume.personalInfo.email}
                onChange={(v) => updatePersonalInfo('email', v)}
                placeholder="john@email.com"
                type="email"
              />
            </div>
            <div className="form-row">
              <InputField
                label="Phone"
                value={resume.personalInfo.phone}
                onChange={(v) => updatePersonalInfo('phone', v)}
                placeholder="+1 (555) 123-4567"
              />
              <InputField
                label="Location"
                value={resume.personalInfo.location}
                onChange={(v) => updatePersonalInfo('location', v)}
                placeholder="San Francisco, CA"
              />
            </div>
          </FormSection>

          <FormSection title="Summary">
            <TextAreaField
              label="Professional Summary"
              value={resume.summary}
              onChange={updateSummary}
              placeholder="Write a brief summary of your professional background..."
              rows={4}
            />
          </FormSection>

          <FormSection title="Education">
            {resume.education.map((edu) => (
              <div key={edu.id} className="repeatable-item">
                <div className="form-row">
                  <InputField
                    label="School"
                    value={edu.school}
                    onChange={(v) => updateEducation(edu.id, 'school', v)}
                    placeholder="University name"
                  />
                  <InputField
                    label="Degree"
                    value={edu.degree}
                    onChange={(v) => updateEducation(edu.id, 'degree', v)}
                    placeholder="Bachelor's in CS"
                  />
                </div>
                <div className="item-actions">
                  <InputField
                    label="Year"
                    value={edu.year}
                    onChange={(v) => updateEducation(edu.id, 'year', v)}
                    placeholder="2020"
                  />
                  <button className="btn-remove" onClick={() => removeEducation(edu.id)}>
                    Remove
                  </button>
                </div>
              </div>
            ))}
            <button className="btn-add" onClick={addEducation}>+ Add Education</button>
          </FormSection>

          <FormSection title="Experience">
            {resume.experience.map((exp) => (
              <div key={exp.id} className="repeatable-item">
                <div className="form-row">
                  <InputField
                    label="Company"
                    value={exp.company}
                    onChange={(v) => updateExperience(exp.id, 'company', v)}
                    placeholder="Company name"
                  />
                  <InputField
                    label="Role"
                    value={exp.role}
                    onChange={(v) => updateExperience(exp.id, 'role', v)}
                    placeholder="Software Engineer"
                  />
                </div>
                <div className="form-row">
                  <InputField
                    label="Duration"
                    value={exp.duration}
                    onChange={(v) => updateExperience(exp.id, 'duration', v)}
                    placeholder="2020 - Present"
                  />
                </div>
                <TextAreaField
                  label="Description"
                  value={exp.description}
                  onChange={(v) => updateExperience(exp.id, 'description', v)}
                  placeholder="Describe your responsibilities and achievements..."
                  rows={3}
                />
                <button className="btn-remove" onClick={() => removeExperience(exp.id)}>
                  Remove
                </button>
              </div>
            ))}
            <button className="btn-add" onClick={addExperience}>+ Add Experience</button>
          </FormSection>

          <FormSection title="Projects">
            {resume.projects.map((proj) => (
              <div key={proj.id} className="repeatable-item">
                <div className="form-row">
                  <InputField
                    label="Project Name"
                    value={proj.name}
                    onChange={(v) => updateProject(proj.id, 'name', v)}
                    placeholder="My Project"
                  />
                  <InputField
                    label="Link"
                    value={proj.link}
                    onChange={(v) => updateProject(proj.id, 'link', v)}
                    placeholder="https://github.com/..."
                  />
                </div>
                <TextAreaField
                  label="Description"
                  value={proj.description}
                  onChange={(v) => updateProject(proj.id, 'description', v)}
                  placeholder="Brief description of the project..."
                  rows={2}
                />
                <button className="btn-remove" onClick={() => removeProject(proj.id)}>
                  Remove
                </button>
              </div>
            ))}
            <button className="btn-add" onClick={addProject}>+ Add Project</button>
          </FormSection>

          <FormSection title="Skills">
            <TextAreaField
              label="Skills (comma-separated)"
              value={resume.skills}
              onChange={updateSkills}
              placeholder="JavaScript, React, Node.js, Python..."
              rows={2}
            />
          </FormSection>

          <FormSection title="Links">
            <div className="form-row">
              <InputField
                label="GitHub"
                value={resume.links.github}
                onChange={(v) => updateLinks('github', v)}
                placeholder="https://github.com/username"
              />
              <InputField
                label="LinkedIn"
                value={resume.links.linkedin}
                onChange={(v) => updateLinks('linkedin', v)}
                placeholder="https://linkedin.com/in/username"
              />
            </div>
          </FormSection>
        </div>

        <div className="builder-preview">
          <h3 className="preview-title">Live Preview</h3>
          <ATSScore score={atsScore.score} suggestions={atsScore.suggestions} />
          <LivePreview resume={resume} />
        </div>
      </div>
    </div>
  );
}
