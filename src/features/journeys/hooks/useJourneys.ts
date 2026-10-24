import { useEffect, useMemo, useState } from "react";
import type { Config } from "@/api/configRepo";
import { listCsvFiles } from "@/features/journeys/api/csvRepo";
import {
	parseCsv,
	type UnprocessedJourney,
} from "@/features/journeys/api/tflCsvParser";
import {
	type Journey,
	processJourneys,
} from "@/features/journeys/utils/journeyCalculator";
import { toError } from "@/utils/errors";

async function loadJourneys(folder: string) {
	const csvFiles = (await listCsvFiles(folder)) ?? [];
	const journeyPromises = csvFiles.map(parseCsv);
	return (await Promise.all(journeyPromises)).flat();
}

export type State<T> =
	| { status: "loading" }
	| { status: "error"; error: Error }
	| { status: "success"; data: T[] };

const useJourneys = (config: Config): State<Journey> => {
	const [csvState, setCsvState] = useState<State<UnprocessedJourney>>({
		status: "loading",
	});

	const { csvFolder, ...otherConfig } = config;

	useEffect(() => {
		async function run() {
			setCsvState({ status: "loading" });
			try {
				const newData = await loadJourneys(csvFolder);
				setCsvState({ status: "success", data: newData });
			} catch (err) {
				setCsvState({ status: "error", error: toError(err) });
			}
		}

		void run();
	}, [csvFolder]);

	// otherConfig is a fresh object every render; depend on config itself so
	// this only recomputes when the config actually changes.
	// biome-ignore lint/correctness/useExhaustiveDependencies: see above
	return useMemo(() => {
		if (csvState.status !== "success") return csvState;

		return {
			status: csvState.status,
			data: processJourneys({
				journeys: csvState.data,
				...otherConfig,
			}),
		};
	}, [csvState, config]);
};

export default useJourneys;
