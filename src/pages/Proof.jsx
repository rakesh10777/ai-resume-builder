import './Proof.css';

export default function Proof() {
  return (
    <div className="proof-page">
      <div className="proof-content">
        <h1>Project Proof</h1>
        <p className="proof-subtitle">AI Resume Builder</p>
        
        <div className="proof-placeholder">
          <div className="placeholder-icon">📋</div>
          <h2>Coming Soon</h2>
          <p>Project artifacts and submission details will appear here once you complete the build process.</p>
        </div>

        <div className="proof-checklist">
          <h3>What's Next</h3>
          <ul>
            <li>Complete all resume sections in the Builder</li>
            <li>Review your resume in Preview</li>
            <li>Export your final resume</li>
            <li>Submit for verification</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
