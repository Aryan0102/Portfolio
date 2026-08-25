import { useRef, useContext } from 'react';
import Draggable from 'react-draggable';
import { Context } from '../context';

const Window = ({appName, width, height, children}) => {
    const nodeRef = useRef(null);
    const { handleCloseWindow, openWindows, activeWindow, focusWindow } = useContext(Context);
    
    const menuBarHeight = 40;
    const maxX = Math.max(0, window.innerWidth - width);
    const maxY = Math.max(0, window.innerHeight - menuBarHeight - height);
    const cascade = openWindows.length * 20;
    const defaultX = Math.min(80 + cascade, maxX);
    const defaultY = Math.min(Math.max(80 - cascade, 0), maxY);
    const zIndex = activeWindow === appName ? 1000 : 100;
    
    return (
        <Draggable
            defaultPosition={{x: defaultX, y: defaultY}}
            bounds={{left:0, top:0, right: maxX, bottom: maxY}}
            nodeRef={nodeRef}
            onMouseDown={() => focusWindow(appName)}
        >
            <div ref={nodeRef} className='absolute' style={{ zIndex }}>
                <div style={{width: width, height: height}} className="vibrancy rounded-md cursor-move flex flex-col">
                    {/* Title bar - fixed height */}
                    <div className='flex items-center justify-between px-2 py-1 flex-shrink-0 bg-black/25 rounded-t-md'>
                        <div className='flex items-center gap-2 w-[20%]'>
                            <div className='w-3 h-3 bg-red-500 rounded-full cursor-pointer' onClick={() => handleCloseWindow(appName)}></div>
                            <div className='w-3 h-3 bg-yellow-500 rounded-full cursor-pointer'></div>
                            <div className='w-3 h-3 bg-green-500 rounded-full cursor-pointer'></div>
                        </div>
                        <p className='text-white font-semibold text-base text-center'>{appName}</p>
                        <div className='w-[20%]'></div>
                    </div>
                    
                    {/* Content area - scrollable */}
                    <div className="flex-1 overflow-auto rounded-b-md noscrollbar">
                        {children}
                    </div>
                </div>
            </div>
        </Draggable>
    );
};

export default Window;