import { useProject } from '../../context/ProjectContext';

export default function ContextHeader() {
  const { currentStep, steps } = useProject();
  const stepInfo = steps.find(s => s.num === currentStep) || steps[0];

  const stepDescriptions = {
    1: 'Define the problem you are solving',
    2: 'Analyze the market opportunity',
    3: 'System architecture overview',
    4: 'High-Level Design',
    5: 'Low-Level Design',
    6: 'Build your project',
    7: 'Test your implementation',
    8: 'Ship to production',
  };

  return (
    <div className="context-header">
      <h1 className="step-title">{stepInfo.title}</h1>
      <p className="step-description">{stepDescriptions[currentStep]}</p>
    </div>
  );
}
