import React from 'react';
import './ProgressHeader.css';

const ProgressHeader = ({ technologies }) => {
    const total = technologies.length;
    const completed = technologies.filter(t => t.status === 'completed').length;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

    return (
        <div className="progress-header">
            <h1>🎓 Трекер изучения технологий</h1>
            <div className="stats">
                <div className="stat-item">
                    <span className="stat-number">{total}</span>
                    <span className="stat-label">Всего технологий</span>
                </div>
                <div className="stat-item">
                    <span className="stat-number">{completed}</span>
                    <span className="stat-label">Изучено</span>
                </div>
                <div className="stat-item">
                    <span className="stat-number">{percentage}%</span>
                    <span className="stat-label">Прогресс</span>
                </div>
            </div>

            <div className="progress-bar-container">
                <div
                    className="progress-bar"
                    style={{ width: `${percentage}%` }}
                >
                    <span className="progress-text">{percentage}%</span>
                </div>
            </div>
        </div>
    );
};

export default ProgressHeader;