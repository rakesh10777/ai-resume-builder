import { useResume } from '../context/ResumeContext';
import './TemplateTabs.css';

const TEMPLATES = [
  { id: 'classic', label: 'Classic' },
  { id: 'modern', label: 'Modern' },
  { id: 'minimal', label: 'Minimal' },
];

export default function TemplateTabs() {
  const { template, setTemplate } = useResume();

  return (
    <div className="template-tabs">
      <span className="template-label">Template:</span>
      <div className="template-options">
        {TEMPLATES.map((t) => (
          <button
            key={t.id}
            className={`template-tab ${template === t.id ? 'active' : ''}`}
            onClick={() => setTemplate(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>
    </div>
  );
}
