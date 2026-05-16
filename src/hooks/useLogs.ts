import { useEffect, useState } from "react";
import { addLogListener, deleteLogListener, logEntries } from "../logPublisher";

export const useLogs = () => {
	const [, rerender] = useState(0);

	useEffect(() => {
		const notify = () => rerender((n) => n + 1);
		addLogListener(notify);
		return () => deleteLogListener(notify);
	}, []);

	return { logEntries };
};
