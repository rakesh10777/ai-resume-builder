import React from 'react';
import { useResume } from '../context/ResumeContext';
import './AtsScore.css';

export default function AtsScore() {
  const { atsScore } = useResume();
  const { score, suggestions } = atsScore;

  let statusText = '';
  let statusClass = '';
  let strokeColor = '';

  if (score <= 40) {
    statusText = 'Needs Work';
    statusClass = 'danger';
    strokeColor = '#ef4444';
  } else if (score <= 70) {
    statusText = 'Getting There';
    statusClass = 'warning';
    strokeColor = '#f59e0b';
  } else {
    statusText = 'Strong Resume';
    statusClass = 'success';
    strokeColor = '#22c55e';
  }

  // Calculate circular progress
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="ats-score-container">
      <div className="ats-score-header">
        <div className="score-circle">
          <svg className="progress-ring" width="90" height="90">
            <circle
              className="progress-ring__circle-bg"
              strokeWidth="6"
              fill="transparent"
              r={radius}
              cx="45"
              cy="45"
            />
            <circle
              className={`progress-ring__circle ${statusClass}`}
              stroke={strokeColor}
              strokeWidth="6"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              fill="transparent"
              r={radius}
              cx="45"
              cy="45"
              transform="rotate(-90 45 45)"
            />
          </svg>
          <div className="score-text">
            <span className="score-number">{score}</span>
            <span className="score-max">/100</span>
          </div>
        </div>
        <div className="score-info">
          <h3>ATS Score</h3>
          <p className={`status-text ${statusClass}`}>{statusText}</p>
        </div>
      </div>

      {suggestions && suggestions.length > 0 && (
        <div className="ats-suggestions">
          <h4>Improvement Suggestions</h4>
          <ul>
            {suggestions.map((sug, idx) => (
              <li key={idx}>
                <span className="suggestion-icon">💡</span>
                {sug}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
