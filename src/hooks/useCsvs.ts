import { useEffect, useReducer } from "react";
import { listCsvFiles } from "../repos/csvRepo";
import { type Journey, parseCsv } from "../repos/tflCsvParser";

async function loadData(folder: string) {
	const csvFiles = (await listCsvFiles(folder)) ?? [];
	const journeyPromises = csvFiles.map(parseCsv);
	return (await Promise.all(journeyPromises)).flat();
}

type CsvState<T> =
	| { status: "loading" }
	| { status: "error"; error: Error }
	| { status: "success"; data: T[] };

type CsvAction<T> =
	| { type: "fetch" }
	| { type: "resolve"; data: T[] }
	| { type: "reject"; error: Error };

const reducer = <T>(_state: CsvState<T>, action: CsvAction<T>): CsvState<T> => {
	switch (action.type) {
		case "fetch":
			return { status: "loading" };
		case "resolve":
			return { status: "success", data: action.data };
		case "reject":
			return { status: "error", error: action.error };
	}
};

const useCsvs = (folder: string) => {
	const [state, dispatch] = useReducer(reducer<Journey>, { status: "loading" });

	useEffect(() => {
		async function run() {
			dispatch({ type: "fetch" });
			try {
				const newData = await loadData(folder);
				dispatch({ type: "resolve", data: newData });
			} catch (err) {
				dispatch({
					type: "reject",
					error: err instanceof Error ? err : new Error(String(err)),
				});
			}
		}

		void run();
	}, [folder]);

	return state;
};
