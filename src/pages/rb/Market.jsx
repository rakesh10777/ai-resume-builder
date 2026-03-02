import PremiumLayout from '../../components/layout/PremiumLayout';

export default function Market() {
  return (
    <PremiumLayout>
      <div className="step-content">
        <h2>Market Analysis</h2>
        <p>Analyze the market opportunity for your AI Resume Builder.</p>
        <div className="workspace-content">
          <textarea 
            placeholder="Describe the market opportunity..."
            rows={10}
          />
        </div>
      </div>
    </PremiumLayout>
  );
}
