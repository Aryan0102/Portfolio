import { useRef, useContext } from 'react';
import Draggable from 'react-draggable';
import { Context } from '../context';

const Window = ({appName, width, height, children}) => {
    const nodeRef = useRef(null);
    const { handleCloseWindow, openWindows, activeWindow, focusWindow } = useContext(Context);
    
    const maxX = window.innerWidth - width;
    const maxY = window.innerHeight - height;
    const defaultX = Math.min(80 + openWindows.length * 20, maxX);
    const defaultY = Math.min(80 - openWindows.length * 20, maxY);
    const zIndex = activeWindow === appName ? 1000 : 100;
    
    return (
        <Draggable
            defaultPosition={{x: defaultX, y: defaultY}}
            bounds={{left:0, top:0, right: maxX, bottom: maxY}}
            nodeRef={nodeRef}
            onMouseDown={() => focusWindow(appName)}
        >
            <div ref={nodeRef} className='absolute' style={{ zIndex }}>
                <div style={{width: width, height: height}} className="bg-white/20 backdrop-blur-lg rounded-md cursor-move flex flex-col">
                    {/* Title bar - fixed height */}
                    <div className='flex items-center justify-between px-2 flex-shrink-0'>
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