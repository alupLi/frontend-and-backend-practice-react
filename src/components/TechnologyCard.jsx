//import React from 'react';
//import './TechnologyCard.css';
//import TechnologyNotes from './TechnologyNotes';

//const TechnologyCard = ({ id, title, description, status, notes, onStatusChange, onNotesChange }) => {
//    const handleClick = () => {
//        const nextStatus = {
//            'not-started': 'in-progress',
//            'in-progress': 'completed',
//            'completed': 'not-started'
//        }[status];

//        console.log('Changing status:', id, status, '->', nextStatus);
//        onStatusChange(id, nextStatus);
//    };

//    const getStatusIcon = (status) => {
//        switch (status) {
//            case 'completed': return '✅';
//            case 'in-progress': return '🔄';
//            default: return '⏳';
//        }
//    };

//    const getStatusText = (status) => {
//        switch (status) {
//            case 'completed': return 'Изучено';
//            case 'in-progress': return 'В процессе';
//            default: return 'Не начато';
//        }
//    };

//    return (
//        <div
//            className={`technology-card ${status}`}
//            onClick={handleClick}
//            style={{ cursor: 'pointer' }}
//        >
//            {/* Добавляем битые пиксели в углах */}
//            <div className="pixel-corner"></div>
//            <div className="pixel-corner"></div>
//            <div className="pixel-corner"></div>
//            <div className="pixel-corner"></div>

//            <div className="card-header">
//                <h3>{title}</h3>
//                <span className={`status-badge ${status}`}>
//                    {getStatusIcon(status)}
//                </span>
//            </div>
//            <p className="description">{description}</p>
//            <TechnologyNotes
//                notes={notes}
//                onNotesChange={onNotesChange}
//                techId={id}
//            />
//            <div className="card-footer">
//                <span className="status-text">
//                    {getStatusText(status)}
//                </span>
//                <span className="click-hint">Нажмите для смены статуса</span>
//            </div>
//        </div>
//    );
//};

//export default TechnologyCard;

import React from 'react';
import { Link } from 'react-router-dom';
import './TechnologyCard.css';
import TechnologyNotes from './TechnologyNotes';

const TechnologyCard = ({ id, title, description, status, notes, onStatusChange, onNotesChange, cardInList=false }) => {

    const handleStatusClick = (e) => {
        e.preventDefault();
        e.stopPropagation();

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
            case 'completed': return 'ИЗУЧЕНО';
            case 'in-progress': return 'В ПРОЦЕССЕ';
            default: return 'НЕ НАЧАТО';
        }
    };

    const technologyCardLink = cardInList ? `/list/technology/${id}` : `/technology/${id}`;

    return (
        <div className={`technology-card ${status}`}>
            {/* Декоративные пиксели */}
            <div className="pixel-corner"></div>
            <div className="pixel-corner"></div>
            <div className="pixel-corner"></div>
            <div className="pixel-corner"></div>

            <div className="card-header">
                {/* Заголовок теперь ссылка на детали */}
                <Link to={technologyCardLink} style={{ textDecoration: 'none', flex: 1 }}>
                    <h3 className="glitch-hover" style={{ cursor: 'pointer' }}>{title} &gt;</h3>
                </Link>

                {/* Смена статуса только по клику на бейдж */}
                <span
                    className={`status-badge ${status}`}
                    onClick={handleStatusClick}
                    style={{ cursor: 'pointer' }}
                    title="Нажать для смены статуса"
                >
                    {getStatusIcon(status)}
                </span>
            </div>

            <p className="description">{description}</p>

            <TechnologyNotes
                notes={notes || ''}
                onNotesChange={onNotesChange}
                techId={id}
            />

            <div className="card-footer">
                <span className="status-text">
                    STATUS: {getStatusText(status)}
                </span>
                <Link to={technologyCardLink} className="click-hint" style={{ textDecoration: 'none' }}>
                    ПОДРОБНЕЕ_&gt;
                </Link>
            </div>
        </div>
    );
};

export default TechnologyCard;