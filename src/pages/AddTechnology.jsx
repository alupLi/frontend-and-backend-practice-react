//import React, { useState } from 'react';
//import { useNavigate } from 'react-router-dom';
//import useTechnologies from '../hooks/useTechnologies';
//import '../App.css';

//const AddTechnology = () => {
//    const navigate = useNavigate();
//    const { technologies, setTechnologies } = useTechnologies();

//    const [title, setTitle] = useState('');
//    const [description, setDescription] = useState('');

//    const handleSubmit = (e) => {
//        e.preventDefault();

//        if (!title.trim()) return;

//        const newTech = {
//            id: Date.now(), // Генерируем ID
//            title,
//            description,
//            status: 'not-started',
//            notes: ''
//        };

//        setTechnologies([...technologies, newTech]);
//        navigate('/'); // Возврат на главную
//    };

//    return (
//        <div className="app" style={{ maxWidth: '600px', margin: '0 auto' }}>
//            <h2 className="glitch-text" style={{ borderBottom: '2px solid #00ff00', paddingBottom: '10px' }}>
//                &gt; NEW_PROTOCOL_INIT
//            </h2>

//            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '30px' }}>
//                <div className="form-group">
//                    <label style={{ color: '#008800', fontFamily: 'monospace' }}>TARGET_NAME (Title):</label>
//                    <input
//                        type="text"
//                        value={title}
//                        onChange={(e) => setTitle(e.target.value)}
//                        className="notes-textarea"
//                        style={{ width: '100%', height: '40px' }}
//                        placeholder="Введите название технологии..."
//                        autoFocus
//                    />
//                </div>

//                <div className="form-group">
//                    <label style={{ color: '#008800', fontFamily: 'monospace' }}>DATA_PAYLOAD (Description):</label>
//                    <textarea
//                        value={description}
//                        onChange={(e) => setDescription(e.target.value)}
//                        className="notes-textarea"
//                        rows="5"
//                        placeholder="Краткое описание..."
//                    />
//                </div>

//                <div style={{ display: 'flex', gap: '15px', marginTop: '20px' }}>
//                    <button
//                        type="submit"
//                        className="action-btn mark-all"
//                        style={{ flex: 1 }}
//                    >
//                        [ UPLOAD_DATA ]
//                    </button>
//                    <button
//                        type="button"
//                        onClick={() => navigate('/')}
//                        className="action-btn reset-all"
//                        style={{ flex: 1 }}
//                    >
//                        [ ABORT ]
//                    </button>
//                </div>
//            </form>
//        </div>
//    );
//};

//export default AddTechnology;

//import React, { useState, useEffect } from 'react';
//import { useNavigate } from 'react-router-dom';
//import useTechnologies from '../hooks/useTechnologies';
//import '../App.css';

//const AddTechnology = () => {
//    const navigate = useNavigate();
//    const { technologies, setTechnologies } = useTechnologies();

//    // Начальное состояние
//    const [formData, setFormData] = useState({
//        title: '',
//        description: '',
//        category: 'frontend',
//        difficulty: 'beginner',
//        deadline: '',
//        resources: [''] // Минимум один ресурс
//    });

//    const [errors, setErrors] = useState({});
//    const [isFormValid, setIsFormValid] = useState(false);
//    const [touched, setTouched] = useState({}); // Для отображения ошибок только после касания

//    // Валидация URL
//    const isValidUrl = (string) => {
//        try {
//            new URL(string);
//            return true;
//        } catch (_) {
//            return false;
//        }
//    };

//    // Функция валидации
//    const validateForm = () => {
//        const newErrors = {};

//        // Title
//        if (!formData.title.trim()) {
//            newErrors.title = 'PROTOCOL_NAME_REQUIRED';
//        } else if (formData.title.trim().length < 2) {
//            newErrors.title = 'ERROR: NAME_TOO_SHORT (<2 CHARS)';
//        } else if (formData.title.trim().length > 50) {
//            newErrors.title = 'ERROR: BUFFER_OVERFLOW (>50 CHARS)';
//        }

//        // Description
//        if (!formData.description.trim()) {
//            newErrors.description = 'PAYLOAD_REQUIRED';
//        } else if (formData.description.trim().length < 10) {
//            newErrors.description = 'ERROR: DATA_INSUFFICIENT (<10 CHARS)';
//        }

