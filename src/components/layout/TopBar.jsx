import { useProject } from '../../context/ProjectContext';

export default function TopBar() {
  const { currentStep, steps } = useProject();
  const stepInfo = steps.find(s => s.num === currentStep) || steps[0];

  const getStatusBadge = () => {
    if (currentStep === 1) return { text: 'START', color: '#10b981' };
    if (currentStep === 8) return { text: 'ALMOST DONE', color: '#f59e0b' };
    return { text: 'IN PROGRESS', color: '#3b82f6' };
  };

  const badge = getStatusBadge();

  return (
    <div className="topbar">
      <div className="topbar-left">
        <span className="project-name">AI Resume Builder</span>
      </div>
      <div className="topbar-center">
        <span className="step-indicator">Project 3 — Step {currentStep} of 8</span>
      </div>
      <div className="topbar-right">
        <span className="status-badge" style={{ backgroundColor: badge.color }}>
          {badge.text}
        </span>
      </div>
    </div>
  );
}
