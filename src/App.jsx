import React from 'react';
import './App.css';
import TechnologyCard from './components/TechnologyCard';
import ProgressHeader from './components/ProgressHeader';

const App = () => {
    const technologies = [
        {
            id: 1,
            title: 'React Components',
            description: 'Изучение функциональных и классовых компонентов, их жизненного цикла',
            status: 'completed'
        },
        {
            id: 2,
            title: 'JSX Syntax',
            description: 'Освоение синтаксиса JSX, условного рендеринга и списков',
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
    ];

    return (
        <div className="app">
            <ProgressHeader technologies={technologies} />

            <div className="technologies-grid">
                {technologies.map(tech => (
                    <TechnologyCard
                        key={tech.id}
                        title={tech.title}
                        description={tech.description}
                        status={tech.status}
                    />
                ))}
            </div>
        </div>
    );
};

export default App;