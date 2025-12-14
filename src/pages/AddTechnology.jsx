import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useTechnologies from '../hooks/useTechnologies';
import '../App.css';

const AddTechnology = () => {
    const navigate = useNavigate();
    const { technologies, setTechnologies } = useTechnologies();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!title.trim()) return;

        const newTech = {
            id: Date.now(), // Генерируем ID
            title,
            description,
            status: 'not-started',
            notes: ''
        };

        setTechnologies([...technologies, newTech]);
        navigate('/'); // Возврат на главную
    };

    return (
        <div className="app" style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h2 className="glitch-text" style={{ borderBottom: '2px solid #00ff00', paddingBottom: '10px' }}>
                &gt; NEW_PROTOCOL_INIT
            </h2>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '30px' }}>
                <div className="form-group">
                    <label style={{ color: '#008800', fontFamily: 'monospace' }}>TARGET_NAME (Title):</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="notes-textarea"
                        style={{ width: '100%', height: '40px' }}
                        placeholder="Введите название технологии..."
                        autoFocus
                    />
                </div>

                <div className="form-group">
                    <label style={{ color: '#008800', fontFamily: 'monospace' }}>DATA_PAYLOAD (Description):</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="notes-textarea"
                        rows="5"
                        placeholder="Краткое описание..."
                    />
                </div>

                <div style={{ display: 'flex', gap: '15px', marginTop: '20px' }}>
                    <button
                        type="submit"
                        className="action-btn mark-all"
                        style={{ flex: 1 }}
                    >
                        [ UPLOAD_DATA ]
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate('/')}
                        className="action-btn reset-all"
                        style={{ flex: 1 }}
                    >
                        [ ABORT ]
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddTechnology;