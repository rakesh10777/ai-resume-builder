import PremiumLayout from '../../components/layout/PremiumLayout';

export default function Ship() {
  return (
    <PremiumLayout>
      <div className="step-content">
        <h2>Ship to Production</h2>
        <p>Deploy your AI Resume Builder to production.</p>
        <div className="workspace-content">
          <textarea 
            placeholder="Document your deployment process..."
            rows={10}
          />
        </div>
      </div>
    </PremiumLayout>
  );
}
