import React from 'react'
import { useContext } from 'react'
import { Context } from '../context'
import { apps } from '../appList'

const Dock = () => {
  const { handleOpenWindow } = useContext(Context)

  return (
    <div className="fixed bottom-2 w-full h-16 flex items-center justify-center">
        <div className='flex items-center justify-center gap-2 md:gap-3 lg:gap-4 h-full px-2 md:px-3 max-w-[calc(100vw-1rem)] vibrancy rounded-xl shadow-lg'>
          {apps.map((app) => (
            <button key={app.name}
              className="w-9 h-9 md:w-10 md:h-10 lg:w-12 lg:h-12 flex-shrink-0 flex items-center justify-center hover:scale-105 transition-transform"
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
