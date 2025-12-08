import React from 'react';
import './Modal.css';

const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    const handleBackgroundClick = (e) => {
        if (e.target === e.currentTarget) onClose();
    };

    return (
        <div className="modal-overlay" onClick={handleBackgroundClick}>
            <div className="modal-window">
                <div className="modal-header">
                    <h3 className="modal-title glitch-text">{title}</h3>
                    <button
                        className="modal-close glitch-hover"
                        onClick={onClose}
                    >
                        ✕
                    </button>
                </div>
                <div className="modal-content">
                    {children}
                </div>
                {/* Декоративные уголки */}
                <div className="modal-corner"></div>
                <div className="modal-corner"></div>
                <div className="modal-corner"></div>
                <div className="modal-corner"></div>
            </div>
        </div>
    );
};

export default Modal;