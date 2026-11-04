import { useContext, useEffect, useRef, useState } from 'react';
import { Context } from '../context';
import { runTour } from './runTour';
import { openerTour } from './tours';
import { makeScribble } from './scribble';

const color = '#7c3aed';
const markerColor = '#fde047';
const seenKey = 'ghost-tour-seen';
const drawMs = 650;

const sleep = (ms, signal) => new Promise((resolve) => {
    if (signal?.aborted) return resolve();
    const timer = setTimeout(resolve, ms);
    signal?.addEventListener('abort', () => {
        clearTimeout(timer);
        resolve();
    }, { once: true });
});

const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

const isVisible = (element) => {
    const rect = element.getBoundingClientRect();
    return rect.width > 0 && rect.height > 0;
};

// Waits up to `timeout` ms for a visible [data-ghost] element, since windows load async.
const findTarget = async (name, signal, timeout = 4000) => {
    const started = Date.now();
    while (!signal.aborted && Date.now() - started < timeout) {
        const element = document.querySelector(`[data-ghost="${name}"]`);
        if (element && isVisible(element)) return element;
        await sleep(100, signal);
    }
    return null;
};

// Tight box around what an element actually renders (its text or tags), not its full block width.
const contentRect = (element) => {
    const range = document.createRange();
    range.selectNodeContents(element);
    const rect = range.getBoundingClientRect();
    return rect.width > 0 ? rect : element.getBoundingClientRect();
};

// Sets a React-controlled input's value so its onChange fires.
const setInputValue = (input, value) => {
    const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set;
    setter.call(input, value);
    input.dispatchEvent(new Event('input', { bubbles: true }));
};

