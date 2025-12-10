import React from 'react';
import { Link } from 'react-router-dom';
import useTechnologies from '../hooks/useTechnologies';
import ProgressBar from '../components/ProgressBar';
import '../App.css';

const Statistics = () => {
    const { technologies } = useTechnologies();

    const total = technologies.length;
    const completed = technologies.filter(t => t.status === 'completed').length;
    const inProgress = technologies.filter(t => t.status === 'in-progress').length;
    const notStarted = technologies.filter(t => t.status === 'not-started').length;

    // Расчет процентов
    const getPercent = (val) => total === 0 ? 0 : Math.round((val / total) * 100);

    return (
        <div className="app">
            <div style={{ border: '1px solid #005500', padding: '20px', background: 'rgba(0,10,0,0.9)' }}>
                <h2 className="glitch-text">SYSTEM_STATISTICS</h2>

                <div style={{ marginTop: '30px', fontFamily: 'Courier New', fontSize: '1.2em' }}>
                    <div style={{ marginBottom: '20px' }}>
                        <div style={{ color: '#00ff00' }}>COMPLETED_TASKS: {completed}</div>
                        <ProgressBar
                            percentage={getPercent(completed)}
                            width={20}
                        />
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <div style={{ color: '#ffaa00' }}>IN_PROGRESS: {inProgress}</div>
                        <ProgressBar
                            percentage={getPercent(inProgress)}
                            width={20}
                        />
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <div style={{ color: '#777' }}>PENDING: {notStarted}</div>
                        <ProgressBar
                            percentage={getPercent(notStarted)}
                            width={20}
                        />
                    </div>
                </div>

                <div style={{ marginTop: '40px', borderTop: '1px dashed #005500', paddingTop: '20px' }}>
                    <h3 style={{ color: '#00ff00' }}>TOTAL_UNITS: {total}</h3>
                </div>

                <Link to="/" className="action-btn random-next" style={{ marginTop: '20px', textAlign: 'center', textDecoration: 'none' }}>
                    &lt; RETURN_TO_MAIN
                </Link>
            </div>
        </div>
    );
};

export default Statistics;