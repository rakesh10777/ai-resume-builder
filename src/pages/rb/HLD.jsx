import PremiumLayout from '../../components/layout/PremiumLayout';

export default function HLD() {
  return (
    <PremiumLayout>
      <div className="step-content">
        <h2>High-Level Design</h2>
        <p>Document the high-level design of your application.</p>
        <div className="workspace-content">
          <textarea 
            placeholder="Document your HLD..."
            rows={10}
          />
        </div>
      </div>
    </PremiumLayout>
  );
}
