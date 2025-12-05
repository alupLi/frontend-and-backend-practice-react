import React, { useState } from 'react';
import './App.css';
import TechnologyCard from './components/TechnologyCard';
import ProgressHeader from './components/ProgressHeader';
import QuickActions from './components/QuickActions';
import FilterControls from './components/FilterControls';
import GlitchEffects from './components/GlitchEffects';
import VHSEffects from './components/VHSEffects';

const App = () => {
    const [technologies, setTechnologies] = useState([
        {
            id: 1,
            title: 'React Components',
            description: 'Изучение функциональных и классовых компонентов, их жизненного цикла',
            status: 'completed'
        },
        {
            id: 2,
            title: 'JSX Syntax',
            description: 'Освоение синтакса JSX, условного рендеринга и списков',
            status: 'completed'
        },
        {
            id: 3,
            title: 'State Management',
            description: 'Работа с состоянием компонентов, использование хуков useState и useEffect',
            status: 'in-progress'
        },
        {
            id: 4,
            title: 'Props & Context',
            description: 'Передача данных между компонентами, использование Context API',
            status: 'not-started'
        },
        {
            id: 5,
            title: 'React Router',
            description: 'Настройка маршрутизации в React-приложениях',
            status: 'not-started'
        },
        {
            id: 6,
            title: 'Custom Hooks',
            description: 'Создание собственных хуков для переиспользования логики',
            status: 'not-started'
        }
    ]);

    const [activeFilter, setActiveFilter] = useState('all');

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

    const filteredTechnologies = technologies.filter(tech => {
        if (activeFilter === 'all') return true;
        return tech.status === activeFilter;
    });

    return (
        <div className="app">
            <VHSEffects />
            <GlitchEffects />

            <ProgressHeader technologies={technologies} />

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
                        onStatusChange={handleStatusChange}
                    />
                ))}
            </div>
        </div>
    );
};

export default App;