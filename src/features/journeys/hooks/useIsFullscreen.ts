import { createContext, useContext } from "react";

export const FullscreenContext = createContext(false);

const useIsFullscreen = () => useContext(FullscreenContext);

export default useIsFullscreen;