const GhostTour = () => {
    const context = useContext(Context);
    const contextRef = useRef(context);
    contextRef.current = context;

    const [visible, setVisible] = useState(false);
    const [position, setPosition] = useState({ x: window.innerWidth / 2, y: window.innerHeight / 2, duration: 0 });
    const [caption, setCaption] = useState('');
    const [options, setOptions] = useState(null);
    const [clickId, setClickId] = useState(0);
    const [scribbles, setScribbles] = useState([]);
    const [keys, setKeys] = useState(null);
    const positionRef = useRef(position);
    const targetRef = useRef(null);
    const answerRef = useRef(null);
    const scribbleId = useRef(0);

    // First-time visitors get the tour automatically.
    useEffect(() => {
        let seen = false;
        try {
            seen = localStorage.getItem(seenKey) === '1';
        } catch {
            // Storage blocked: treat as seen so the tour never loops.
            seen = true;
        }
        if (seen) return;

        const timer = setTimeout(() => contextRef.current.setTourRunning(true), 1500);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (!context.tourRunning) return;

        const controller = new AbortController();
        const { signal } = controller;
        let cancelled = false;

        const placeCursor = (x, y, duration) => {
            positionRef.current = { x, y, duration };
            setPosition(positionRef.current);
        };

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
                placeCursor(x, y, duration);
                await sleep(duration + 40, signal);
            },
            click: async ({ open, target }) => {
                setScribbles([]);
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
            ask: async ({ text, options: choices }) => {
                if (signal.aborted) return;
                setCaption(text);

                const choice = await new Promise((resolve) => {
                    answerRef.current = resolve;
                    setOptions(choices);
                    signal.addEventListener('abort', () => resolve(null), { once: true });
                });

                answerRef.current = null;
                setOptions(null);
                setCaption('');

                if (!choice?.steps) {
                    controller.abort();
                    return;
                }
                await runTour(choice.steps, actions, signal);
            },
            // Draws a marker stroke while the cursor traces it.
            scribble: async ({ to, shape }) => {
                const element = await findTarget(to, signal);
                if (!element) return;

                const scribble = { id: ++scribbleId.current, ...makeScribble(shape, contentRect(element)) };
                const [startX, startY] = scribble.screenPoints[0];
                placeCursor(startX, startY, 180);
                await sleep(200, signal);
                if (signal.aborted) return;

                setScribbles((list) => [...list, scribble]);

                const points = scribble.screenPoints;
                const started = performance.now();
                while (!signal.aborted) {
                    const t = Math.min(1, (performance.now() - started) / drawMs);
                    const [x, y] = points[Math.round(easeInOut(t) * (points.length - 1))];
                    placeCursor(x, y, 0);
                    if (t === 1) break;
                    await new Promise(requestAnimationFrame);
                }

                // Step just below the mark so the caption doesn't cover what was circled.
                placeCursor(scribble.left + scribble.width * 0.75, scribble.top + scribble.height + 4, 260);
                await sleep(280, signal);
            },
            // Shows keycaps on screen, then fires the real key event.
            keys: async ({ label, key, meta, to }) => {
                setScribbles([]);
                setKeys(label);
                await sleep(450, signal);
                if (signal.aborted) return;

                const target = (to && document.querySelector(`[data-ghost="${to}"]`)) || document.activeElement || document.body;
                target.dispatchEvent(new KeyboardEvent('keydown', { key, metaKey: Boolean(meta), bubbles: true, cancelable: true }));

                await sleep(450, signal);
                setKeys(null);
            },
            typing: async ({ to, text }) => {
                const input = await findTarget(to, signal);
                if (!input) return;

                for (let i = 1; i <= text.length && !signal.aborted; i++) {
                    setInputValue(input, text.slice(0, i));
                    await sleep(55, signal);
                }
                await sleep(200, signal);
            },
            wait: ({ ms }) => sleep(ms, signal),
        };

        // A real click or Esc hands control back, except clicks on the ghost's own buttons.
        // Synthetic events from the ghost are untrusted, so they never trigger this.
        const takeBack = (event) => {
            if (!event.isTrusted) return;
            if (event.type === 'keydown' && event.key !== 'Escape') return;
            if (event.target.closest?.('[data-ghost-ui]')) return;
            controller.abort();
        };
        window.addEventListener('pointerdown', takeBack, true);
        window.addEventListener('keydown', takeBack, true);

        const play = async () => {
            try {
                localStorage.setItem(seenKey, '1');
            } catch {
                // Storage blocked: the tour just auto-plays again next visit.
            }

            setVisible(true);
            await sleep(200, signal);
            await runTour(openerTour, actions, signal);
            if (cancelled) return;

            setVisible(false);
            setScribbles([]);
            setKeys(null);
            setOptions(null);
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
    const flipY = position.y > window.innerHeight - 180;

    return (
        <>
            {scribbles.map((scribble) => (
                <svg
                    key={scribble.id}
                    className="fixed z-[3899] pointer-events-none overflow-visible"
                    style={{ left: scribble.left, top: scribble.top, width: scribble.width, height: scribble.height }}
                >
                    <path
                        d={scribble.d}
                        pathLength="1"
                        className="ghost-draw"
                        style={{ animationDuration: `${drawMs}ms` }}
                        fill="none"
                        stroke={markerColor}
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            ))}

            {keys && (
                <div className="fixed bottom-36 left-1/2 -translate-x-1/2 z-[3900] flex gap-2 pointer-events-none">
                    {keys.map((key) => (
                        <span
                            key={key}
                            className="ghost-key min-w-14 h-14 px-3 rounded-xl bg-neutral-900/85 border border-white/20 text-white text-2xl font-semibold shadow-xl flex items-center justify-center"
                        >
                            {key}
                        </span>
                    ))}
                </div>
            )}

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
                    data-ghost-ui
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
                        <div className="px-3 py-2 rounded-2xl text-sm text-white shadow-lg leading-snug" style={{ backgroundColor: color }}>
                            <p data-ghost-caption>{caption}</p>
                            {options && (
                                <div className="flex flex-wrap gap-1.5 mt-2 pointer-events-auto">
                                    {options.map((option) => (
                                        <button
                                            key={option.label}
                                            onClick={() => answerRef.current?.(option)}
                                            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                                                option.steps ? 'bg-white text-violet-700 hover:bg-violet-100' : 'bg-white/20 text-white hover:bg-white/30'
                                            }`}
                                        >
                                            {option.label}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default GhostTour;
