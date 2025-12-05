import React from 'react';
import './FilterControls.css';

const FilterControls = ({ activeFilter, onFilterChange }) => {
    const filters = [
        { id: 'all', label: 'Все', icon: '📚' },
        { id: 'not-started', label: 'Не начатые', icon: '⏳' },
        { id: 'in-progress', label: 'В процессе', icon: '🔄' },
        { id: 'completed', label: 'Выполненные', icon: '✅' }
    ];

    return (
        <div className="filter-controls">
            <h3>Фильтр по статусу</h3>
            <div className="filter-buttons">
                {filters.map(filter => (
                    <button
                        key={filter.id}
                        className={`filter-btn ${activeFilter === filter.id ? 'active' : ''}`}
                        onClick={() => onFilterChange(filter.id)}
                    >
                        <span className="filter-icon">{filter.icon}</span>
                        <span className="filter-label">{filter.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default FilterControls;