import PremiumLayout from '../../components/layout/PremiumLayout';

export default function LLD() {
  return (
    <PremiumLayout>
      <div className="step-content">
        <h2>Low-Level Design</h2>
        <p>Document the low-level design details.</p>
        <div className="workspace-content">
          <textarea 
            placeholder="Document your LLD..."
            rows={10}
          />
        </div>
      </div>
    </PremiumLayout>
  );
}
