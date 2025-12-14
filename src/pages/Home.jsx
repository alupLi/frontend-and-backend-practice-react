//import React, { useState } from 'react';
//import TechnologyCard from '../components/TechnologyCard';
//import ProgressHeader from '../components/ProgressHeader';
//import QuickActions from '../components/QuickActions';
//import FilterControls from '../components/FilterControls';
//import SearchBox from '../components/SearchBox';
//import useTechnologies from '../hooks/useTechnologies';
//import SystemAdvice from '../components/SystemAdvice';

//const HomePage = () => {
//    const {
//        technologies,
//        setTechnologies,
//        updateStatus,
//        updateNotes
//    } = useTechnologies();

//    const [activeFilter, setActiveFilter] = useState('all');
//    const [searchQuery, setSearchQuery] = useState('');

//    const handleStatusChange = (id, newStatus) => {
//        updateStatus(id, newStatus);
//    };

//    const handleMarkAllCompleted = () => {
//        setTechnologies(prev => prev.map(tech => ({ ...tech, status: 'completed' })));
//    };

//    const handleResetAll = () => {
//        setTechnologies(prev => prev.map(tech => ({ ...tech, status: 'not-started' })));
//    };

//    const handleImportData = (newTechnologies) => {
//        if (window.confirm('WARNING: THIS WILL OVERWRITE CURRENT DATA. PROCEED?')) {
//            setTechnologies(newTechnologies);
//        }
//    };

//    const handleRandomNext = () => {
//        const notStarted = technologies.filter(t => t.status === 'not-started');
//        if (notStarted.length === 0) {
//            alert('SYSTEM MESSAGE: Все протоколы уже активированы!');
//            return;
//        }
//        const randomTech = notStarted[Math.floor(Math.random() * notStarted.length)];
//        updateStatus(randomTech.id, 'in-progress');
//        alert(`TARGET ACQUIRED: "${randomTech.title}"`);
//    };

//    const searchFiltered = technologies.filter(tech =>
//        tech.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//        tech.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
//        (tech.notes && tech.notes.toLowerCase().includes(searchQuery.toLowerCase()))
//    );

//    const filteredTechnologies = searchFiltered.filter(tech => {
//        if (activeFilter === 'all') return true;
//        return tech.status === activeFilter;
//    });

//    return (
//        <div className="app">
//            <ProgressHeader technologies={technologies} />

//            <SystemAdvice />

//            <SearchBox
//                searchQuery={searchQuery}
//                setSearchQuery={setSearchQuery}
//                resultCount={filteredTechnologies.length}
//            />

//            <div className="controls-container">
//                <QuickActions
//                    onMarkAllCompleted={handleMarkAllCompleted}
//                    onResetAll={handleResetAll}
//                    onRandomNext={handleRandomNext}
//                    technologies={technologies}
//                    onImportData={handleImportData}
//                />
//                <FilterControls
//                    activeFilter={activeFilter}
//                    onFilterChange={setActiveFilter}
//                />
//            </div>

//            <div className="technologies-grid">
//                {filteredTechnologies.map(tech => (
//                    <TechnologyCard
//                        key={tech.id}
//                        id={tech.id}
//                        title={tech.title}
//                        description={tech.description}
//                        status={tech.status}
//                        notes={tech.notes}
//                        onStatusChange={handleStatusChange}
//                        onNotesChange={updateNotes}
//                    />
//                ))}
//            </div>

//            {filteredTechnologies.length === 0 && (
//                <div style={{ textAlign: 'center', color: '#005500', marginTop: '50px', fontFamily: 'monospace' }}>
//                    &lt; NO_DATA_FOUND /&gt;
//                </div>
//            )}
//        </div>
//    );
//};

//export default HomePage;


import React, { useState } from 'react';
import TechnologyCard from '../components/TechnologyCard';
import ProgressHeader from '../components/ProgressHeader';
import QuickActions from '../components/QuickActions';
import FilterControls from '../components/FilterControls';
import SearchBox from '../components/SearchBox';
import MassActionsPanel from '../components/MassActionsPanel'; // Импортируем панель
import useTechnologies from '../hooks/useTechnologies';
import SystemAdvice from '../components/SystemAdvice';

