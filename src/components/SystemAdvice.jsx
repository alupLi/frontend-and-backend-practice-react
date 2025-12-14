import React, { useState, useEffect } from 'react';

const SystemAdvice = () => {
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchSystemMessage = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch('https://techy-api.vercel.app/api/json');

            if (!response.ok) {
                throw new Error(`HTTP STATUS: ${response.status}`);
            }

            const data = await response.json();
            setMessage(data.message);
        } catch (err) {
            console.error(err);
            setError('SIGNAL LOST. UNABLE TO DECODE EXTERNAL MESSAGE.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSystemMessage();
    }, []);

    return (
        <div style={{
            marginTop: '30px',
            marginBottom: '30px',
            border: '1px dashed #00ff00',
            background: 'rgba(0, 20, 0, 0.8)',
            padding: '15px',
            fontFamily: 'monospace',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Анимация сканирования */}
            <div style={{
                position: 'absolute', top: 0, left: 0, width: '100%', height: '2px',
                background: 'linear-gradient(90deg, transparent, #00ff00, transparent)',
                animation: 'scanline 3s infinite linear'
            }}></div>

            <h4 style={{ margin: '0 0 10px 0', color: '#00ff00', textTransform: 'uppercase' }}>
                // INCOMING_SYSTEM_MESSAGE:
            </h4>

            {loading && (
                <div style={{ color: '#00aa00' }}>
                    &gt; RECEIVING DATA PACKETS... <span className="blink">_</span>
                </div>
            )}

            {error && (
                <div style={{ color: '#ff3333' }}>
                    &gt; {error}
                    <br />
                    <button
                        onClick={fetchSystemMessage}
                        style={{
                            marginTop: '10px', background: 'transparent', border: '1px solid #ff3333',
                            color: '#ff3333', cursor: 'pointer', fontFamily: 'monospace'
                        }}
                    >
                        [ RETRY CONNECTION ]
                    </button>
                </div>
            )}

            {message && !loading && (
                <div style={{ animation: 'fadeIn 0.5s' }}>
                    <p style={{ color: '#ccffcc', fontSize: '1.2em', fontStyle: 'italic', margin: '0 0 10px 0' }}>
                        "{message}"
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                        <button
                            onClick={fetchSystemMessage}
                            title="Перехватить следующее сообщение"
                            style={{
                                background: 'transparent', border: '1px solid #005500', color: '#00ff00',
                                cursor: 'pointer', fontSize: '0.9em', padding: '5px 10px', textTransform: 'uppercase'
                            }}
                        >
                            [ REFRESH_STREAM ]
                        </button>
                    </div>
                </div>
            )}

            <style>{`
                @keyframes scanline { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
            `}</style>
        </div>
    );
};

export default SystemAdvice;