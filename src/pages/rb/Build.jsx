import PremiumLayout from '../../components/layout/PremiumLayout';

export default function Build() {
  return (
    <PremiumLayout>
      <div className="step-content">
        <h2>Build Your Project</h2>
        <p>Implement your AI Resume Builder using the build panel.</p>
        <div className="workspace-content">
          <textarea 
            placeholder="Start building your project..."
            rows={10}
          />
        </div>
      </div>
    </PremiumLayout>
  );
}
