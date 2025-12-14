//import React from 'react';
//import { Link } from 'react-router-dom';
//import './TechnologyCard.css';
//import TechnologyNotes from './TechnologyNotes';

//const TechnologyCard = ({ id, title, description, status, notes, onStatusChange, onNotesChange, cardInList=false }) => {

//    const handleStatusClick = (e) => {
//        e.preventDefault();
//        e.stopPropagation();

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
//            case 'completed': return 'ИЗУЧЕНО';
//            case 'in-progress': return 'В ПРОЦЕССЕ';
//            default: return 'НЕ НАЧАТО';
//        }
//    };

//    const technologyCardLink = cardInList ? `/list/technology/${id}` : `/technology/${id}`;

//    return (
//        <div className={`technology-card ${status}`}>
//            {/* Декоративные пиксели */}
//            <div className="pixel-corner"></div>
//            <div className="pixel-corner"></div>
//            <div className="pixel-corner"></div>
//            <div className="pixel-corner"></div>

//            <div className="card-header">
//                {/* Заголовок теперь ссылка на детали */}
//                <Link to={technologyCardLink} style={{ textDecoration: 'none', flex: 1 }}>
//                    <h3 className="glitch-hover" style={{ cursor: 'pointer' }}>{title} &gt;</h3>
//                </Link>

//                <span
//                    className={`status-badge ${status}`}
//                    onClick={handleStatusClick}
//                    style={{ cursor: 'pointer' }}
//                    title="Нажать для смены статуса"
//                >
//                    {getStatusIcon(status)}
//                </span>
//            </div>

//            <p className="description">{description}</p>

//            <TechnologyNotes
//                notes={notes || ''}
//                onNotesChange={onNotesChange}
//                techId={id}
//            />

//            <div className="card-footer">
//                <span className="status-text">
//                    STATUS: {getStatusText(status)}
//                </span>
//                <Link to={technologyCardLink} className="click-hint" style={{ textDecoration: 'none' }}>
//                    ПОДРОБНЕЕ_&gt;
//                </Link>
//            </div>
//        </div>
//    );
//};

//export default TechnologyCard;


import React from 'react';
import { Link } from 'react-router-dom';
import './TechnologyCard.css';
import TechnologyNotes from './TechnologyNotes';

const TechnologyCard = ({
    id, title, description, status, notes,
    onStatusChange, onNotesChange,
    isSelected, onToggleSelect, // Новые пропсы для выбора
    cardInList = false
}) => {

    const handleStatusClick = (e) => {
        e.preventDefault();
        e.stopPropagation();

        const nextStatus = {
            'not-started': 'in-progress',
            'in-progress': 'completed',
            'completed': 'not-started'
        }[status];

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
        <div
            className={`technology-card ${status}`}
            style={isSelected ? { borderColor: '#fff', boxShadow: '0 0 15px rgba(255,255,255,0.3)' } : {}}
        >
            {/* Декоративные пиксели */}
            <div className="pixel-corner"></div>
            <div className="pixel-corner"></div>

            {/* ЧЕКБОКС ДЛЯ ВЫБОРА (Задание 2) */}
            {/* НОВЫЙ ЧЕКБОКС (Стиль: Терминальные скобки, Позиция: Слева) */}
            <div
                onClick={(e) => { e.stopPropagation(); onToggleSelect(id); }}
                style={{
                    position: 'absolute',
                    top: '15px',       // Отступ сверху
                    left: '15px',      // ТЕПЕРЬ СЛЕВА
                    cursor: 'pointer',
                    zIndex: 10,
                    fontFamily: 'monospace',
                    fontSize: '1.2em',
                    fontWeight: 'bold',
                    color: isSelected ? '#00ff00' : '#005500', // Ярко-зеленый если выбран, темно-зеленый если нет
                    textShadow: isSelected ? '0 0 5px #00ff00' : 'none',
                    userSelect: 'none'
                }}
                className="glitch-hover" // Добавим твой эффект при наведении
                title="Select unit"
            >
                {isSelected ? '[ X ]' : '[   ]'}
            </div>

            <div className="card-header" style={{ marginTop: '15px' }}> {/* Отступ для чекбокса */}
                <Link to={technologyCardLink} style={{ textDecoration: 'none', flex: 1 }}>
                    <h3 className="glitch-hover" style={{ cursor: 'pointer' }}>{title} &gt;</h3>
                </Link>

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

            {/* Notes Section */}
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