import {useEffect, useState} from "react";
import {listCsvFiles} from "../repos/csvRepo";
import {type Journey, parseCsv} from "../repos/tflCsvParser";

async function loadData(folder: string) {
    const csvFiles = (await listCsvFiles(folder)) ?? [];
    const journeyPromises = csvFiles.map(parseCsv);
    return (await Promise.all(journeyPromises)).flat();
}

export type CsvState<T> =
    | { status: "loading" }
    | { status: "error"; error: Error }
    | { status: "success"; data: T[] };

const useCsvsData = (folder: string) => {
    const [state, setState] = useState<CsvState<Journey>>({status: "loading"});

    useEffect(() => {
        async function run() {
            setState({status: "loading"});
            try {
                const newData = await loadData(folder);
                setState({status: "success", data: newData});
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

export default useCsvsData;
