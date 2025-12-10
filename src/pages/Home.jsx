import React, { useState } from 'react';
import TechnologyCard from '../components/TechnologyCard';
import ProgressHeader from '../components/ProgressHeader';
import QuickActions from '../components/QuickActions';
import FilterControls from '../components/FilterControls';
import SearchBox from '../components/SearchBox';
import useTechnologies from '../hooks/useTechnologies';
import SystemAdvice from '../components/SystemAdvice';

const HomePage = () => {
    return (
        <div className="app">
            <SystemAdvice />
        </div>
    );
};

export default HomePage;