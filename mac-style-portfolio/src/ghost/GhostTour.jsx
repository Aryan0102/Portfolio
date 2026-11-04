import { useContext, useEffect, useRef, useState } from 'react';
import { Context } from '../context';
import { runTour } from './runTour';
import { introTour } from './introTour';

const color = '#7c3aed';

const sleep = (ms, signal) => new Promise((resolve) => {
    if (signal?.aborted) return resolve();
    const timer = setTimeout(resolve, ms);
    signal?.addEventListener('abort', () => {
        clearTimeout(timer);
        resolve();
    }, { once: true });
});

// Waits up to `timeout` ms for a [data-ghost] element to appear, since windows load async.
const findTarget = async (name, signal, timeout = 4000) => {
    const started = Date.now();
    while (!signal.aborted && Date.now() - started < timeout) {
        const element = document.querySelector(`[data-ghost="${name}"]`);
        if (element) return element;
        await sleep(100, signal);
    }
    return null;
};

const GhostTour = () => {
    const context = useContext(Context);
    const contextRef = useRef(context);
    contextRef.current = context;

    const [visible, setVisible] = useState(false);
    const [position, setPosition] = useState({ x: window.innerWidth / 2, y: window.innerHeight / 2, duration: 0 });
    const [caption, setCaption] = useState('');
    const [clickId, setClickId] = useState(0);
    const positionRef = useRef(position);
    const targetRef = useRef(null);

    useEffect(() => {
        if (!context.tourRunning) return;

        const controller = new AbortController();
        const { signal } = controller;
        let cancelled = false;

        const actions = {
            move: async ({ to }) => {
                setCaption('');
                const element = await findTarget(to, signal);
                if (!element) return;

                const rect = element.getBoundingClientRect();
                const x = rect.left + rect.width / 2;
                const y = rect.top + rect.height / 2;
                const distance = Math.hypot(x - positionRef.current.x, y - positionRef.current.y);
                const duration = Math.min(800, Math.max(320, distance * 0.55));

                targetRef.current = element;
                positionRef.current = { x, y, duration };
                setPosition(positionRef.current);
                await sleep(duration + 40, signal);
            },
            click: async ({ open, target }) => {
                setClickId((id) => id + 1);
                await sleep(110, signal);
                if (signal.aborted) return;

                if (open) contextRef.current.handleOpenWindow(open, target);
                else targetRef.current?.click();

                await sleep(160, signal);
            },
            say: async ({ text }) => {
                for (let i = 1; i <= text.length && !signal.aborted; i++) {
                    setCaption(text.slice(0, i));
                    await sleep(14, signal);
                }
                await sleep(Math.max(900, text.split(' ').length * 170), signal);
            },
            wait: ({ ms }) => sleep(ms, signal),
        };

        // A real click or Esc hands control back. Synthetic clicks from the ghost are untrusted.
        const takeBack = (event) => {
            if (!event.isTrusted) return;
            if (event.type === 'keydown' && event.key !== 'Escape') return;
            controller.abort();
        };
        window.addEventListener('pointerdown', takeBack, true);
        window.addEventListener('keydown', takeBack, true);

        const play = async () => {
            setVisible(true);
            await sleep(200, signal);
            await runTour(introTour, actions, signal);
            if (cancelled) return;

            setVisible(false);
            await sleep(300);
            setCaption('');
            if (!cancelled) contextRef.current.setTourRunning(false);
        };
        play();

        return () => {
            cancelled = true;
            controller.abort();
            window.removeEventListener('pointerdown', takeBack, true);
            window.removeEventListener('keydown', takeBack, true);
        };
    }, [context.tourRunning]);

    if (!context.tourRunning) return null;

    const flipX = position.x > window.innerWidth - 320;
    const flipY = position.y > window.innerHeight - 140;

    return (
        <div
            className="fixed top-0 left-0 z-[3900] pointer-events-none"
            style={{
                opacity: visible ? 1 : 0,
                transform: `translate(${position.x}px, ${position.y}px)`,
                transition: `transform ${position.duration}ms cubic-bezier(0.45, 0, 0.2, 1), opacity 300ms`,
            }}
        >
            {clickId > 0 && (
                <span
                    key={clickId}
                    className="ghost-ripple absolute -left-5 -top-5 w-10 h-10 rounded-full border-2"
                    style={{ borderColor: color }}
                />
            )}

            <svg
                key={`cursor-${clickId}`}
                width="22" height="22" viewBox="0 0 22 22"
                className={`drop-shadow-md ${clickId > 0 ? 'ghost-press' : ''}`}
            >
                <path d="M3 1.5 L3 18 L7.5 13.8 L10.5 20.5 L13.2 19.3 L10.3 12.8 L16.5 12.8 Z" fill={color} stroke="white" strokeWidth="1.5" strokeLinejoin="round" />
            </svg>

            <div
                className="absolute flex flex-col gap-1 w-max max-w-[280px]"
                style={{
                    left: flipX ? 'auto' : 18,
                    right: flipX ? 6 : 'auto',
                    top: flipY ? 'auto' : 20,
                    bottom: flipY ? 6 : 'auto',
                    alignItems: flipX ? 'flex-end' : 'flex-start',
                }}
            >
                <span className="px-2 py-0.5 rounded-full text-xs font-semibold text-white shadow-md" style={{ backgroundColor: color }}>
                    Aryan
                </span>
                {caption && (
                    <p className="px-3 py-2 rounded-2xl text-sm text-white shadow-lg leading-snug" style={{ backgroundColor: color }}>
                        {caption}
                    </p>
                )}
            </div>
        </div>
    );
};

export default GhostTour;
