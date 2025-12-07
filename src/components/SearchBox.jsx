import React from 'react';
import './SearchBox.css';

const SearchBox = ({ searchQuery, setSearchQuery, resultCount }) => {
    return (
        <div className="search-box-container">
            <div className="search-box">
                <span className="search-icon">🔍</span>
                <input
                    type="text"
                    className="search-input"
                    placeholder="Поиск технологий..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div className="search-stats">
                    <span className="result-count">
                        Найдено: <strong>{resultCount}</strong>
                    </span>
                    {searchQuery && (
                        <button
                            className="clear-search"
                            onClick={() => setSearchQuery('')}
                            title="Очистить поиск"
                        >
                            ✕
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchBox;