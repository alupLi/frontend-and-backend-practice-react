import React from 'react';
import './TechnologyNotes.css';

const TechnologyNotes = ({ notes, onNotesChange, techId }) => {
    return (
        <div className="notes-section">
            <h4 className="notes-title">
                📝 Мои заметки:
                <span className="notes-hint">
                    {` (сохранено: ${notes.length} симв.)`}
                </span>
            </h4>
            <textarea
                className="notes-textarea glitch-hover"
                value={notes}
                onChange={(e) => onNotesChange(techId, e.target.value)}
                placeholder="[РЕДАКТИРОВАТЬ]"
                rows="3"
            />
            <div className="notes-counter">
                <span className={notes.length > 200 ? 'warning' : ''}>
                    {notes.length}/500
                </span>
            </div>
        </div>
    );
};

export default TechnologyNotes;