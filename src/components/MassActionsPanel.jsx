import React from 'react';
import './QuickActions.css';
import './MassActionsPanel.css';

const MassActionsPanel = ({ selectedCount, onUpdateStatus, onCancelSelection }) => {
    if (selectedCount === 0) return null;

    return (
        <div className="mass-content">
            {/* Декоративные уголки */}
            <div className="decorative-corners"></div>
            <div className="decorative-corners"></div>

            <span className="glitch-text" style={{
                color: '#fff',
                fontFamily: 'monospace',
                fontWeight: 'bold',
                borderRight: '1px solid #005500',
                paddingRight: '15px',
                fontSize: '1.1em'
            }}>
                SELECTED_UNITS: <span style={{ color: '#00ff00' }}>{selectedCount}</span>
            </span>

            <div style={{ display: 'flex', gap: '10px' }}>
                <button
                    className="action-btn mark-all"
                    style={{ fontSize: '0.8em', padding: '8px 15px' }}
                    onClick={() => onUpdateStatus('completed')}
                >
                    SET: COMPLETED
                </button>
                <button
                    className="action-btn in-progress-all"
                    style={{ fontSize: '0.8em', padding: '8px 15px' }}
                    onClick={() => onUpdateStatus('in-progress')}
                >
                    SET: IN_PROGRESS
                </button>
                <button
                    className="action-btn reset-all"
                    style={{ fontSize: '0.8em', padding: '8px 15px' }}
                    onClick={() => onUpdateStatus('not-started')}
                >
                    SET: RESET
                </button>
            </div>

            <button
                onClick={onCancelSelection}
                className="glitch-hover cancel-selection"
                title="Отменить выбор"
            >
                [X]
            </button>
        </div>
    );
};

export default MassActionsPanel;