import { useState, useEffect, useRef, useCallback, useContext } from 'react';
import { Context } from '../context';
import { introNotification, notificationFeed } from './notificationFeed';
import NotificationBanner from './NotificationBanner';

const introDelay = 5000;
const visibleFor = 7000;
const minGap = 90000;
const maxGap = 210000;

const Notifications = () => {
    const { handleOpenWindow, focusMode } = useContext(Context);
    const [banners, setBanners] = useState([]);
    const focusRef = useRef(focusMode);
    const lastIndex = useRef(-1);
    const timers = useRef([]);

    focusRef.current = focusMode;

    const dismiss = useCallback((id) => {
        setBanners((current) => current.map((banner) => (
            banner.id === id ? { ...banner, leaving: true } : banner
        )));

        timers.current.push(setTimeout(() => {
            setBanners((current) => current.filter((banner) => banner.id !== id));
        }, 250));
    }, []);

    const push = useCallback((notification) => {
        if (focusRef.current) return;

        const id = Date.now() + Math.random();
        setBanners((current) => [...current.slice(-2), { ...notification, id }]);
        timers.current.push(setTimeout(() => dismiss(id), visibleFor));
    }, [dismiss]);

    const pushRandom = useCallback(() => {
        let index = Math.floor(Math.random() * notificationFeed.length);
        if (index === lastIndex.current) {
            index = (index + 1) % notificationFeed.length;
        }

        lastIndex.current = index;
        push(notificationFeed[index]);
    }, [push]);

    useEffect(() => {
        const pending = timers.current;
        pending.push(setTimeout(() => push(introNotification), introDelay));

        const scheduleNext = () => {
            pending.push(setTimeout(() => {
                pushRandom();
                scheduleNext();
            }, minGap + Math.random() * (maxGap - minGap)));
        };

        scheduleNext();

        return () => pending.forEach(clearTimeout);
    }, [push, pushRandom]);

    return (
        <div className="absolute top-14 right-4 z-[2400] flex flex-col gap-2 items-end">
            {banners.map((banner) => (
                <NotificationBanner
                    key={banner.id}
                    notification={banner}
                    onOpen={() => { handleOpenWindow(banner.app); dismiss(banner.id); }}
                    onDismiss={() => dismiss(banner.id)}
                />
            ))}
        </div>
    );
};

export default Notifications;
