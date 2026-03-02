import { useNavigate } from 'react-router-dom';
import { useProject } from '../../context/ProjectContext';

export default function ProofFooter() {
  const navigate = useNavigate();
  const { currentStep, steps, canProceed, canNavigateToStep, getArtifact } = useProject();

  const handlePrevious = () => {
    if (currentStep > 1) {
      navigate(steps[currentStep - 2].path);
    }
  };

  const handleNext = () => {
    if (canProceed(currentStep) && currentStep < 8) {
      navigate(steps[currentStep].path);
    }
  };

  const handleGoToProof = () => {
    navigate('/rb/proof');
  };

  const isPreviousDisabled = currentStep === 1;
  const isNextDisabled = !canProceed(currentStep);
  const canGoToProof = getArtifact(8) !== null;

  return (
    <div className="proof-footer">
      <div className="footer-left">
        <button 
          className="btn-nav btn-prev" 
          onClick={handlePrevious}
          disabled={isPreviousDisabled}
        >
          ← Previous
        </button>
      </div>
      
      <div className="footer-center">
        <div className="step-indicators">
          {steps.map((step) => (
            <div 
              key={step.num}
              className={`step-dot ${step.num === currentStep ? 'active' : ''} ${getArtifact(step.num) ? 'completed' : ''}`}
              title={step.title}
            >
              {step.num}
            </div>
          ))}
        </div>
      </div>
      
      <div className="footer-right">
        {currentStep < 8 ? (
          <button 
            className="btn-nav btn-next" 
            onClick={handleNext}
            disabled={isNextDisabled}
          >
            Next →
          </button>
        ) : (
          <button 
            className="btn-nav btn-proof" 
            onClick={handleGoToProof}
            disabled={!canGoToProof}
          >
            Go to Proof →
          </button>
        )}
      </div>
    </div>
  );
}
