import { useResume } from '../context/ResumeContext';
import './ColorPicker.css';

export default function ColorPicker() {
  const { color, setColor, COLORS } = useResume();

  return (
    <div className="color-picker">
      <span className="picker-label">Accent Color</span>
      <div className="color-options">
        {COLORS.map((c) => (
          <button
            key={c.id}
            className={`color-circle ${color === c.id ? 'active' : ''}`}
            style={{ backgroundColor: c.value }}
            onClick={() => setColor(c.id)}
            title={c.name}
          >
            {color === c.id && <span className="color-check">✓</span>}
          </button>
        ))}
      </div>
    </div>
  );
}
