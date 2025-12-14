import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import '../components/TechnologyCard.css';

const API_URL = 'https://raw.githubusercontent.com/alupLi/frontend-and-backend-practice-react/refs/heads/main/technologies.json';

const TechnologyListDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [tech, setTech] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDetail = async () => {
            try {
                setLoading(true);
                // Имитация задержки
                await new Promise(resolve => setTimeout(resolve, 800));

                // Реальный запрос к GitHub
                const response = await fetch(API_URL);
                if (!response.ok) throw new Error('Network error');

                const data = await response.json();

                // Ищем нужную технологию в полученном массиве
                const found = data.find(t => t.id === parseInt(id));

                if (!found) throw new Error('PROTOCOL MISSING (404)');
                setTech(found);

            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchDetail();
    }, [id]);

    if (loading) {
        return (
            <div className="app" style={{ textAlign: 'center', paddingTop: '100px', color: '#00ff00', fontFamily: 'monospace' }}>
                &gt; DECRYPTING SECURE FILE... <span className="blink-broken">█</span>
            </div>
        );
    }

    if (error || !tech) {
        return (
            <div className="app" style={{ textAlign: 'center', marginTop: '100px' }}>
                <h1 className="glitch-text" style={{ color: 'red' }}>ERROR: {error}</h1>
                <Link to="/list" className="action-btn" style={{ color: '#00ff00', textDecoration: 'none', border: '1px solid #00ff00', padding: '10px' }}>
                    RETURN TO LIST
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
                    <h1 className="glitch-hover" style={{ fontSize: '2em', margin: 0 }}>{tech.title}</h1>
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

                <div className="TD-content" style={{ border: '1px dashed #004400', padding: '15px', background: 'rgba(0,20,0,0.5)' }}>
                    <h3 style={{ color: '#00ff00', marginTop: 0 }}>// LINKED_RESOURCES:</h3>

                    {tech.resources && tech.resources.length > 0 ? (
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            {tech.resources.map((res, index) => (
                                <li key={index} style={{ marginBottom: '10px' }}>
                                    <span style={{ color: '#005500' }}>[LINK_{index}]</span>
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
                    ) : (
                        <div style={{ color: '#555' }}>&lt; NO_EXTERNAL_LINKS_DETECTED /&gt;</div>
                    )}
                </div>

                <div style={{ margin: '30px 0' }}>
                    <h3 style={{ color: '#008800', fontFamily: 'Courier New' }}>// STATUS:</h3>
                    <p style={{ color: '#fff' }}>{tech.status.toUpperCase()}</p>
                </div>
            </div>
        </div>
    );
};

export default TechnologyListDetail;