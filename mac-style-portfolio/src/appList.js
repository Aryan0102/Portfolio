import TipsIcon from './assets/tipsicon.png'
import VsCodeIcon from './assets/vscodeicon.png'
import SafariIcon from './assets/safari.png'
import ContactIcon from './assets/contactsicon.png'
import TimeMachineIcon from './assets/timemachine.png'
import AppStoreIcon from './assets/appstore.png'
import MailIcon from './assets/mailicon.png'
import MapsIcon from './assets/mapsicon.png'
import RemindersIcon from './assets/remindersicon.png'
import MatlabIcon from './assets/matlabicon.png'
import PreviewIcon from './assets/previewicon.png'

export const apps = [
  { name: 'Tips', icon: TipsIcon },
  { name: 'Visual Studio Code', icon: VsCodeIcon },
  { name: 'Safari', icon: SafariIcon },
  { name: 'Contacts', icon: ContactIcon },
  { name: 'Time Machine', icon: TimeMachineIcon },
  { name: 'App Store', icon: AppStoreIcon },
  { name: 'Mail', icon: MailIcon },
  { name: 'Maps', icon: MapsIcon },
  { name: 'Reminders', icon: RemindersIcon },
  { name: 'Matlab', icon: MatlabIcon },
  { name: 'Preview', icon: PreviewIcon }
]

export const getAppIcon = (name) => apps.find((app) => app.name === name)?.icon
