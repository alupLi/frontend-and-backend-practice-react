import React from 'react';
import './QuickActions.css';

const QuickActions = ({ onMarkAllCompleted, onResetAll, onRandomNext }) => {
    return (
        <div className="quick-actions">
            <h3>Быстрые действия</h3>
            <div className="actions-buttons">
                <button
                    className="action-btn mark-all"
                    onClick={onMarkAllCompleted}
                >
                    ✅ Отметить все как выполненные
                </button>
                <button
                    className="action-btn reset-all"
                    onClick={onResetAll}
                >
                    🔄 Сбросить все статусы
                </button>
                <button
                    className="action-btn random-next"
                    onClick={onRandomNext}
                >
                    🎲 Случайный выбор следующей технологии
                </button>
            </div>
        </div>
    );
};

export default QuickActions;