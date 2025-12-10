// ProgressBar.jsx
import React from 'react';
import './ProgressBar.css';

const ProgressBar = ({
    percentage,
    isGlitching = false,
    height = 25,
    width = 100,
    showText = false,
    label = ""
}) => {
    return (
        <div
            className="progress-bar-container"
            style={{ height: `${height}px`, width: `${width}%` }}
        >
            <div
                className={`progress-bar ${isGlitching ? 'progress-bar-glitching' : ''}`}
                style={{ width: `${isGlitching ? 0 : percentage}%` }}
            >
                {showText && (
                    <span className="progress-text">
                        {isGlitching ? 'ERROR' : `${percentage}%`}
                    </span>
                )}
            </div>
        </div>

        //<div className="progress-bar-container">
        //        <div
        //            className={`progress-bar ${isGlitching ? 'progress-bar-glitching' : ''}`}
        //            style={{ width: `${isGlitching ? 0 : percentage}%` }}
        //        >
        //            <span className="progress-text">{percentage}%</span>
        //        </div>
        //</div>
    );
};

export default ProgressBar;