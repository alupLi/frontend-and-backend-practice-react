import { useState, useEffect } from 'react';

// Имитация базы данных ресурсов на сервере
const MOCK_RESOURCES_DB = {
    1: [ // React Components
        { title: 'React.dev: Components', url: 'https://react.dev/learn/your-first-component' },
        { title: 'Habr: Жизненный цикл', url: 'https://habr.com/ru/articles/358090/' }
    ],
    2: [ // JSX
        { title: 'React Docs: Writing Markup', url: 'https://react.dev/learn/writing-markup-with-jsx' },
        { title: 'MDN: JSX', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error' }
    ],
    3: [ // State
        { title: 'React Hooks Guide', url: 'https://react.dev/reference/react/useState' }
    ],
    // Для остальных вернем стандартный набор
    'default': [
        { title: 'StackOverflow Search', url: 'https://stackoverflow.com/' },
        { title: 'Google Documentation', url: 'https://google.com' }
    ]
};

const useTechnologyResources = (techId) => {
    const [resources, setResources] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;

        const fetchResources = async () => {
            setLoading(true);
            setError(null);

            try {
                // Имитация задержки сети (1.5 секунды)
                await new Promise(resolve => setTimeout(resolve, 1500));

                // Случайная ошибка для демонстрации обработки ошибок (10% шанс)
                if (Math.random() < 0.1) {
                    throw new Error('CONNECTION_REFUSED');
                }

                if (isMounted) {
                    const data = MOCK_RESOURCES_DB[techId] || MOCK_RESOURCES_DB['default'];
                    setResources(data);
                }
            } catch (err) {
                if (isMounted) {
                    setError(err.message);
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        if (techId) {
            fetchResources();
        }

        return () => {
            isMounted = false;
        };
    }, [techId]);

    return { resources, loading, error };
};

export default useTechnologyResources;