import PremiumLayout from '../../components/layout/PremiumLayout';

export default function Architecture() {
  return (
    <PremiumLayout>
      <div className="step-content">
        <h2>System Architecture</h2>
        <p>Design the overall system architecture.</p>
        <div className="workspace-content">
          <textarea 
            placeholder="Describe your system architecture..."
            rows={10}
          />
        </div>
      </div>
    </PremiumLayout>
  );
}
