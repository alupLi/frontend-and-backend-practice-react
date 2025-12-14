
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import './App.css';
import GlitchEffects from './components/GlitchEffects';

// Импорт страниц
import TechnologyList from './pages/TechnologyList';
import TechnologyDetail from './pages/TechnologyDetail';
import TechnologyListDetail from './pages/TechnologyListDetail';
import AddTechnology from './pages/AddTechnology';
import Statistics from './pages/Statistics';
import Settings from './pages/Settings';
import HomePage from './pages/Home';
import Navigation from './components/Navigation'

const App = () => {
    return (
        <Router>
            <GlitchEffects />
            <div style={{ position: 'relative', zIndex: 1, minHeight: '100vh' }}>
                <Navigation />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/technology/:id" element={<TechnologyDetail />} />
                    <Route path="/list" element={<TechnologyList />} />\
                    <Route path="/list/technology/:id" element={<TechnologyListDetail /> } />
                    <Route path="/add" element={<AddTechnology />} />
                    <Route path="/stats" element={<Statistics />} />
                    <Route path="/settings" element={<Settings />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;