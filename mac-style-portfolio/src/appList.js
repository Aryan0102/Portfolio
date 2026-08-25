import TipsIcon from './assets/optimized/tipsicon.webp'
import VsCodeIcon from './assets/optimized/vscodeicon.webp'
import SafariIcon from './assets/optimized/safari.webp'
import ContactIcon from './assets/optimized/contactsicon.webp'
import TimeMachineIcon from './assets/optimized/timemachine.webp'
import AppStoreIcon from './assets/optimized/appstore.webp'
import MailIcon from './assets/optimized/mailicon.webp'
import MapsIcon from './assets/optimized/mapsicon.webp'
import RemindersIcon from './assets/optimized/remindersicon.webp'
import MatlabIcon from './assets/optimized/matlabicon.webp'
import PreviewIcon from './assets/optimized/previewicon.webp'

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
