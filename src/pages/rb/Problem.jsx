import PremiumLayout from '../../components/layout/PremiumLayout';

export default function Problem() {
  return (
    <PremiumLayout>
      <div className="step-content">
        <h2>Define the Problem</h2>
        <p>What problem does your AI Resume Builder solve?</p>
        <div className="workspace-content">
          <textarea 
            placeholder="Describe the problem you're solving..."
            rows={10}
          />
        </div>
      </div>
    </PremiumLayout>
  );
}
