import React, { useState, useEffect } from 'react';
import './ProgressHeader.css';

const ProgressHeader = ({ technologies }) => {
    const total = technologies.length;
    const completed = technologies.filter(t => t.status === 'completed').length;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

    const [isGlitching, setIsGlitching] = useState(false);

    // Функция для случайного глюка
    useEffect(() => {
        const randomGlitch = () => {
            // Случайный интервал
            const randomTime = 30000 + Math.random() * 10000;

            const timer = setTimeout(() => {
                setIsGlitching(true);

                // Длительность глюка
                const glitchDuration = 50 + Math.random() * 1000;

                setTimeout(() => {
                    setIsGlitching(false);
                    randomGlitch();
                }, glitchDuration);
            }, randomTime);

            return () => clearTimeout(timer);
        };

        randomGlitch();

        return () => {
            setIsGlitching(false);
        };
    }, [percentage]);

    return (
        <div className="progress-header">
            <h1 className="blink-broken">🎓 Трекер изучения технологий</h1>
            <div className="stats">
                <div className="stat-item">
                    <span className={`stat-number ${isGlitching ? 'glitching' : ''}`}>{isGlitching ? 'ERROR' : total}</span>
                    <span className={`stat-label ${isGlitching ? 'glitching' : ''}`}>{isGlitching ? '' : 'Всего технологий'}</span>
                </div>
                <div className="stat-item">
                    <span className={`stat-number ${isGlitching ? 'glitching' : ''}`}>{isGlitching ? 'ERROR' : completed}</span>
                    <span className={`stat-label ${isGlitching ? 'glitching' : ''}`}>{isGlitching ? '' : 'Изучено'}</span>
                </div>
                <div className="stat-item">
                    <span className={`stat-number ${isGlitching ? 'glitching' : ''}`}>{isGlitching ? 'ERROR' : percentage + '%'}</span>
                    <span className={`stat-label ${isGlitching ? 'glitching' : ''}`}>{isGlitching ? '' : 'Прогресс'}</span>
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