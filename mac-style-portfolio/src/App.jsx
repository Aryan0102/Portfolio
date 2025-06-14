import Desktop from "./components/Desktop"
import Dock from "./components/Dock"
import Tips from "./apps/Tips"
import VsCode from "./apps/VsCode"
import Safari from "./apps/Safari"
import Contacts from "./apps/Contacts"
import TimeMachine from "./apps/TimeMachine"
import AppStore from "./apps/AppStore"
import Mail from "./apps/Mail"
import Maps from "./apps/Maps"
import Reminders from "./apps/Reminders"
import Matlab from "./apps/Matlab"
import { Context } from "./context"
import { useContext } from "react"

function App() {

  const { openWindows } = useContext(Context)

  return (
    <div>
      <Desktop 
        children={
          <div className="w-full h-full">
            <Dock/>

            {openWindows.includes("Tips") ? <Tips /> : null}
            {openWindows.includes("Visual Studio Code") ? <VsCode /> : null}
            {openWindows.includes("Safari") ? <Safari /> : null}
            {openWindows.includes("Contacts") ? <Contacts /> : null}
            {openWindows.includes("Time Machine") ? <TimeMachine /> : null}
            {openWindows.includes("App Store") ? <AppStore /> : null}
            {openWindows.includes("Mail") ? <Mail /> : null}
            {openWindows.includes("Maps") ? <Maps /> : null}
            {openWindows.includes("Reminders") ? <Reminders /> : null}
            {openWindows.includes("Matlab") ? <Matlab /> : null}

          </div>
        }
      />
    </div>
  )
}

export default App