//        // Deadline (не в прошлом)
//        if (formData.deadline) {
//            const deadlineDate = new Date(formData.deadline);
//            const today = new Date();
//            today.setHours(0, 0, 0, 0);
//            if (deadlineDate < today) {
//                newErrors.deadline = 'ERROR: TEMPORAL_PARADOX (DATE_IN_PAST)';
//            }
//        }

//        // Resources
//        formData.resources.forEach((res, index) => {
//            if (res && !isValidUrl(res)) {
//                newErrors[`resource_${index}`] = `INVALID_NETWORK_ADDRESS [${index + 1}]`;
//            }
//        });

//        setErrors(newErrors);
//        setIsFormValid(Object.keys(newErrors).length === 0);
//    };

//    // Валидация при изменении данных
//    useEffect(() => {
//        validateForm();
//    }, [formData]);

//    // Обработчики
//    const handleChange = (e) => {
//        const { name, value } = e.target;
//        setFormData(prev => ({ ...prev, [name]: value }));
//    };

//    const handleBlur = (e) => {
//        const { name } = e.target;
//        setTouched(prev => ({ ...prev, [name]: true }));
//    };

//    const handleResourceChange = (index, value) => {
//        const newResources = [...formData.resources];
//        newResources[index] = value;
//        setFormData(prev => ({ ...prev, resources: newResources }));
//    };

//    const addResourceField = () => {
//        setFormData(prev => ({ ...prev, resources: [...prev.resources, ''] }));
//    };

//    const removeResourceField = (index) => {
//        if (formData.resources.length > 1) {
//            const newResources = formData.resources.filter((_, i) => i !== index);
//            setFormData(prev => ({ ...prev, resources: newResources }));
//        }
//    };

//    const handleSubmit = (e) => {
//        e.preventDefault();

//        // Помечаем все поля как touched, чтобы показать ошибки, если нажали Submit рано
//        setTouched({
//            title: true, description: true, deadline: true,
//            ...formData.resources.reduce((acc, _, i) => ({ ...acc, [`resource_${i}`]: true }), {})
//        });

//        if (isFormValid) {
//            const cleanedData = {
//                id: Date.now(),
//                ...formData,
//                resources: formData.resources.filter(r => r.trim() !== ''), // Убираем пустые
//                status: 'not-started',
//                notes: ''
//            };

//            setTechnologies([...technologies, cleanedData]);
//            navigate('/');
//        }
//    };

//    // Стили
//    const inputStyle = (hasError) => ({
//        width: '100%',
//        padding: '12px',
//        background: 'rgba(0, 20, 0, 0.8)',
//        border: hasError ? '1px solid #ff3300' : '1px solid #005500',
//        color: hasError ? '#ff3300' : '#00ff00',
//        fontFamily: 'monospace',
//        marginBottom: '5px'
//    });

//    const errorStyle = {
//        color: '#ff3300',
//        fontSize: '0.8em',
//        fontFamily: 'Courier New',
//        marginBottom: '15px',
//        display: 'block'
//    };

//    const labelStyle = {
//        color: '#008800',
//        fontFamily: 'monospace',
//        display: 'block',
//        marginBottom: '5px'
//    };

//    return (
//        <div className="app" style={{ maxWidth: '700px', margin: '0 auto', padding: '20px' }}>
//            <h2 className="glitch-text" style={{ borderBottom: '2px solid #00ff00', paddingBottom: '15px', marginBottom: '30px' }}>
//                &gt; INIT_NEW_PROTOCOL
//            </h2>

//            <form onSubmit={handleSubmit} noValidate>
//                {/* TITLE */}
//                <div className="form-group">
//                    <label htmlFor="title" style={labelStyle}>TARGET_NAME*:</label>
//                    <input
//                        id="title"
//                        name="title"
//                        type="text"
//                        value={formData.title}
//                        onChange={handleChange}
//                        onBlur={handleBlur}
//                        style={inputStyle(touched.title && errors.title)}
//                        aria-invalid={!!errors.title}
//                        aria-describedby="title-error"
//                        placeholder="e.g. React Hooks"
//                    />
//                    {touched.title && errors.title && (
//                        <span id="title-error" role="alert" style={errorStyle}>[!] {errors.title}</span>
//                    )}
//                </div>