const HomePage = () => {
    const {
        technologies,
        setTechnologies,
        updateStatus,
        bulkUpdateStatus, // Берем из хука
        updateNotes
    } = useTechnologies();

    const [activeFilter, setActiveFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    // Состояние для выбранных карточек (Set работает быстрее массива для проверок)
    const [selectedIds, setSelectedIds] = useState(new Set());

    // Логика выбора карточки
    const handleToggleSelect = (id) => {
        const newSelected = new Set(selectedIds);
        if (newSelected.has(id)) {
            newSelected.delete(id);
        } else {
            newSelected.add(id);
        }
        setSelectedIds(newSelected);
    };

    // Массовое обновление статуса
    const handleMassStatusUpdate = (newStatus) => {
        if (selectedIds.size === 0) return;
        bulkUpdateStatus(Array.from(selectedIds), newStatus);
        setSelectedIds(new Set()); // Сброс выбора после действия
    };

    const handleCancelSelection = () => {
        setSelectedIds(new Set());
    };

    const handleStatusChange = (id, newStatus) => {
        updateStatus(id, newStatus);
    };

    const handleMarkAllCompleted = () => {
        setTechnologies(prev => prev.map(tech => ({ ...tech, status: 'completed' })));
    };

    const handleResetAll = () => {
        setTechnologies(prev => prev.map(tech => ({ ...tech, status: 'not-started' })));
    };

    const handleImportData = (newTechnologies) => {
        if (window.confirm('WARNING: THIS WILL OVERWRITE CURRENT DATA. PROCEED?')) {
            setTechnologies(newTechnologies);
        }
    };

    const handleRandomNext = () => {
        const notStarted = technologies.filter(t => t.status === 'not-started');
        if (notStarted.length === 0) {
            alert('SYSTEM MESSAGE: Все протоколы уже активированы!');
            return;
        }
        const randomTech = notStarted[Math.floor(Math.random() * notStarted.length)];
        updateStatus(randomTech.id, 'in-progress');
        alert(`TARGET ACQUIRED: "${randomTech.title}"`);
    };

    const searchFiltered = technologies.filter(tech =>
        tech.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tech.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (tech.notes && tech.notes.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const filteredTechnologies = searchFiltered.filter(tech => {
        if (activeFilter === 'all') return true;
        return tech.status === activeFilter;
    });

    return (
        <div className="app">
            <ProgressHeader technologies={technologies} />

            <SystemAdvice />

            <SearchBox
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                resultCount={filteredTechnologies.length}
            />

            <div className="controls-container">
                <QuickActions
                    onMarkAllCompleted={handleMarkAllCompleted}
                    onResetAll={handleResetAll}
                    onRandomNext={handleRandomNext}
                    technologies={technologies}
                    onImportData={handleImportData}
                />
                <FilterControls
                    activeFilter={activeFilter}
                    onFilterChange={setActiveFilter}
                />
            </div>

            {/* Подсказка о возможности выбора */}
            <div style={{ textAlign: 'center', marginBottom: '10px', color: '#005500', fontSize: '0.8em', fontFamily: 'monospace' }}>
                [TIP: CLICK THE SQUARE ICON ON CARDS TO SELECT MULTIPLE UNITS]
            </div>

            <div className="technologies-grid">
                {filteredTechnologies.map(tech => (
                    <TechnologyCard
                        key={tech.id}
                        id={tech.id}
                        title={tech.title}
                        description={tech.description}
                        status={tech.status}
                        notes={tech.notes}
                        onStatusChange={handleStatusChange}
                        onNotesChange={updateNotes}
                        // Прокидываем пропсы для выбора
                        isSelected={selectedIds.has(tech.id)}
                        onToggleSelect={handleToggleSelect}
                    />
                ))}
            </div>

            {/* Панель массовых действий */}
            <MassActionsPanel
                selectedCount={selectedIds.size}
                onUpdateStatus={handleMassStatusUpdate}
                onCancelSelection={handleCancelSelection}
            />

            {filteredTechnologies.length === 0 && (
                <div style={{ textAlign: 'center', color: '#005500', marginTop: '50px', fontFamily: 'monospace' }}>
                    &lt; NO_DATA_FOUND /&gt;
                </div>
            )}
        </div>
    );
};

export default HomePage;