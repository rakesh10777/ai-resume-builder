import { useState } from 'react';
import './TagInput.css';

export default function TagInput({ tags, onAdd, onRemove, placeholder }) {
  const [input, setInput] = useState('');

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && input.trim()) {
      e.preventDefault();
      onAdd(input.trim());
      setInput('');
    }
  };

  return (
    <div className="tag-input-container">
      <div className="tags-list">
        {tags.map((tag, index) => (
          <span key={index} className="tag">
            {tag}
            <button type="button" className="tag-remove" onClick={() => onRemove(tag)}>
              ×
            </button>
          </span>
        ))}
      </div>
      <input
        type="text"
        className="tag-input"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={tags.length === 0 ? placeholder : ''}
      />
    </div>
  );
}