//                {/* DESCRIPTION */}
//                <div className="form-group">
//                    <label htmlFor="description" style={labelStyle}>DATA_PAYLOAD*:</label>
//                    <textarea
//                        id="description"
//                        name="description"
//                        rows="4"
//                        value={formData.description}
//                        onChange={handleChange}
//                        onBlur={handleBlur}
//                        style={inputStyle(touched.description && errors.description)}
//                        aria-invalid={!!errors.description}
//                        aria-describedby="desc-error"
//                        placeholder="System description..."
//                    />
//                    {touched.description && errors.description && (
//                        <span id="desc-error" role="alert" style={errorStyle}>[!] {errors.description}</span>
//                    )}
//                </div>

//                {/* CATEGORY & DIFFICULTY */}
//                <div style={{ display: 'flex', gap: '20px', marginBottom: '15px' }}>
//                    <div style={{ flex: 1 }}>
//                        <label htmlFor="category" style={labelStyle}>CATEGORY:</label>
//                        <select
//                            id="category"
//                            name="category"
//                            value={formData.category}
//                            onChange={handleChange}
//                            style={inputStyle(false)}
//                        >
//                            <option value="frontend">Frontend</option>
//                            <option value="backend">Backend</option>
//                            <option value="database">Database</option>
//                            <option value="devops">DevOps</option>
//                            <option value="other">Classified</option>
//                        </select>
//                    </div>
//                    <div style={{ flex: 1 }}>
//                        <label htmlFor="difficulty" style={labelStyle}>DIFFICULTY:</label>
//                        <select
//                            id="difficulty"
//                            name="difficulty"
//                            value={formData.difficulty}
//                            onChange={handleChange}
//                            style={inputStyle(false)}
//                        >
//                            <option value="beginner">Level 1 (Novice)</option>
//                            <option value="intermediate">Level 2 (Adept)</option>
//                            <option value="advanced">Level 3 (Master)</option>
//                        </select>
//                    </div>
//                </div>

//                {/* DEADLINE */}
//                <div className="form-group">
//                    <label htmlFor="deadline" style={labelStyle}>ESTIMATED_COMPLETION:</label>
//                    <input
//                        id="deadline"
//                        name="deadline"
//                        type="date"
//                        value={formData.deadline}
//                        onChange={handleChange}
//                        onBlur={handleBlur}
//                        style={inputStyle(touched.deadline && errors.deadline)}
//                        aria-invalid={!!errors.deadline}
//                        aria-describedby="deadline-error"
//                    />
//                    {touched.deadline && errors.deadline && (
//                        <span id="deadline-error" role="alert" style={errorStyle}>[!] {errors.deadline}</span>
//                    )}
//                </div>

//                {/* RESOURCES */}
//                <div className="form-group" style={{ marginTop: '20px' }}>
//                    <label style={labelStyle}>EXTERNAL_LINKS:</label>
//                    {formData.resources.map((res, index) => (
//                        <div key={index} style={{ display: 'flex', gap: '10px', marginBottom: '5px' }}>
//                            <div style={{ flex: 1 }}>
//                                <input
//                                    type="url"
//                                    value={res}
//                                    onChange={(e) => handleResourceChange(index, e.target.value)}
//                                    placeholder="https://..."
//                                    style={inputStyle(errors[`resource_${index}`])}
//                                    aria-invalid={!!errors[`resource_${index}`]}
//                                />
//                                {errors[`resource_${index}`] && (
//                                    <span role="alert" style={errorStyle}>[!] {errors[`resource_${index}`]}</span>
//                                )}
//                            </div>
//                            {formData.resources.length > 1 && (
//                                <button
//                                    type="button"
//                                    onClick={() => removeResourceField(index)}
//                                    style={{
//                                        background: 'transparent', border: '1px solid #ff3300', color: '#ff3300',
//                                        cursor: 'pointer', fontFamily: 'monospace', height: '42px', padding: '0 15px'
//                                    }}
//                                >
//                                    [DEL]
//                                </button>
//                            )}
//                        </div>
//                    ))}
//                    <button
//                        type="button"
//                        onClick={addResourceField}
//                        style={{
//                            background: 'transparent', border: '1px dashed #00ff00', color: '#00ff00',
//                            width: '100%', padding: '10px', cursor: 'pointer', fontFamily: 'monospace',
//                            marginTop: '5px'
//                        }}
//                    >
//                        + ADD_LINK_SLOT
//                    </button>
//                </div>

