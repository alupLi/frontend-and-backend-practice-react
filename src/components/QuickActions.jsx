import React, { useState } from 'react';
import './QuickActions.css';
import Modal from './Modal';

const QuickActions = ({ onMarkAllCompleted, onResetAll, onRandomNext, technologies }) => {
    const [showExportModal, setShowExportModal] = useState(false);

    const handleExport = () => {
        const data = {
            exportedAt: new Date().toISOString(),
            technologies: technologies
        };
        const dataStr = JSON.stringify(data, null, 2);

        // Создаем файл для скачивания
        const blob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `tech-tracker-export-${new Date().toISOString().slice(0, 10)}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        setShowExportModal(true);
    };

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
                <button
                    className="action-btn export-btn"
                    onClick={handleExport}
                >
                    💾 Экспорт данных в JSON
                </button>
            </div>

            <Modal
                isOpen={showExportModal}
                onClose={() => setShowExportModal(false)}
                title="Экспорт данных"
            >
                <div style={{ textAlign: 'center' }}>
                    <p style={{ marginBottom: '15px', color: '#00ff00' }}>
                        ✅ Данные успешно экспортированы!
                    </p>
                    <p style={{ fontSize: '0.9em', color: '#008800' }}>
                        Файл скачан автоматически.
                    </p>
                    <button
                        className="action-btn mark-all"
                        onClick={() => setShowExportModal(false)}
                        style={{ marginTop: '20px' }}
                    >
                        Закрыть
                    </button>
                </div>
            </Modal>
        </div>
    );
};

export default QuickActions;