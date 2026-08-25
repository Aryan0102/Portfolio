import { useState, useEffect } from 'react';

export const useWidgetData = (url, transform) => {
    const [data, setData] = useState(null);
    const [status, setStatus] = useState('loading');

    useEffect(() => {
        const load = async () => {
            try {
                const response = await fetch(url);
                setData(transform(await response.json()));
                setStatus('ready');
            } catch (error) {
                console.error("Error loading widget data:", error);
                setStatus('error');
            }
        };

        load();
    }, [url, transform]);

    return { data, status };
};
