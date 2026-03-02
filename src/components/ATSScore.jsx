import './ATSScore.css';

export default function ATSScore({ score, suggestions }) {
  const getScoreColor = () => {
    if (score >= 80) return 'var(--success)';
    if (score >= 50) return 'var(--warning)';
    return 'var(--error)';
  };

  const getScoreLabel = () => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Fair';
    return 'Needs Work';
  };

  return (
    <div className="ats-score-panel">
      <div className="ats-header">
        <span className="ats-label">ATS Readiness Score</span>
        <span className="ats-status" style={{ color: getScoreColor() }}>
          {getScoreLabel()}
        </span>
      </div>
      
      <div className="score-meter-container">
        <div className="score-meter">
          <div 
            className="score-fill" 
            style={{ 
              width: `${score}%`,
              backgroundColor: getScoreColor()
            }}
          />
        </div>
        <span className="score-value" style={{ color: getScoreColor() }}>
          {score}
        </span>
      </div>

      {suggestions.length > 0 && (
        <div className="suggestions">
          <h4>Suggestions</h4>
          <ul>
            {suggestions.map((suggestion, index) => (
              <li key={index}>{suggestion}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
