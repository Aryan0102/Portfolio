import { createContext, useState } from "react";

const Context = createContext();

const ContextProvider = ({ children }) => {
  const [openWindows, setOpenWindows] = useState(["Tips"]);
  const [activeWindow, setActiveWindow] = useState("Tips");
  const [spotlightOpen, setSpotlightOpen] = useState(false);
  const [launchTarget, setLaunchTarget] = useState(null);
  const [brightness, setBrightness] = useState(100);
  const [focusMode, setFocusMode] = useState(false);

  const handleOpenWindow = (appName, target = null) => {
    if (!openWindows.includes(appName)) {
      setOpenWindows([...openWindows, appName]);
    }
    setActiveWindow(appName);
    setLaunchTarget(target ? { app: appName, title: target } : null);
  };

  const handleCloseWindow = (appName) => {
    setOpenWindows(openWindows.filter(window => window !== appName));
    if (activeWindow === appName) {
      setActiveWindow(null);
    }
  };

  const focusWindow = (appName) => {
    setActiveWindow(appName);
  };

  const toggleSpotlight = () => setSpotlightOpen((open) => !open);

  const closeSpotlight = () => setSpotlightOpen(false);

  const clearLaunchTarget = () => setLaunchTarget(null);

  const value = {
    openWindows,
    activeWindow,
    handleOpenWindow,
    handleCloseWindow,
    focusWindow,
    spotlightOpen,
    toggleSpotlight,
    closeSpotlight,
    launchTarget,
    clearLaunchTarget,
    brightness,
    setBrightness,
    focusMode,
    setFocusMode
  };

  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  );
};

export { Context, ContextProvider };