import { useState } from "react";

const useFullscreenToggle = () => {
	const [isFullscreen, setIsFullscreen] = useState(false);
	const toggleFullscreen = () => setIsFullscreen((was) => !was);

	return { isFullscreen, toggleFullscreen };
};

export default useFullscreenToggle;