//                {/* BUTTONS */}
//                <div style={{ display: 'flex', gap: '15px', marginTop: '30px' }}>
//                    <button
//                        type="submit"
//                        className="action-btn mark-all"
//                        style={{ flex: 1, opacity: isFormValid ? 1 : 0.5, cursor: isFormValid ? 'pointer' : 'not-allowed' }}
//                        disabled={!isFormValid}
//                    >
//                        [ UPLOAD_DATA ]
//                    </button>
//                    <button
//                        type="button"
//                        onClick={() => navigate('/')}
//                        className="action-btn reset-all"
//                        style={{ flex: 1 }}
//                    >
//                        [ ABORT ]
//                    </button>
//                </div>
//            </form>
//        </div>
//    );
//};

//export default AddTechnology;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useTechnologies from '../hooks/useTechnologies';
import '../App.css';
import './AddTechnology.css';

const AddTechnology = () => {
    const navigate = useNavigate();
    const { technologies, setTechnologies } = useTechnologies();

    // Начальное состояние
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: 'frontend',
        difficulty: 'beginner',
        deadline: '',
        resources: [''] // Минимум один ресурс
    });

    const [errors, setErrors] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);
    const [touched, setTouched] = useState({}); // Для отображения ошибок только после касания

    // Валидация URL
    const isValidUrl = (string) => {
        try {
            new URL(string);
            return true;
        } catch (_) {
            return false;
        }
    };

    // Функция валидации
    const validateForm = () => {
        const newErrors = {};

        // Title
        if (!formData.title.trim()) {
            newErrors.title = 'PROTOCOL_NAME_REQUIRED';
        } else if (formData.title.trim().length < 2) {
            newErrors.title = 'ERROR: NAME_TOO_SHORT (<2 CHARS)';
        } else if (formData.title.trim().length > 50) {
            newErrors.title = 'ERROR: BUFFER_OVERFLOW (>50 CHARS)';
        }

        // Description
        if (!formData.description.trim()) {
            newErrors.description = 'PAYLOAD_REQUIRED';
        } else if (formData.description.trim().length < 10) {
            newErrors.description = 'ERROR: DATA_INSUFFICIENT (<10 CHARS)';
        }

        // Deadline (не в прошлом)
        if (formData.deadline) {
            const deadlineDate = new Date(formData.deadline);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            if (deadlineDate < today) {
                newErrors.deadline = 'ERROR: TEMPORAL_PARADOX (DATE_IN_PAST)';
            }
        }

        // Resources
        formData.resources.forEach((res, index) => {
            if (res && !isValidUrl(res)) {
                newErrors[`resource_${index}`] = `INVALID_NETWORK_ADDRESS [${index + 1}]`;
            }
        });

        setErrors(newErrors);
        setIsFormValid(Object.keys(newErrors).length === 0);
    };

    // Валидация при изменении данных
    useEffect(() => {
        validateForm();
    }, [formData]);

    // Обработчики
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleBlur = (e) => {
        const { name } = e.target;
        setTouched(prev => ({ ...prev, [name]: true }));
    };

    const handleResourceChange = (index, value) => {
        const newResources = [...formData.resources];
        newResources[index] = value;
        setFormData(prev => ({ ...prev, resources: newResources }));
    };

    const addResourceField = () => {
        setFormData(prev => ({ ...prev, resources: [...prev.resources, ''] }));
    };

    const removeResourceField = (index) => {
        if (formData.resources.length > 1) {
            const newResources = formData.resources.filter((_, i) => i !== index);
            setFormData(prev => ({ ...prev, resources: newResources }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Помечаем все поля как touched, чтобы показать ошибки, если нажали Submit рано
        setTouched({
            title: true, description: true, deadline: true,
            ...formData.resources.reduce((acc, _, i) => ({ ...acc, [`resource_${i}`]: true }), {})
        });

        if (isFormValid) {
            const cleanedData = {
                id: Date.now(),
                ...formData,
                resources: formData.resources.filter(r => r.trim() !== ''), // Убираем пустые
                status: 'not-started',
                notes: ''
            };

            setTechnologies([...technologies, cleanedData]);
            navigate('/');
        }
    };

    return (
        <div className="app add-tech-container">
            <h2 className="glitch-text add-tech-header">
                &gt; INIT_NEW_PROTOCOL
            </h2>

            <form onSubmit={handleSubmit} noValidate>
                {/* TITLE */}
                <div className="form-group">
                    <label htmlFor="title" className="form-label">TARGET_NAME*:</label>
                    <input
                        id="title"
                        name="title"
                        type="text"
                        value={formData.title}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`form-input ${touched.title && errors.title ? 'error' : ''}`}
                        aria-invalid={!!errors.title}
                        aria-describedby="title-error"
                        placeholder="e.g. React Hooks"
                    />
                    {touched.title && errors.title && (
                        <span id="title-error" role="alert" className="form-error">[!] {errors.title}</span>
                    )}
                </div>

                {/* DESCRIPTION */}
                <div className="form-group">
                    <label htmlFor="description" className="form-label">DATA_PAYLOAD*:</label>
                    <textarea
                        id="description"
                        name="description"
                        rows="4"
                        value={formData.description}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`form-input ${touched.description && errors.description ? 'error' : ''}`}
                        aria-invalid={!!errors.description}
                        aria-describedby="desc-error"
                        placeholder="System description..."
                    />
                    {touched.description && errors.description && (
                        <span id="desc-error" role="alert" className="form-error">[!] {errors.description}</span>
                    )}
                </div>

                {/* CATEGORY & DIFFICULTY */}
                <div className="category-difficulty-group">
                    <div className="form-select-wrapper">
                        <label htmlFor="category" className="form-label">CATEGORY:</label>
                        <select
                            id="category"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="form-input"
                        >
                            <option value="frontend">Frontend</option>
                            <option value="backend">Backend</option>
                            <option value="database">Database</option>
                            <option value="devops">DevOps</option>
                            <option value="other">Classified</option>
                        </select>
                    </div>
                    <div className="form-select-wrapper">
                        <label htmlFor="difficulty" className="form-label">DIFFICULTY:</label>
                        <select
                            id="difficulty"
                            name="difficulty"
                            value={formData.difficulty}
                            onChange={handleChange}
                            className="form-input"
                        >
                            <option value="beginner">Level 1 (Novice)</option>
                            <option value="intermediate">Level 2 (Adept)</option>
                            <option value="advanced">Level 3 (Master)</option>
                        </select>
                    </div>
                </div>

                {/* DEADLINE */}
                <div className="form-group">
                    <label htmlFor="deadline" className="form-label">ESTIMATED_COMPLETION:</label>
                    <input
                        id="deadline"
                        name="deadline"
                        type="date"
                        value={formData.deadline}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`form-input ${touched.deadline && errors.deadline ? 'error' : ''}`}
                        aria-invalid={!!errors.deadline}
                        aria-describedby="deadline-error"
                    />
                    {touched.deadline && errors.deadline && (
                        <span id="deadline-error" role="alert" className="form-error">[!] {errors.deadline}</span>
                    )}
                </div>

                {/* RESOURCES */}
                <div className="form-group" style={{ marginTop: '20px' }}>
                    <label className="form-label">EXTERNAL_LINKS:</label>
                    {formData.resources.map((res, index) => (
                        <div key={index} className="resource-input-group">
                            <div className="resource-input-wrapper">
                                <input
                                    type="url"
                                    value={res}
                                    onChange={(e) => handleResourceChange(index, e.target.value)}
                                    placeholder="https://..."
                                    className={`form-input ${errors[`resource_${index}`] ? 'error' : ''}`}
                                    aria-invalid={!!errors[`resource_${index}`]}
                                />
                                {errors[`resource_${index}`] && (
                                    <span role="alert" className="form-error">[!] {errors[`resource_${index}`]}</span>
                                )}
                            </div>
                            {formData.resources.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => removeResourceField(index)}
                                    className="resource-delete-btn"
                                >
                                    [DEL]
                                </button>
                            )}
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={addResourceField}
                        className="add-resource-btn"
                    >
                        + ADD_LINK_SLOT
                    </button>
                </div>

                {/* BUTTONS */}
                <div className="form-buttons-group">
                    <button
                        type="submit"
                        className={`action-btn mark-all form-action-button ${!isFormValid ? 'disabled-invalid' : ''}`}
                        disabled={!isFormValid}
                    >
                        [ UPLOAD_DATA ]
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate('/')}
                        className="action-btn reset-all form-action-button"
                    >
                        [ ABORT ]
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddTechnology;