// Ink attaches key listeners in effects, which run just after a frame is drawn.
export const letEffectsRun = () =>
	new Promise((resolve) => setTimeout(resolve, 0));
