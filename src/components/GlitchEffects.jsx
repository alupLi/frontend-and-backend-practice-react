// GlitchEffects.jsx
import React from 'react';
import './GlitchEffects.css';

const GlitchEffects = () => {
    return (
        <>
            <div className="glitch-container">
                <div className="noise"></div>
                <div className="glitch-bars"></div>
                <div className="rgb-split"></div>
            </div>
            <div className="scan-line"></div>
            <div className="screen-flicker"></div>
        </>
    );
};

export default GlitchEffects;