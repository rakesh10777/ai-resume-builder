import { useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import ATSScore from '../../components/ATSScore';
import TemplateTabs from '../../components/TemplateTabs';
import TagInput from '../../components/TagInput';
import ProjectCard from '../../components/ProjectCard';
import LivePreview from './LivePreview';
import './Builder.css';

const ACTION_VERBS = ['Built', 'Developed', 'Designed', 'Implemented', 'Led', 'Improved', 'Created', 'Optimized', 'Automated', 'Managed', 'Established', 'Launched', 'Delivered', 'Reduced', 'Increased', 'Engineered', 'Architected', 'Spearheaded'];

function startsWithActionVerb(text) {
  const trimmed = text.trim();
  return ACTION_VERBS.some(verb => trimmed.toLowerCase().startsWith(verb.toLowerCase()));
}

function hasNumbers(text) {
  return /[\d%XxkK]/.test(text);
}

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
    improvements,
    updatePersonalInfo,
    updateSummary,
    addSkill,
    removeSkill,
    suggestSkills,
    updateLinks,
    addEducation,
    updateEducation,
    removeEducation,
    addExperience,
    updateExperience,
    removeExperience,
    addProject,
    updateProject,
    addProjectTech,
    removeProjectTech,
    removeProject,
    loadSampleData,
  } = useResume();

  const [suggesting, setSuggesting] = useState(false);

  const handleSuggestSkills = async () => {
    setSuggesting(true);
    await suggestSkills();
    setSuggesting(false);
  };

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
                <div className="input-field">
                  <label>Description</label>
                  <textarea
                    value={exp.description}
                    onChange={(v) => updateExperience(exp.id, 'description', v)}
                    placeholder="Describe your responsibilities and achievements..."
                    rows={3}
                  />
                  {exp.description && !startsWithActionVerb(exp.description) && (
                    <span className="bullet-guidance">Start with a strong action verb.</span>
                  )}
                  {exp.description && !hasNumbers(exp.description) && (
                    <span className="bullet-guidance">Add measurable impact (numbers).</span>
                  )}
                </div>
                <button className="btn-remove" onClick={() => removeExperience(exp.id)}>
                  Remove
                </button>
              </div>
            ))}
            <button className="btn-add" onClick={addExperience}>+ Add Experience</button>
          </FormSection>

          <FormSection title="Projects">
            {resume.projects.map((proj) => (
              <ProjectCard
                key={proj.id}
                project={proj}
                onUpdate={updateProject}
                onRemove={removeProject}
                onAddTech={addProjectTech}
                onRemoveTech={removeProjectTech}
              />
            ))}
            <button className="btn-add" onClick={addProject}>+ Add Project</button>
          </FormSection>

          <FormSection title="Skills">
            <div className="skills-section">
              <div className="skill-category">
                <div className="skill-category-header">
                  <span className="skill-category-label">Technical Skills</span>
                  <span className="skill-count">({resume.skills.technical?.length || 0})</span>
                </div>
                <TagInput
                  tags={resume.skills.technical || []}
                  onAdd={(skill) => addSkill('technical', skill)}
                  onRemove={(skill) => removeSkill('technical', skill)}
                  placeholder="Type and press Enter..."
                />
              </div>

              <div className="skill-category">
                <div className="skill-category-header">
                  <span className="skill-category-label">Soft Skills</span>
                  <span className="skill-count">({resume.skills.soft?.length || 0})</span>
                </div>
                <TagInput
                  tags={resume.skills.soft || []}
                  onAdd={(skill) => addSkill('soft', skill)}
                  onRemove={(skill) => removeSkill('soft', skill)}
                  placeholder="Type and press Enter..."
                />
              </div>

              <div className="skill-category">
                <div className="skill-category-header">
                  <span className="skill-category-label">Tools & Technologies</span>
                  <span className="skill-count">({resume.skills.tools?.length || 0})</span>
                </div>
                <TagInput
                  tags={resume.skills.tools || []}
                  onAdd={(skill) => addSkill('tools', skill)}
                  onRemove={(skill) => removeSkill('tools', skill)}
                  placeholder="Type and press Enter..."
                />
              </div>

              <button 
                className="btn-suggest" 
                onClick={handleSuggestSkills}
                disabled={suggesting}
              >
                {suggesting ? '✨ Adding skills...' : '✨ Suggest Skills'}
              </button>
            </div>
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
          <TemplateTabs />
          <div className="preview-content">
            <h3 className="preview-title">Live Preview</h3>
            <ATSScore score={atsScore.score} suggestions={atsScore.suggestions} improvements={improvements} />
            <LivePreview resume={resume} />
          </div>
        </div>
      </div>
    </div>
  );
}
