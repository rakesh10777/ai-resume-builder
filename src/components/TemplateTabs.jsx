import { useResume } from '../context/ResumeContext';
import './TemplateTabs.css';

const TEMPLATES = [
  { 
    id: 'classic', 
    label: 'Classic',
    description: 'Traditional single-column, serif headings, horizontal rules'
  },
  { 
    id: 'modern', 
    label: 'Modern',
    description: 'Two-column with colored sidebar'
  },
  { 
    id: 'minimal', 
    label: 'Minimal',
    description: 'Clean single-column, generous whitespace'
  },
];

function TemplateThumbnail({ template, isActive, onClick }) {
  return (
    <button 
      className={`template-thumbnail ${isActive ? 'active' : ''}`}
      onClick={onClick}
      title={template.description}
    >
      <div className="thumbnail-preview">
        {template.id === 'classic' && (
          <div className="thumb-classic">
            <div className="thumb-header"></div>
            <div className="thumb-line"></div>
            <div className="thumb-line short"></div>
            <div className="thumb-section">
              <div className="thumb-section-header"></div>
              <div className="thumb-line"></div>
              <div className="thumb-line"></div>
            </div>
          </div>
        )}
        {template.id === 'modern' && (
          <div className="thumb-modern">
            <div className="thumb-sidebar">
              <div className="thumb-line small"></div>
              <div className="thumb-line small"></div>
            </div>
            <div className="thumb-main">
              <div className="thumb-line"></div>
              <div className="thumb-line short"></div>
              <div className="thumb-section-header"></div>
              <div className="thumb-line"></div>
            </div>
          </div>
        )}
        {template.id === 'minimal' && (
          <div className="thumb-minimal">
            <div className="thumb-header-minimal"></div>
            <div className="thumb-line"></div>
            <div className="thumb-line short"></div>
            <div className="thumb-section-minimal">
              <div className="thumb-line"></div>
              <div className="thumb-line"></div>
            </div>
          </div>
        )}
      </div>
      <span className="thumbnail-label">{template.label}</span>
      {isActive && <span className="thumbnail-check">✓</span>}
    </button>
  );
}

export default function TemplateTabs() {
  const { template, setTemplate } = useResume();

  return (
    <div className="template-picker">
      <span className="picker-label">Template</span>
      <div className="template-thumbnails">
        {TEMPLATES.map((t) => (
          <TemplateThumbnail
            key={t.id}
            template={t}
            isActive={template === t.id}
            onClick={() => setTemplate(t.id)}
          />
        ))}
      </div>
    </div>
  );
}
