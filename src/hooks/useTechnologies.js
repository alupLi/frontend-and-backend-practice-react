//import { useState, useEffect } from 'react';

//const initialTechnologies = [
//    {
//        id: 1,
//        title: 'React Components',
//        description: 'Изучение функциональных и классовых компонентов, их жизненного цикла',
//        status: 'completed',
//        notes: ''
//    },
//    {
//        id: 2,
//        title: 'JSX Syntax',
//        description: 'Освоение синтаксиса JSX, условного рендеринга и списков',
//        status: 'completed',
//        notes: ''
//    },
//    {
//        id: 3,
//        title: 'State Management',
//        description: 'Работа с состоянием компонентов, использование хуков useState и useEffect',
//        status: 'in-progress',
//        notes: ''
//    },
//    {
//        id: 4,
//        title: 'Props & Context',
//        description: 'Передача данных между компонентами, использование Context API',
//        status: 'not-started',
//        notes: ''
//    },
//    {
//        id: 5,
//        title: 'React Router',
//        description: 'Настройка маршрутизации в React-приложениях',
//        status: 'not-started',
//        notes: ''
//    },
//    {
//        id: 6,
//        title: 'Custom Hooks',
//        description: 'Создание собственных хуков для переиспользования логики',
//        status: 'not-started',
//        notes: ''
//    }
//];

//const useTechnologies = () => {
//    const [technologies, setTechnologies] = useState(() => {
//        try {
//            const saved = localStorage.getItem('techTrackerData');
//            if (saved) {
//                return JSON.parse(saved);
//            }
//        } catch (error) {
//            console.error('Ошибка при загрузке из localStorage:', error);
//        }
//        return initialTechnologies;
//    });

//    useEffect(() => {
//        try {
//            localStorage.setItem('techTrackerData', JSON.stringify(technologies));
//        } catch (error) {
//            console.error('Ошибка при сохранении в localStorage:', error);
//        }
//    }, [technologies]);

//    const updateStatus = (id, newStatus) => {
//        setTechnologies(prev => prev.map(tech =>
//            tech.id === id ? { ...tech, status: newStatus } : tech
//        ));
//    };

//    const updateNotes = (techId, newNotes) => {
//        const truncatedNotes = newNotes.slice(0, 500);
//        setTechnologies(prev =>
//            prev.map(tech =>
//                tech.id === techId ? { ...tech, notes: truncatedNotes } : tech
//            )
//        );
//    };

//    const calculateProgress = () => {
//        if (technologies.length === 0) return 0;
//        const completed = technologies.filter(tech => tech.status === 'completed').length;
//        return Math.round((completed / technologies.length) * 100);
//    };

//    return {
//        technologies,
//        setTechnologies,
//        updateStatus,
//        updateNotes,
//        progress: calculateProgress(),
//    };
//};

//export default useTechnologies;
//export { initialTechnologies };

import { useState, useEffect } from 'react';

const initialTechnologies = [
    {
        id: 1,
        title: 'React Components',
        description: 'Изучение функциональных и классовых компонентов, их жизненного цикла',
        category: 'frontend',
        difficulty: 'beginner',
        deadline: '2099-12-31',
        resources: [],
        status: 'completed',
        notes: ''
    },
    {
        id: 2,
        title: 'JSX Syntax',
        description: 'Освоение синтаксиса JSX, условного рендеринга и списков',
        category: 'frontend',
        difficulty: 'beginner',
        deadline: '2099-12-31',
        resources: [],
        status: 'completed',
        notes: ''
    },
    {
        id: 3,
        title: 'State Management',
        description: 'Работа с состоянием компонентов, использование хуков useState и useEffect',
        category: 'frontend',
        difficulty: 'intermediate',
        deadline: '2099-12-31',
        resources: ['https://react.dev'],
        status: 'in-progress',
        notes: ''
    },
];

const useTechnologies = () => {
    const [technologies, setTechnologies] = useState(() => {
        try {
            const saved = localStorage.getItem('techTrackerData');
            if (saved) {
                // Миграция данных: если старых полей нет, добавляем дефолтные
                const parsed = JSON.parse(saved);
                return parsed.map(t => ({
                    category: 'other',
                    difficulty: 'beginner',
                    deadline: '',
                    resources: [],
                    ...t
                }));
            }
        } catch (error) {
            console.error('Ошибка при загрузке из localStorage:', error);
        }
        return initialTechnologies;
    });

    useEffect(() => {
        try {
            localStorage.setItem('techTrackerData', JSON.stringify(technologies));
        } catch (error) {
            console.error('Ошибка при сохранении в localStorage:', error);
        }
    }, [technologies]);

    const updateStatus = (id, newStatus) => {
        setTechnologies(prev => prev.map(tech =>
            tech.id === id ? { ...tech, status: newStatus } : tech
        ));
    };

    // Функция для МАССОВОГО обновления (Задание 2)
    const bulkUpdateStatus = (ids, newStatus) => {
        setTechnologies(prev => prev.map(tech =>
            ids.includes(tech.id) ? { ...tech, status: newStatus } : tech
        ));
    };

    const updateNotes = (techId, newNotes) => {
        const truncatedNotes = newNotes.slice(0, 500);
        setTechnologies(prev =>
            prev.map(tech =>
                tech.id === techId ? { ...tech, notes: truncatedNotes } : tech
            )
        );
    };

    const calculateProgress = () => {
        if (technologies.length === 0) return 0;
        const completed = technologies.filter(tech => tech.status === 'completed').length;
        return Math.round((completed / technologies.length) * 100);
    };

    return {
        technologies,
        setTechnologies,
        updateStatus,
        bulkUpdateStatus, // Экспортируем новую функцию
        updateNotes,
        progress: calculateProgress(),
    };
};

export default useTechnologies;
export { initialTechnologies };