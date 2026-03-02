import { useState } from 'react';
import { useProject } from '../../context/ProjectContext';

export default function BuildPanel() {
  const { currentStep, setArtifact, getArtifact, setStepBuildStatus, getStepBuildStatus } = useProject();
  const [code, setCode] = useState('');
  const [buildStatus, setLocalBuildStatus] = useState('idle');
  
  const artifact = getArtifact(currentStep);
  const stepBuildStatus = getStepBuildStatus(currentStep);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
  };

  const handleUpload = () => {
    setArtifact(currentStep, { code, uploadedAt: new Date().toISOString() });
    setStepBuildStatus(currentStep, 'uploaded');
  };

  const handleBuild = () => {
    setLocalBuildStatus('building');
    setTimeout(() => {
      setLocalBuildStatus('success');
    }, 2000);
  };

  const handleClearArtifact = () => {
    setArtifact(currentStep, null);
    setStepBuildStatus(currentStep, null);
    setLocalBuildStatus('idle');
  };

  return (
    <div className="build-panel">
      <div className="build-panel-header">
        <h3>Build Panel</h3>
      </div>
      
      <div className="build-panel-content">
        <div className="input-section">
          <label>Copy This Into Lovable</label>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter your code here..."
            rows={10}
          />
        </div>
        
        <div className="action-buttons">
          <button className="btn-copy" onClick={handleCopy}>
            Copy
          </button>
          <button className="btn-upload" onClick={handleUpload} disabled={!code}>
            Upload Artifact
          </button>
        </div>

        <div className="build-action">
          <button className="btn-build" onClick={handleBuild} disabled={!artifact || buildStatus === 'building'}>
            {buildStatus === 'building' ? 'Building...' : 'Build in Lovable'}
          </button>
          
          {buildStatus === 'success' && (
            <div className="status-message success">
              <span>It Worked!</span>
              <button className="btn-screenshot" onClick={() => setArtifact(currentStep, { ...artifact, screenshot: true })}>
                Add Screenshot
              </button>
            </div>
          )}
          
          {stepBuildStatus === 'error' && (
            <div className="status-message error">
              <span>Error - Try Again</span>
            </div>
          )}
        </div>

        {artifact && (
          <div className="artifact-info">
            <p>✓ Artifact uploaded for Step {currentStep}</p>
            <button className="btn-clear" onClick={handleClearArtifact}>Clear</button>
          </div>
        )}
      </div>
    </div>
  );
}
