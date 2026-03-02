import { useState } from 'react';
import { useProject } from '../../context/ProjectContext';

const STEPS = [
  { path: '/rb/01-problem', title: 'Problem', num: 1 },
  { path: '/rb/02-market', title: 'Market', num: 2 },
  { path: '/rb/03-architecture', title: 'Architecture', num: 3 },
  { path: '/rb/04-hld', title: 'HLD', num: 4 },
  { path: '/rb/05-lld', title: 'LLD', num: 5 },
  { path: '/rb/06-build', title: 'Build', num: 6 },
  { path: '/rb/07-test', title: 'Test', num: 7 },
  { path: '/rb/08-ship', title: 'Ship', num: 8 },
];

export default function Proof() {
  const { proofData, setProofData, getArtifact } = useProject();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const submission = `AI Resume Builder - Final Submission

Step Status:
${STEPS.map(step => `${step.num}. ${step.title}: ${getArtifact(step.num) ? '✓ Completed' : '✗ Not Completed'}`).join('\n')}

Links:
- Lovable: ${proofData.lovablesUrl || 'Not provided'}
- GitHub: ${proofData.githubUrl || 'Not provided'}
- Deploy: ${proofData.deployUrl || 'Not provided'}

---
Submitted via KodNest Premium Build System`;

    navigator.clipboard.writeText(submission);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="proof-page">
      <div className="proof-header">
        <h1>Project 3 — Final Proof</h1>
        <p>AI Resume Builder</p>
      </div>

      <div className="step-status-grid">
        <h2>8 Step Status</h2>
        <div className="status-grid">
          {STEPS.map((step) => {
            const hasArtifact = getArtifact(step.num) !== null;
            return (
              <div 
                key={step.num} 
                className={`status-card ${hasArtifact ? 'completed' : 'pending'}`}
              >
                <div className="step-number">{step.num}</div>
                <div className="step-title">{step.title}</div>
                <div className="step-status">
                  {hasArtifact ? '✓ Done' : '○ Waiting'}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="proof-links">
        <h2>Project Links</h2>
        
        <div className="link-input">
          <label>Lovable Project Link</label>
          <input
            type="url"
            value={proofData.lovablesUrl}
            onChange={(e) => setProofData({ ...proofData, lovablesUrl: e.target.value })}
            placeholder="https://lovable.dev/project/..."
          />
        </div>

        <div className="link-input">
          <label>GitHub Repository Link</label>
          <input
            type="url"
            value={proofData.githubUrl}
            onChange={(e) => setProofData({ ...proofData, githubUrl: e.target.value })}
            placeholder="https://github.com/username/repo"
          />
        </div>

        <div className="link-input">
          <label>Deployed Application Link</label>
          <input
            type="url"
            value={proofData.deployUrl}
            onChange={(e) => setProofData({ ...proofData, deployUrl: e.target.value })}
            placeholder="https://your-app.vercel.app"
          />
        </div>
      </div>

      <div className="proof-actions">
        <button className="btn-copy-submission" onClick={handleCopy}>
          {copied ? '✓ Copied!' : 'Copy Final Submission'}
        </button>
      </div>
    </div>
  );
}
