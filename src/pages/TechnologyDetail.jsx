//import React, { useEffect, useState } from 'react';
//import { useParams, useNavigate, Link } from 'react-router-dom';
//import useTechnologies from '../hooks/useTechnologies';

//const TechnologyDetail = () => {
//    const { id } = useParams(); // Получаем ID из URL [cite: 177]
//    const navigate = useNavigate();
//    const { technologies, updateStatus, updateNotes } = useTechnologies();

//    // Находим конкретную технологию
//    const tech = technologies.find(t => t.id === parseInt(id));

//    // Локальное состояние для заметок, чтобы сохранять при потере фокуса или нажатии
//    const [localNotes, setLocalNotes] = useState('');

//    useEffect(() => {
//        if (tech) {
//            setLocalNotes(tech.notes || '');
//        }
//    }, [tech]);

//    if (!tech) {
//        return (
//            <div className="detail-container">
//                <h1 className="glitch-text">ERROR 404: DATA NOT FOUND</h1>
//                <Link to="/" className="back-btn">&lt; RETURN TO BASE</Link>
//            </div>
//        );
//    }

//    const handleNoteChange = (e) => {
//        setLocalNotes(e.target.value);
//        updateNotes(tech.id, e.target.value);
//    };

//    return (
//        <div className="detail-page" style={{ padding: '20px' }}>
//            <Link to="/" className="back-btn blink-broken">&lt; RETURN TO GRID</Link>

//            <div className="detail-container">
//                <div className="detail-header">
//                    <h1 className="glitch-hover">{tech.title}</h1>
//                    <div className={`status-text status-${tech.status}`}>
//                        CURRENT STATUS: {tech.status.toUpperCase()}
//                    </div>
//                </div>

//                <div className="detail-section">
//                    <h3>// SYSTEM_DESCRIPTION</h3>
//                    <p className="detail-text">{tech.description}</p>
//                </div>

//                <div className="detail-section">
//                    <h3>// OVERRIDE_STATUS</h3>
//                    <div className="status-buttons-large">
//                        <button
//                            className={`status-btn ${tech.status === 'not-started' ? 'active' : ''}`}
//                            onClick={() => updateStatus(tech.id, 'not-started')}
//                            style={{ color: '#777', borderColor: '#777' }}
//                        >
//                            [ NOT STARTED ]
//                        </button>
//                        <button
//                            className={`status-btn ${tech.status === 'in-progress' ? 'active-progress' : ''}`}
//                            onClick={() => updateStatus(tech.id, 'in-progress')}
//                        >
//                            [ IN PROGRESS ]
//                        </button>
//                        <button
//                            className={`status-btn ${tech.status === 'completed' ? 'active-completed' : ''}`}
//                            onClick={() => updateStatus(tech.id, 'completed')}
//                        >
//                            [ COMPLETED ]
//                        </button>
//                    </div>
//                </div>

//                <div className="detail-section">
//                    <h3>// USER_LOGS (NOTES)</h3>
//                    <textarea
//                        className="notes-area"
//                        style={{
//                            width: '100%',
//                            minHeight: '150px',
//                            background: '#001100',
//                            border: '1px solid #005500',
//                            color: '#00ff00',
//                            fontFamily: 'monospace',
//                            padding: '10px'
//                        }}
//                        value={localNotes}
//                        onChange={handleNoteChange}
//                        placeholder="ENTER LOG DATA..."
//                    />
//                </div>
//            </div>
//        </div>
//    );
//};

//export default TechnologyDetail;

import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import useTechnologies from '../hooks/useTechnologies';
import '../components/TechnologyCard.css'; 

const TechnologyDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { technologies, updateStatus, updateNotes } = useTechnologies();

    const tech = technologies.find(t => t.id === parseInt(id));

    if (!tech) {
        return (
            <div className="app" style={{ textAlign: 'center', marginTop: '100px' }}>
                <h1 className="glitch-text" style={{ color: 'red' }}>ERROR 404: PROTOCOL MISSING</h1>
                <Link to="/" className="action-btn random-next" style={{ display: 'inline-block', marginTop: '20px', textDecoration: 'none' }}>
                    RETURN TO BASE
                </Link>
            </div>
        );
    }

    return (
        <div className="app" style={{ maxWidth: '800px', margin: '0 auto' }}>
            <button onClick={() => navigate(-1)} className="blink-broken TD-back-btn">
                &lt; BACK
            </button>

            <div className={`technology-card ${tech.status}`} style={{ minHeight: '60vh' }}>
                <div className="card-header" style={{ borderBottom: '1px solid #004400', paddingBottom: '20px' }}>
                    <h1 className="glitch-hover" style={{ fontSize: '2em', margin: 0, color: tech.status === 'completed' ? '#00ff00' : tech.status == 'in-progress' ? '#ffaa00' : '#666'}}>{tech.title}</h1>
                    <span className={`status-badge ${tech.status}`} style={{ fontSize: '2em' }}>
                        {tech.status === 'completed' ? '✅' : tech.status === 'in-progress' ? '🔄' : '⏳'}
                    </span>
                </div>

                <div className="TD-content">
                    <h3 style={{ color: '#008800' }}>// DESCRIPTION_LOG:</h3>
                    <p style={{ color: '#ccffcc', fontFamily: 'Roboto Mono', fontSize: '1.1em', lineHeight: '1.6' }}>
                        {tech.description}
                    </p>
                </div>

                <div className="TD-content">
                    <h3 style={{ color: '#008800'}}>// MANUAL_OVERRIDE:</h3>
                    <div className="status-buttons-large">
                        <button
                            className={`status-btn ${tech.status === 'not-started' ? 'active' : ''}`}
                            onClick={() => updateStatus(tech.id, 'not-started')}
                            style={{ color: '#777', borderColor: '#777' }}
                        >
                            [ NOT STARTED ]
                        </button>
                        <button
                            className={`status-btn ${tech.status === 'in-progress' ? 'active-progress' : ''}`}
                            onClick={() => updateStatus(tech.id, 'in-progress')}
                        >
                            [ IN PROGRESS ]
                        </button>
                        <button
                            className={`status-btn ${tech.status === 'completed' ? 'active-completed' : ''}`}
                            onClick={() => updateStatus(tech.id, 'completed')}
                        >
                            [ COMPLETED ]
                        </button>
                    </div>
                </div>

                <div style={{ margin: '30px 0' }}>
                    <h3 style={{ color: '#008800', fontFamily: 'Courier New' }}>// USER_NOTES:</h3>
                    <textarea
                        className="notes-textarea"
                        value={tech.notes || ''}
                        onChange={(e) => updateNotes(tech.id, e.target.value)}
                        rows="10"
                        placeholder="ENTER ADDITIONAL DATA..."
                    />
                </div>
            </div>
        </div>
    );
};

export default TechnologyDetail;