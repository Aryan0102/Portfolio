import React from 'react'
import { useContext } from 'react'
import { Context } from '../context'
import { apps } from '../appList'

const Dock = () => {
  const { handleOpenWindow } = useContext(Context)

  return (
    <div className="fixed bottom-2 w-full flex items-end justify-center">
        <div className='h-dock-shelf gap-[calc(var(--spacing-dock-shelf)/4)] px-[calc(var(--spacing-dock-shelf)/5)] flex items-center justify-center max-w-[calc(100vw-1rem)] vibrancy rounded-xl shadow-lg'>
          {apps.map((app) => (
            <button key={app.name}
              className="w-dock-icon h-dock-icon flex-shrink-0 flex items-center justify-center hover:scale-105 transition-transform"
              onClick={() => handleOpenWindow(app.name)}
            >
              <img src={app.icon} alt={app.name} className="w-full h-full" />
            </button>
          ))}
        </div>
    </div>
  )
}

export default Dock
