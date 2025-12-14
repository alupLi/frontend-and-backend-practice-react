import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import useTechnologies from '../hooks/useTechnologies';
import useTechnologyResources from '../hooks/useTechnologyResources';
import '../components/TechnologyCard.css';

const TechnologyDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { technologies, updateStatus, updateNotes } = useTechnologies();

    const techId = parseInt(id);
    const { resources, loading: resLoading, error: resError } = useTechnologyResources(techId);

    const tech = technologies.find(t => t.id === techId);

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
        <div className="app" style={{ maxWidth: '800px', margin: '0 auto', paddingBottom: '50px' }}>
            <button onClick={() => navigate(-1)} className="blink-broken TD-back-btn">
                &lt; BACK
            </button>

            <div className={`technology-card ${tech.status}`} style={{ minHeight: '60vh' }}>
                <div className="card-header" style={{ borderBottom: '1px solid #004400', paddingBottom: '20px' }}>
                    <h1 className="glitch-hover" style={{ fontSize: '2em', margin: 0, color: tech.status === 'completed' ? '#00ff00' : tech.status == 'in-progress' ? '#ffaa00' : '#666' }}>{tech.title}</h1>
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

                <div className="TD-content" style={{ border: '1px dashed #004400', padding: '15px', background: 'rgba(0,10,0,0.5)' }}>
                    <h3 style={{ color: '#00ff00', marginTop: 0 }}>// EXTERNAL_DATALINKS:</h3>

                    {resLoading && (
                        <div style={{ color: '#00aa00' }}>
                            &gt; SEARCHING GLOBAL NETWORK... <span className="blink">█</span>
                        </div>
                    )}

                    {resError && (
                        <div style={{ color: '#ff3333' }}>
                            &gt; CONNECTION_ERROR: {resError}
                        </div>
                    )}

                    {!resLoading && !resError && (
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            {resources.map((res, index) => (
                                <li key={index} style={{ marginBottom: '10px' }}>
                                    <span style={{ color: '#005500' }}>[{index + 1}]</span>
                                    <a
                                        href={res.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{ color: '#00ffff', textDecoration: 'none', marginLeft: '10px', fontFamily: 'monospace' }}
                                        className="glitch-hover"
                                    >
                                        {res.title} &gt;&gt;
                                    </a>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <div className="TD-content">
                    <h3 style={{ color: '#008800' }}>// MANUAL_OVERRIDE:</h3>
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
                        style={{
                            width: '100%',
                            background: '#050505',
                            border: '1px solid #004400',
                            color: '#00ff00',
                            fontFamily: 'monospace',
                            padding: '10px'
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default TechnologyDetail;