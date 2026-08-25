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
import Preview from "./apps/Preview"
import { Context } from "./context"
import { getInformation } from "./getInfo"
import { useContext, useEffect } from "react"

function App() {

  const { openWindows } = useContext(Context)

  useEffect(() => {
    const preloadImages = async () => {
      const sheets = await Promise.all([getInformation("Projects"), getInformation("Experience")])

      sheets.flat().forEach((row) => {
        if (!row.image) return

        const image = new Image()
        image.fetchPriority = "low"
        image.decoding = "async"
        image.src = row.image
      })
    }

    if ('requestIdleCallback' in window) {
      const handle = requestIdleCallback(preloadImages)
      return () => cancelIdleCallback(handle)
    }

    const timer = setTimeout(preloadImages, 2000)
    return () => clearTimeout(timer)
  }, [])

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
            {openWindows.includes("Preview") ? <Preview /> : null}

          </div>
        }
      />
    </div>
  )
}

export default App
