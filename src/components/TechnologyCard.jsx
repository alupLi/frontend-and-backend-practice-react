import React from 'react';
import './TechnologyCard.css';
import TechnologyNotes from './TechnologyNotes';

const TechnologyCard = ({ id, title, description, status, notes, onStatusChange, onNotesChange }) => {
    const handleClick = () => {
        const nextStatus = {
            'not-started': 'in-progress',
            'in-progress': 'completed',
            'completed': 'not-started'
        }[status];

        console.log('Changing status:', id, status, '->', nextStatus);
        onStatusChange(id, nextStatus);
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'completed': return '✅';
            case 'in-progress': return '🔄';
            default: return '⏳';
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case 'completed': return 'Изучено';
            case 'in-progress': return 'В процессе';
            default: return 'Не начато';
        }
    };

    return (
        <div
            className={`technology-card ${status}`}
            onClick={handleClick}
            style={{ cursor: 'pointer' }}
        >
            {/* Добавляем битые пиксели в углах */}
            <div className="pixel-corner"></div>
            <div className="pixel-corner"></div>
            <div className="pixel-corner"></div>
            <div className="pixel-corner"></div>

            <div className="card-header">
                <h3>{title}</h3>
                <span className={`status-badge ${status}`}>
                    {getStatusIcon(status)}
                </span>
            </div>
            <p className="description">{description}</p>
            <TechnologyNotes
                notes={notes}
                onNotesChange={onNotesChange}
                techId={id}
            />
            <div className="card-footer">
                <span className="status-text">
                    {getStatusText(status)}
                </span>
                <span className="click-hint">Нажмите для смены статуса</span>
            </div>
        </div>
    );
};

export default TechnologyCard;