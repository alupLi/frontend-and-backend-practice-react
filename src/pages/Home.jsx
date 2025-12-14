import React, { useState } from 'react';
import TechnologyCard from '../components/TechnologyCard';
import ProgressHeader from '../components/ProgressHeader';
import QuickActions from '../components/QuickActions';
import FilterControls from '../components/FilterControls';
import SearchBox from '../components/SearchBox';
import useTechnologies from '../hooks/useTechnologies';
import SystemAdvice from '../components/SystemAdvice';

const HomePage = () => {
    const {
        technologies,
        setTechnologies,
        updateStatus,
        updateNotes
    } = useTechnologies();

    const [activeFilter, setActiveFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

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
                    />
                ))}
            </div>

            {filteredTechnologies.length === 0 && (
                <div style={{ textAlign: 'center', color: '#005500', marginTop: '50px', fontFamily: 'monospace' }}>
                    &lt; NO_DATA_FOUND /&gt;
                </div>
            )}
        </div>
    );
};

export default HomePage;