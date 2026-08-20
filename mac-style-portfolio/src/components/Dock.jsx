import React from 'react'
import { useContext } from 'react'
import { Context } from '../context'
import { apps } from '../appList'

const Dock = () => {
  const { handleOpenWindow } = useContext(Context)

  return (
    <div className="fixed bottom-2 w-full h-16 flex items-center justify-center">
        <div className='flex items-center justify-center gap-4 h-full w-1/2 bg-white/10 rounded-xl shadow-lg backdrop-blur-md'>
          {apps.map((app) => (
            <button key={app.name}
              className="w-12 h-12 flex items-center justify-center hover:scale-105 transition-transform"
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
