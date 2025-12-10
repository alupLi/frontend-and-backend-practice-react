//import React, { useState, useEffect } from 'react';
//import './App.css';
//import TechnologyCard from './components/TechnologyCard';
//import ProgressHeader from './components/ProgressHeader';
//import QuickActions from './components/QuickActions';
//import FilterControls from './components/FilterControls';
//import GlitchEffects from './components/GlitchEffects';
//import SearchBox from './components/SearchBox';
//import ProgressBar from './components/ProgressBar';
//import useTechnologies from './hooks/useTechnologies';

//const App = () => {

//    const {
//        technologies,
//        setTechnologies,
//        updateStatus,
//        updateNotes,
//        progress
//    } = useTechnologies();

//    const [activeFilter, setActiveFilter] = useState('all');
//    const [searchQuery, setSearchQuery] = useState('');

//    //// Загружаем данные из localStorage при первом рендере
//    //useEffect(() => {
//    //    const saved = localStorage.getItem('techTrackerData');
//    //    if (saved) {
//    //        setTechnologies(JSON.parse(saved));
//    //        console.log('Данные загружены из localStorage');
//    //    } else {
//    //        setTechnologies(initialTechnologies);
//    //    }
//    //}, []);

//    //// Сохраняем технологии в localStorage при любом изменении
//    //useEffect(() => {
//    //    if (technologies.length > 0) {
//    //        localStorage.setItem('techTrackerData', JSON.stringify(technologies));
//    //        console.log('Данные сохранены в localStorage');
//    //    }
//    //}, [technologies]);


//    const handleStatusChange = (id, newStatus) => {
//        setTechnologies(prev => prev.map(tech =>
//            tech.id === id ? { ...tech, status: newStatus } : tech
//        ));
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

//    // Фильтрация для поиска
//    const searchFiltered = technologies.filter(tech =>
//        tech.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//        tech.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
//        (tech.notes && tech.notes.toLowerCase().includes(searchQuery.toLowerCase()))
//    );

//    // Затем уже применяем фильтр по статусу
//    const filteredTechnologies = searchFiltered.filter(tech => {
//        if (activeFilter === 'all') return true;
//        return tech.status === activeFilter;
//    });

//    const updateTechnologyNotes = (techId, newNotes) => {
//        // Ограничиваем длину заметок
//        const truncatedNotes = newNotes.slice(0, 500);

//        setTechnologies(prevTech =>
//            prevTech.map(tech =>
//                tech.id === techId ? { ...tech, notes: truncatedNotes } : tech
//            )
//        );
//    };
//    return (
//        <div>
//            <GlitchEffects />
//            <div className="app">
//                <ProgressHeader technologies={technologies} />

//                <SearchBox
//                    searchQuery={searchQuery}
//                    setSearchQuery={setSearchQuery}
//                    resultCount={filteredTechnologies.length}
//                />

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
//            </div>
//        </div>
//    );
//};

//export default App;

//import React from 'react';
//import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // [cite: 17, 116]
//import './App.css';
//import GlitchEffects from './components/GlitchEffects';
//import Navigation from './components/Navigation';

//// Импорт страниц
//import HomePage from './pages/Home';
//import TechnologyDetail from './pages/TechnologyDetail';

//const App = () => {
//    return (
//        <Router>
//            <div className="app-wrapper">
//                {/* Фоновые эффекты остаются на месте, чтобы быть везде */}
//                <GlitchEffects />

//                <div className="app">
//                    {/* Навигация отображается на всех страницах */}
//                    <Navigation />

//                    {/* Настройка маршрутов [cite: 45] */}
//                    <Routes>
//                        <Route path="/" element={<HomePage />} />
//                        <Route path="/technology/:id" element={<TechnologyDetail />} /> {/* Параметр :id [cite: 164] */}
//                    </Routes>
//                </div>
//            </div>
//        </Router>
//    );
//};

//export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import './App.css';
import GlitchEffects from './components/GlitchEffects';

// Импорт страниц
import TechnologyList from './pages/TechnologyList';
import TechnologyDetail from './pages/TechnologyDetail';
import AddTechnology from './pages/AddTechnology';
import Statistics from './pages/Statistics';
import Settings from './pages/Settings';
import Navigation from './components/Navigation'

// Компонент навигации внутри Router
//const Navigation = () => {
//    const location = useLocation();

//    const getLinkClass = (path) => {
//        return `nav-link ${location.pathname === path ? 'active' : ''}`;
//    };

//    return (
//        <nav style={{
//            display: 'flex', justifyContent: 'space-between', padding: '15px',
//            background: 'rgba(0,15,0,0.95)', borderBottom: '2px solid #005500', marginBottom: '20px'
//        }}>
//            <div className="nav-brand">
//                <Link to="/" style={{ textDecoration: 'none', color: '#00ff00', fontFamily: 'Courier New', fontWeight: 'bold', fontSize: '1.2em' }}>
//                    SYSTEM.ROOT
//                </Link>
//            </div>
//            <div className="nav-links" style={{ display: 'flex', gap: '20px' }}>
//                <Link to="/" className={getLinkClass('/')} style={{ color: '#008800', textDecoration: 'none', fontFamily: 'monospace' }}>[HOME]</Link>
//                <Link to="/add" className={getLinkClass('/add')} style={{ color: '#008800', textDecoration: 'none', fontFamily: 'monospace' }}>[ADD]</Link>
//                <Link to="/stats" className={getLinkClass('/stats')} style={{ color: '#008800', textDecoration: 'none', fontFamily: 'monospace' }}>[STATS]</Link>
//                <Link to="/settings" className={getLinkClass('/settings')} style={{ color: '#008800', textDecoration: 'none', fontFamily: 'monospace' }}>[CONFIG]</Link>
//            </div>
//        </nav>
//    );
//};

const App = () => {
    return (
        <Router>
            <GlitchEffects />
            <div style={{ position: 'relative', zIndex: 1, minHeight: '100vh' }}>
                <Navigation />
                <Routes>
                    <Route path="/" element={<TechnologyList />} />
                    <Route path="/technology/:id" element={<TechnologyDetail />} />
                    <Route path="/add" element={<AddTechnology />} />
                    <Route path="/stats" element={<Statistics />} />
                    <Route path="/settings" element={<Settings />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;