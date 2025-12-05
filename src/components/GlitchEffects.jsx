import React from 'react';
import './GlitchEffects.css';

const GlitchEffects = () => {
    return (
        <div className="crt-overlay">
            <div className="scanlines"></div>
            <div className="noise-layer"></div>
            <div className="scan-bar"></div>
            <div className="vignette"></div>
        </div>
    );
};

export default GlitchEffects;