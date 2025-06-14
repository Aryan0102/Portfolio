import React from 'react'
import { useContext } from 'react'
import { Context } from '../context'
import NotesIcon from '../assets/notes.png'
import TipsIcon from '../assets/tipsicon.png'
import VsCodeIcon from '../assets/vscodeicon.png'
import SafariIcon from '../assets/safari.png'
import ContactIcon from '../assets/contactsicon.png'
import TimeMachineIcon from '../assets/timemachine.png'
import AppStore from '../assets/appstore.png'
import MailIcon from '../assets/mailicon.png'
import MapsIcon from "../assets/mapsicon.png"
import RemindersIcon from "../assets/remindersicon.png"
import MatlabIcon from "../assets/matlabicon.png"

const Dock = () => {
  const apps = [
    { name: 'Tips', icon: TipsIcon },
    { name: 'Visual Studio Code', icon: VsCodeIcon },
    { name: 'Safari', icon: SafariIcon },
    { name: 'Contacts', icon: ContactIcon },
    { name: 'Time Machine', icon: TimeMachineIcon },
    { name: 'App Store', icon: AppStore },
    { name: 'Mail', icon: MailIcon },
    { name: "Maps", icon: MapsIcon },
    { name: "Reminders", icon: RemindersIcon },
    { name: "Matlab", icon: MatlabIcon }
  ]

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