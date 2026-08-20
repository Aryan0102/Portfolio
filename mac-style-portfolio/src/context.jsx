import { createContext, useState } from "react";

const Context = createContext();

const ContextProvider = ({ children }) => {
  const [openWindows, setOpenWindows] = useState(["Tips"]);
  const [activeWindow, setActiveWindow] = useState("Tips");
  const [spotlightOpen, setSpotlightOpen] = useState(false);

  const handleOpenWindow = (appName) => {
    if (!openWindows.includes(appName)) {
      setOpenWindows([...openWindows, appName]);
    }
    setActiveWindow(appName);
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

  const value = {
    openWindows,
    activeWindow,
    handleOpenWindow,
    handleCloseWindow,
    focusWindow,
    spotlightOpen,
    toggleSpotlight,
    closeSpotlight
  };

  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  );
};

export { Context, ContextProvider };