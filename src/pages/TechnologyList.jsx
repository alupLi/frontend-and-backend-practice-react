import React, { useState, useEffect, useRef } from 'react';
import TechnologyCard from '../components/TechnologyCard';
import SearchBox from '../components/SearchBox';


const API_URL = 'https://raw.githubusercontent.com/alupLi/frontend-and-backend-practice-react/refs/heads/main/technologies.json';

const TechnologyList = () => {
    const [technologies, setTechnologies] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const searchTimeoutRef = useRef(null);
    const abortControllerRef = useRef(null);

    const fetchTechnologies = async (query, signal) => {
        try {
            setLoading(true);
            setError(null);

            await new Promise(resolve => setTimeout(resolve, 1000));

            const response = await fetch(API_URL, { signal });

            if (!response.ok) {
                throw new Error(`HTTP Error: ${response.status}`);
            }

            const data = await response.json();

            // Так как GitHub отдает статический JSON, мы фильтруем полученные данные здесь.
            // Это имитирует поиск на сервере.
            let filteredData = data;
            if (query) {
                filteredData = data.filter(tech =>
                    tech.title.toLowerCase().includes(query.toLowerCase()) ||
                    tech.description.toLowerCase().includes(query.toLowerCase())
                );
            }

            setTechnologies(filteredData);

        } catch (err) {
            // Если ошибка вызвана отменой запроса (AbortController), игнорируем её
            if (err.name !== 'AbortError') {
                console.error('Ошибка загрузки:', err);
                setError('SYSTEM FAILURE: UNABLE TO RETRIEVE DATA PACKETS');
            }
        } finally {
            // Если запрос не был отменен, выключаем загрузку
            if (!signal?.aborted) {
                setLoading(false);
            }
        }
    };

    // Эффект Debounce (Задержка ввода)
    useEffect(() => {
        // Отменяем предыдущий запрос
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }
        // Очищаем таймер
        if (searchTimeoutRef.current) {
            clearTimeout(searchTimeoutRef.current);
        }

        // Создаем новый контроллер отмены
        const controller = new AbortController();
        abortControllerRef.current = controller;

        // Запускаем поиск только через 800мс после окончания ввода
        searchTimeoutRef.current = setTimeout(() => {
            fetchTechnologies(searchQuery, controller.signal);
        }, 800);

        return () => {
            if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
            if (abortControllerRef.current) abortControllerRef.current.abort();
        };
    }, [searchQuery]);

    const handleStatusMock = () => alert('ACCESS DENIED: READ ONLY MODE (API)');
    const handleNotesMock = () => { };

    return (
        <div className="app">
            <h1 className="glitch-text" style={{ textAlign: 'center', margin: '20px 0', fontFamily: 'Courier New' }}>
                // GLOBAL_NETWORK_SEARCH (VIEWING ONLY)
            </h1>

            <SearchBox
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                resultCount={loading ? 'Scanning...' : technologies.length}
            />

            {/* Лоадер */}
            {loading && (
                <div style={{ textAlign: 'center', padding: '40px', color: '#00ff00', fontFamily: 'monospace' }}>
                    <div className="spinner" style={{
                        width: '40px', height: '40px', border: '4px solid #003300',
                        borderTop: '4px solid #00ff00', borderRadius: '50%',
                        margin: '0 auto 20px', animation: 'spin 1s linear infinite'
                    }}></div>
                    &gt; DOWNLOAD IN PROGRESS...
                    <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
                </div>
            )}

            {error && (
                <div style={{ color: '#ff3300', textAlign: 'center', border: '1px solid #ff3300', padding: '20px', margin: '20px 0' }}>
                    ⚠ CRITICAL ERROR: {error}
                </div>
            )}

            {!loading && !error && (
                <div className="technologies-grid">
                    {technologies.length > 0 ? (
                        technologies.map(tech => (
                            <TechnologyCard
                                key={tech.id}
                                id={tech.id}
                                title={tech.title}
                                description={tech.description}
                                status={tech.status}
                                notes={tech.notes}
                                onStatusChange={handleStatusMock}
                                onNotesChange={handleNotesMock}
                                cardInList={true}
                            />
                        ))
                    ) : (
                        <div style={{ textAlign: 'center', width: '100%', color: '#005500', fontFamily: 'monospace' }}>
                            &lt; NO_DATA_FOUND /&gt;
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default TechnologyList;