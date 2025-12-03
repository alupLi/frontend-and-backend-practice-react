﻿import React from 'react';
import './TechnologyCard.css';

const TechnologyCard = ({ title, description, status }) => {
    return (
        <div className={`technology-card ${status}`}>
            <div className="card-header">
                <h3>{title}</h3>
                <span className={`status-badge ${status}`}>
                    {status === 'completed' ? '✅' :
                        status === 'in-progress' ? '🔄' : '⏳'}
                </span>
            </div>
            <p className="description">{description}</p>
            <div className="card-footer">
                <span className="status-text">
                    {status === 'completed' ? 'Изучено' :
                        status === 'in-progress' ? 'В процессе' : 'Не начато'}
                </span>
            </div>
        </div>
    );
};

export default TechnologyCard;