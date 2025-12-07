import React, { useState, useEffect } from 'react';
import './App.css';
import TechnologyCard from './components/TechnologyCard';
import ProgressHeader from './components/ProgressHeader';
import QuickActions from './components/QuickActions';
import FilterControls from './components/FilterControls';
import GlitchEffects from './components/GlitchEffects';
import SearchBox from './components/SearchBox';

const App = () => {
    const initialTechnologies = [
        {
            id: 1,
            title: 'React Components',
            description: 'Изучение функциональных и классовых компонентов, их жизненного цикла',
            status: 'completed',
            notes: ''
        },
        {
            id: 2,
            title: 'JSX Syntax',
            description: 'Освоение синтакса JSX, условного рендеринга и списков',
            status: 'completed',
            notes: ''
        },
        {
            id: 3,
            title: 'State Management',
            description: 'Работа с состоянием компонентов, использование хуков useState и useEffect',
            status: 'in-progress',
            notes: ''
        },
        {
            id: 4,
            title: 'Props & Context',
            description: 'Передача данных между компонентами, использование Context API',
            status: 'not-started',
            notes: ''
        },
        {
            id: 5,
            title: 'React Router',
            description: 'Настройка маршрутизации в React-приложениях',
            status: 'not-started',
            notes: ''
        },
        {
            id: 6,
            title: 'Custom Hooks',
            description: 'Создание собственных хуков для переиспользования логики',
            status: 'not-started',
            notes: ''
        }
    ];

    const [technologies, setTechnologies] = useState([]);
    const [activeFilter, setActiveFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    // Загружаем данные из localStorage при первом рендере
    useEffect(() => {
        const saved = localStorage.getItem('techTrackerData');
        if (saved) {
            setTechnologies(JSON.parse(saved));
            console.log('Данные загружены из localStorage');
        } else {
            setTechnologies(initialTechnologies);
        }
    }, []);

    // Сохраняем технологии в localStorage при любом изменении
    useEffect(() => {
        if (technologies.length > 0) {
            localStorage.setItem('techTrackerData', JSON.stringify(technologies));
            console.log('Данные сохранены в localStorage');
        }
    }, [technologies]);
    //const [technologies, setTechnologies] = useState([
    //    {
    //        id: 1,
    //        title: 'React Components',
    //        description: 'Изучение функциональных и классовых компонентов, их жизненного цикла',
    //        status: 'completed',
    //        notes: ''
    //    },
    //    {
    //        id: 2,
    //        title: 'JSX Syntax',
    //        description: 'Освоение синтакса JSX, условного рендеринга и списков',
    //        status: 'completed',
    //        notes: ''
    //    },
    //    {
    //        id: 3,
    //        title: 'State Management',
    //        description: 'Работа с состоянием компонентов, использование хуков useState и useEffect',
    //        status: 'in-progress',
    //        notes: ''
    //    },
    //    {
    //        id: 4,
    //        title: 'Props & Context',
    //        description: 'Передача данных между компонентами, использование Context API',
    //        status: 'not-started',
    //        notes: ''
    //    },
    //    {
    //        id: 5,
    //        title: 'React Router',
    //        description: 'Настройка маршрутизации в React-приложениях',
    //        status: 'not-started',
    //        notes: ''
    //    },
    //    {
    //        id: 6,
    //        title: 'Custom Hooks',
    //        description: 'Создание собственных хуков для переиспользования логики',
    //        status: 'not-started',
    //        notes: ''
    //    }
    //]);

    //const [activeFilter, setActiveFilter] = useState('all');

    //useEffect(() => {
    //    const saved = localStorage.getItem('techTrackerData');
    //    if (saved) {
    //        setTechnologies(JSON.parse(saved));
    //        console.log('Данные загружены из localStorage');
    //    }
    //}, []);

    //// Сохраняем технологии в localStorage при любом изменении
    //useEffect(() => {
    //    localStorage.setItem('techTrackerData', JSON.stringify(technologies));
    //    console.log('Данные сохранены в localStorage');
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


//import React, { useState, useEffect } from 'react';
//import './App.css';
//import TechnologyCard from './components/TechnologyCard';
//import ProgressHeader from './components/ProgressHeader';
//import QuickActions from './components/QuickActions';
//import FilterControls from './components/FilterControls';
//import GlitchEffects from './components/GlitchEffects';

//const App = () => {
//    const initialTechnologies = [
//        {
//            id: 1,
//            title: 'React Components',
//            description: 'Изучение функциональных и классовых компонентов, их жизненного цикла',
//            status: 'completed',
//            notes: ''
//        },
//        {
//            id: 2,
//            title: 'JSX Syntax',
//            description: 'Освоение синтакса JSX, условного рендеринга и списков',
//            status: 'completed',
//            notes: ''
//        },
//        {
//            id: 3,
//            title: 'State Management',
//            description: 'Работа с состоянием компонентов, использование хуков useState и useEffect',
//            status: 'in-progress',
//            notes: ''
//        },
//        {
//            id: 4,
//            title: 'Props & Context',
//            description: 'Передача данных между компонентами, использование Context API',
//            status: 'not-started',
//            notes: ''
//        },
//        {
//            id: 5,
//            title: 'React Router',
//            description: 'Настройка маршрутизации в React-приложениях',
//            status: 'not-started',
//            notes: ''
//        },
//        {
//            id: 6,
//            title: 'Custom Hooks',
//            description: 'Создание собственных хуков для переиспользования логики',
//            status: 'not-started',
//            notes: ''
//        }
//    ];

//    const [technologies, setTechnologies] = useState([]);
//    const [activeFilter, setActiveFilter] = useState('all');
//    const [searchQuery, setSearchQuery] = useState('');

//    // Загружаем данные из localStorage при первом рендере
//    useEffect(() => {
//        const saved = localStorage.getItem('techTrackerData');
//        if (saved) {
//            setTechnologies(JSON.parse(saved));
//            console.log('Данные загружены из localStorage');
//        } else {
//            setTechnologies(initialTechnologies);
//        }
//    }, []);

//    // Сохраняем технологии в localStorage при любом изменении
//    useEffect(() => {
//        if (technologies.length > 0) {
//            localStorage.setItem('techTrackerData', JSON.stringify(technologies));
//            console.log('Данные сохранены в localStorage');
//        }
//    }, [technologies]);

//    const handleStatusChange = (id, newStatus) => {
//        setTechnologies(prev => prev.map(tech =>
//            tech.id === id ? { ...tech, status: newStatus } : tech
//        ));
//    };

//    const updateTechnologyNotes = (techId, newNotes) => {
//        setTechnologies(prevTech =>
//            prevTech.map(tech =>
//                tech.id === techId ? { ...tech, notes: newNotes } : tech
//            )
//        );
//    };

//    const handleMarkAllCompleted = () => {
//        setTechnologies(prev => prev.map(tech => ({
//            ...tech,
//            status: 'completed'
//        })));
//    };

//    const handleResetAll = () => {
//        setTechnologies(prev => prev.map(tech => ({
//            ...tech,
//            status: 'not-started'
//        })));
//    };

//    const handleRandomNext = () => {
//        const notStarted = technologies.filter(t => t.status === 'not-started');
//        if (notStarted.length === 0) {
//            alert('Все технологии уже начаты или завершены!');
//            return;
//        }

//        const randomTech = notStarted[Math.floor(Math.random() * notStarted.length)];
//        handleStatusChange(randomTech.id, 'in-progress');

//        alert(`Следующая технология для изучения: "${randomTech.title}"`);
//    };

//    // Фильтрация по статусу
//    const filteredByStatus = technologies.filter(tech => {
//        if (activeFilter === 'all') return true;
//        return tech.status === activeFilter;
//    });

//    // Фильтрация по поиску
//    const filteredTechnologies = filteredByStatus.filter(tech =>
//        tech.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//        tech.description.toLowerCase().includes(searchQuery.toLowerCase())
//    );

//    return (
//        <div>
//            <GlitchEffects />
//            <div className="app">
//                <ProgressHeader technologies={technologies} />

//                <div className="controls-container">
//                    <QuickActions
//                        onMarkAllCompleted={handleMarkAllCompleted}
//                        onResetAll={handleResetAll}
//                        onRandomNext={handleRandomNext}
//                    />
//                    <FilterControls
//                        activeFilter={activeFilter}
//                        onFilterChange={setActiveFilter}
//                    />
//                </div>

//                <div className="search-box">
//                    <input
//                        type="text"
//                        placeholder="Поиск технологий..."
//                        value={searchQuery}
//                        onChange={(e) => setSearchQuery(e.target.value)}
//                    />
//                    <span className="search-results">Найдено: {filteredTechnologies.length}</span>
//                </div>

//                <div className="technologies-grid">
//                    {filteredTechnologies.map(tech => (
//                        <TechnologyCard
//                            key={tech.id}
//                            id={tech.id}
//                            title={tech.title}
//                            description={tech.description}
//                            status={tech.status}
//                            notes={tech.notes}
//                            onStatusChange={handleStatusChange}
//                            onNotesChange={updateTechnologyNotes}
//                        />
//                    ))}
//                </div>

//                {filteredTechnologies.length === 0 && (
//                    <div className="no-results">
//                        <p>Технологии не найдены.  Попробуйте изменить поисковый запрос.</p>
//                    </div>
//                )}
//            </div>
//        </div>
//    );
//};

//export default App;