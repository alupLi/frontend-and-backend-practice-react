import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
//import useTechnologies from '../hooks/useTechnologies';
import Modal from '../components/Modal';
import useTechnologies, { initialTechnologies } from '../hooks/useTechnologies';

const Settings = () => {
    const navigate = useNavigate();
    const { setTechnologies } = useTechnologies();
    const [username, setUsername] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const savedName = localStorage.getItem('username');
        if (savedName) setUsername(savedName);
    }, []);

    const handleSaveName = () => {
        localStorage.setItem('username', username);
        alert('USER_ID UPDATED');
    };

    const handleClearData = () => {
        setTechnologies([]);
        localStorage.removeItem('techTrackerData');
        setIsModalOpen(false);
        navigate('/');
    };

    return (
        <div className="app" style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h2 className="glitch-text">SYSTEM_CONFIG</h2>

            <div style={{ background: 'rgba(0,20,0,0.8)', padding: '20px', border: '1px solid #005500', marginTop: '20px' }}>
                <h3 style={{ color: '#00ff00', borderBottom: '1px dashed #005500' }}>USER_PROFILE</h3>
                <div style={{ marginTop: '15px' }}>
                    <label style={{ display: 'block', color: '#00aa00', marginBottom: '5px' }}>OPERATOR_NAME:</label>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="notes-textarea"
                            style={{ height: '40px' }}
                        />
                        <button onClick={handleSaveName} className="action-btn random-next">SAVE</button>
                    </div>
                </div>
            </div>

            

            <div style={{ background: 'rgba(0,20,0,0.8)', padding: '20px', border: '1px solid #005500', marginTop: '30px' }}>
                <h3 style={{ color: '#00ff00', borderBottom: '1px dashed #005500' }}>RESTORE_DEFAULTS</h3>
                <button
                    onClick={() => {
                        setTechnologies(initialTechnologies);
                        alert('DEFAULT_SETTINGS_RESTORED');
                    }}
                    className="action-btn random-next"
                    style={{ width: '100%', marginTop: '15px' }}
                >
                    [ RESTORE_DEFAULT_TECHNOLOGIES ]
                </button>
            </div>

            <div style={{ background: 'rgba(20,0,0,0.3)', padding: '20px', border: '1px solid #550000', marginTop: '30px' }}>
                <h3 style={{ color: '#ff3300', borderBottom: '1px dashed #550000' }}>DANGER_ZONE</h3>
                <p style={{ color: '#ff5555', fontSize: '0.9em' }}>
                    WARNING: Irreversible action. Formatting local storage...
                </p>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="action-btn reset-all"
                    style={{ width: '100%', marginTop: '10px' }}
                >
                    [ FORMAT_DATA ]
                </button>
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="CONFIRM_DELETION"
            >
                <div style={{ textAlign: 'center' }}>
                    <p style={{ color: '#ff3300', marginBottom: '20px' }}>
                                  ,                              ?                             .
                    </p>
                    <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                        <button onClick={handleClearData} className="action-btn reset-all">CONFIRM</button>
                        <button onClick={() => setIsModalOpen(false)} className="action-btn mark-all">CANCEL</button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default Settings;