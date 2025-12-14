import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navigation.css';

const Navigation = () => {
    const location = useLocation();

    const getLinkClass = (path) => {
        return `nav-link ${location.pathname === path ? 'active' : ''}`;
    };

    return (
        <nav className="nav-panel">
            <div className="nav-brand">
                <Link to="/" className="system-root">SYSTEM.ROOT</Link>
            </div>
            <div className="nav-links">
                <Link to="/" className={getLinkClass('/')}>[HOME]</Link>
                <Link to="/list" className={getLinkClass('/list')}>[List]</Link>
                <Link to="/add" className={getLinkClass('/add')}>[ADD]</Link>
                <Link to="/stats" className={getLinkClass('/stats')}>[STATS]</Link>
                <Link to="/settings" className={getLinkClass('/settings')}>[CONFIG]</Link>
            </div>
        </nav>
    );
};

export default Navigation;