import { useRef, useState, useEffect, useContext } from 'react';
import Draggable from 'react-draggable';
import { Context } from '../context';
import { useViewport } from '../useViewport';

const menuBarHeight = 40;
const dockHeight = 88;
const Window = ({ appName, width, height, minWidth = 560, minHeight = 420, children }) => {
    const nodeRef = useRef(null);
    const { handleCloseWindow, openWindows, activeWindow, focusWindow } = useContext(Context);
    const viewport = useViewport();

    const floorWidth = Math.min(minWidth, viewport.width - 32);
    const floorHeight = Math.min(minHeight, viewport.height - menuBarHeight - dockHeight);
    const maxWidth = Math.max(floorWidth, viewport.width - 32);
    const maxHeight = Math.max(floorHeight, viewport.height - menuBarHeight - dockHeight);

    const [size, setSize] = useState({
        width: Math.min(width, maxWidth),
        height: Math.min(height, maxHeight)
    });

    useEffect(() => {
        setSize((current) => ({
            width: Math.min(current.width, maxWidth),
            height: Math.min(current.height, maxHeight)
        }));
    }, [maxWidth, maxHeight]);

    const startResize = (axis) => (event) => {
        event.preventDefault();
        event.stopPropagation();
        focusWindow(appName);

        const startX = event.clientX;
        const startY = event.clientY;
        const startWidth = size.width;
        const startHeight = size.height;

        const onMove = (moveEvent) => {
            setSize({
                width: axis === 'y' ? startWidth : Math.min(maxWidth, Math.max(floorWidth, startWidth + moveEvent.clientX - startX)),
                height: axis === 'x' ? startHeight : Math.min(maxHeight, Math.max(floorHeight, startHeight + moveEvent.clientY - startY))
            });
        };

        const onUp = () => {
            window.removeEventListener('pointermove', onMove);
            window.removeEventListener('pointerup', onUp);
        };

        window.addEventListener('pointermove', onMove);
        window.addEventListener('pointerup', onUp);
    };

    const maxX = Math.max(0, viewport.width - size.width);
    const maxY = Math.max(0, viewport.height - menuBarHeight - size.height);
    const cascade = openWindows.length * 20;
    const defaultX = Math.min(80 + cascade, maxX);
    const defaultY = Math.min(Math.max(80 - cascade, 0), maxY);
    const zIndex = activeWindow === appName ? 1000 : 100;

    return (
        <Draggable
            defaultPosition={{x: defaultX, y: defaultY}}
            bounds={{left:0, top:0, right: maxX, bottom: maxY}}
            nodeRef={nodeRef}
            cancel=".window-resize"
            onMouseDown={() => focusWindow(appName)}
        >
            <div ref={nodeRef} className='absolute' style={{ zIndex }}>
                <div style={{width: size.width, height: size.height}} className="vibrancy rounded-md cursor-move flex flex-col relative">
                    {/* Title bar - fixed height */}
                    <div className='flex items-center justify-between px-2 py-1 flex-shrink-0 bg-black/25 rounded-t-md'>
                        <div className='flex items-center gap-2 w-[20%]'>
                            <div className='w-3 h-3 bg-red-500 rounded-full cursor-pointer' onClick={() => handleCloseWindow(appName)}></div>
                            <div className='w-3 h-3 bg-yellow-500 rounded-full cursor-pointer'></div>
                            <div className='w-3 h-3 bg-green-500 rounded-full cursor-pointer'></div>
                        </div>
                        <p className='text-white font-semibold text-base text-center truncate'>{appName}</p>
                        <div className='w-[20%]'></div>
                    </div>

                    {/* Content area - scrollable */}
                    <div className="@container flex-1 overflow-auto rounded-b-md noscrollbar">
                        {children}
                    </div>

                    <div
                        onPointerDown={startResize('both')}
                        className="window-resize absolute bottom-0 right-0 w-4 h-4 cursor-se-resize"
                    />
                    <div
                        onPointerDown={startResize('y')}
                        className="window-resize absolute bottom-0 left-0 right-4 h-1.5 cursor-s-resize"
                    />
                    <div
                        onPointerDown={startResize('x')}
                        className="window-resize absolute top-0 bottom-4 right-0 w-1.5 cursor-e-resize"
                    />
                </div>
            </div>
        </Draggable>
    );
};

export default Window;
