//import React, { useState } from 'react';
//import './QuickActions.css';
//import Modal from './Modal';

//const QuickActions = ({ onMarkAllCompleted, onResetAll, onRandomNext, technologies }) => {
//    const [showExportModal, setShowExportModal] = useState(false);

//    const handleExport = () => {
//        const data = {
//            exportedAt: new Date().toISOString(),
//            technologies: technologies
//        };
//        const dataStr = JSON.stringify(data, null, 2);

//        // Создаем файл для скачивания
//        const blob = new Blob([dataStr], { type: 'application/json' });
//        const url = URL.createObjectURL(blob);
//        const a = document.createElement('a');
//        a.href = url;
//        a.download = `tech-tracker-export-${new Date().toISOString().slice(0, 10)}.json`;
//        document.body.appendChild(a);
//        a.click();
//        document.body.removeChild(a);
//        URL.revokeObjectURL(url);

//        setShowExportModal(true);
//    };

//    return (
//        <div className="quick-actions">
//            <h3>Быстрые действия</h3>
//            <div className="actions-buttons">
//                <button
//                    className="action-btn mark-all"
//                    onClick={onMarkAllCompleted}
//                >
//                    ✅ Отметить все как выполненные
//                </button>
//                <button
//                    className="action-btn reset-all"
//                    onClick={onResetAll}
//                >
//                    🔄 Сбросить все статусы
//                </button>
//                <button
//                    className="action-btn random-next"
//                    onClick={onRandomNext}
//                >
//                    🎲 Случайный выбор следующей технологии
//                </button>
//                <button
//                    className="action-btn export-btn"
//                    onClick={handleExport}
//                >
//                    💾 Экспорт данных в JSON
//                </button>
//            </div>

//            <Modal
//                isOpen={showExportModal}
//                onClose={() => setShowExportModal(false)}
//                title="Экспорт данных"
//            >
//                <div style={{ textAlign: 'center' }}>
//                    <p style={{ marginBottom: '15px', color: '#00ff00' }}>
//                        ✅ Данные успешно экспортированы!
//                    </p>
//                    <p style={{ fontSize: '0.9em', color: '#008800' }}>
//                        Файл скачан автоматически.
//                    </p>
//                    <button
//                        className="action-btn mark-all"
//                        onClick={() => setShowExportModal(false)}
//                        style={{ marginTop: '20px' }}
//                    >
//                        Закрыть
//                    </button>
//                </div>
//            </Modal>
//        </div>
//    );
//};

//export default QuickActions;

import React, { useState, useRef } from 'react';
import './QuickActions.css';
import Modal from './Modal';

const QuickActions = ({ onMarkAllCompleted, onResetAll, onRandomNext, technologies, onImportData }) => {
    const [showExportModal, setShowExportModal] = useState(false);
    const fileInputRef = useRef(null); // Ссылка на скрытый инпут

    // --- Экспорт (Твой код) ---
    const handleExport = () => {
        const data = {
            exportedAt: new Date().toISOString(),
            technologies: technologies
        };
        const dataStr = JSON.stringify(data, null, 2);
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

    // --- Импорт (Новая логика) ---
    const handleImportClick = () => {
        fileInputRef.current.click(); // Имитируем клик по скрытому инпуту
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const parsedData = JSON.parse(event.target.result);
                // Простая валидация: проверяем, есть ли массив technologies
                if (parsedData.technologies && Array.isArray(parsedData.technologies)) {
                    // Вызываем функцию обновления, которую передадим из родителя
                    onImportData(parsedData.technologies);
                    alert('SYSTEM UPDATE: DATA PACKETS INTEGRATED SUCCESSFULLY');
                } else {
                    throw new Error('Invalid structure');
                }
            } catch (error) {
                alert('ERROR: CORRUPTED DATA FILE. UPLOAD ABORTED.');
                console.error(error);
            }
        };
        reader.readAsText(file);
        // Сбрасываем инпут, чтобы можно было загрузить тот же файл снова
        e.target.value = '';
    };

    return (
        <div className="quick-actions">
            <h3>Быстрые действия</h3>
            <div className="actions-buttons">
                <button className="action-btn mark-all" onClick={onMarkAllCompleted}>
                    ✅ Отметить все как выполненные
                </button>
                <button className="action-btn reset-all" onClick={onResetAll}>
                    🔄 Сбросить все статусы
                </button>
                <button className="action-btn random-next" onClick={onRandomNext}>
                    🎲 Случайный выбор
                </button>

                <div style={{ height: '1px', background: '#004400', margin: '5px 0' }}></div>

                <button className="action-btn export-btn" onClick={handleExport}>
                    💾 Экспорт данных (JSON)
                </button>

                {/* Кнопка импорта */}
                {/*<button className="action-btn import-btn" onClick={handleImportClick} style={{ borderColor: '#ff00ff', color: '#ff00ff' }}>*/}
                <button className="action-btn export-btn" onClick={handleImportClick}>
                    📂 Импорт данных
                </button>
                {/* Скрытый инпут для файла */}
                <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    accept=".json"
                    onChange={handleFileChange}
                />
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