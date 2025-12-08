import React, { useState, useEffect } from 'react';
import './App.css';
import TechnologyCard from './components/TechnologyCard';
import ProgressHeader from './components/ProgressHeader';
import QuickActions from './components/QuickActions';
import FilterControls from './components/FilterControls';
import GlitchEffects from './components/GlitchEffects';
import SearchBox from './components/SearchBox';
import ProgressBar from './components/ProgressBar';
import useTechnologies from './hooks/useTechnologies';

const App = () => {

    const {
        technologies,
        setTechnologies,
        updateStatus,
        updateNotes,
        progress
    } = useTechnologies();

    const [activeFilter, setActiveFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    //// Загружаем данные из localStorage при первом рендере
    //useEffect(() => {
    //    const saved = localStorage.getItem('techTrackerData');
    //    if (saved) {
    //        setTechnologies(JSON.parse(saved));
    //        console.log('Данные загружены из localStorage');
    //    } else {
    //        setTechnologies(initialTechnologies);
    //    }
    //}, []);

    //// Сохраняем технологии в localStorage при любом изменении
    //useEffect(() => {
    //    if (technologies.length > 0) {
    //        localStorage.setItem('techTrackerData', JSON.stringify(technologies));
    //        console.log('Данные сохранены в localStorage');
    //    }
    //}, [technologies]);


    const handleStatusChange = (id, newStatus) => {
        setTechnologies(prev => prev.map(tech =>
            tech.id === id ? { ...tech, status: newStatus } : tech
        ));
    };

    const handleMarkAllCompleted = () => {
        setTechnologies(prev => prev.map(tech => ({
            ...tech,
            status: 'completed'
        })));
    };

    const handleResetAll = () => {
        setTechnologies(prev => prev.map(tech => ({
            ...tech,
            status: 'not-started'
        })));
    };

    const handleRandomNext = () => {
        const notStarted = technologies.filter(t => t.status === 'not-started');
        if (notStarted.length === 0) {
            alert('Все технологии уже начаты или завершены!');
            return;
        }

        const randomTech = notStarted[Math.floor(Math.random() * notStarted.length)];
        handleStatusChange(randomTech.id, 'in-progress');

        alert(`Следующая технология для изучения: "${randomTech.title}"`);
    };

    // Фильтрация для поиска
    const searchFiltered = technologies.filter(tech =>
        tech.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tech.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (tech.notes && tech.notes.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    // Затем уже применяем фильтр по статусу
    const filteredTechnologies = searchFiltered.filter(tech => {
        if (activeFilter === 'all') return true;
        return tech.status === activeFilter;
    });

    const updateTechnologyNotes = (techId, newNotes) => {
        // Ограничиваем длину заметок
        const truncatedNotes = newNotes.slice(0, 500);

        setTechnologies(prevTech =>
            prevTech.map(tech =>
                tech.id === techId ? { ...tech, notes: truncatedNotes } : tech
            )
        );
    };
    return (
        <div>
            <GlitchEffects />
            <div className="app">
                <ProgressHeader technologies={technologies} />

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
                    />
                    <FilterControls
                        activeFilter={activeFilter}
                        onFilterChange={setActiveFilter}
                    />
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
                            onNotesChange={updateTechnologyNotes}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default App;