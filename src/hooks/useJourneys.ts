import { useEffect, useState } from "react";
import { listCsvFiles } from "../repos/csvRepo";
import { type Journey, parseCsv } from "../repos/tflCsvParser";

async function loadJourneys(folder: string) {
	const csvFiles = (await listCsvFiles(folder)) ?? [];
	const journeyPromises = csvFiles.map(parseCsv);
	return (await Promise.all(journeyPromises)).flat();
}

export type State<T> =
	| { status: "loading" }
	| { status: "error"; error: Error }
	| { status: "success"; data: T[] };

const useJourneys = (folder: string) => {
	const [state, setState] = useState<State<Journey>>({ status: "loading" });

	useEffect(() => {
		async function run() {
			setState({ status: "loading" });
			try {
				const newData = await loadJourneys(folder);
				setState({ status: "success", data: newData });
			} catch (err) {
				setState({
					status: "error",
					error: err instanceof Error ? err : new Error(String(err)),
				});
			}
		}

		void run();
	}, [folder]);
	return state;
};

export default useJourneys;
