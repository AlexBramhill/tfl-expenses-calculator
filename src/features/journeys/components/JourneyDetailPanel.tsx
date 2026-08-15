import { Box, type DOMElement, measureElement, useWindowSize } from "ink";
import { useEffect, useRef, useState } from "react";
import type { Journey } from "@/features/journeys";
import useFocusBox from "../hooks/useFocusBox";
import { FocusBox } from "./FocusBox";
import { JourneyList } from "./JourneyList";
import Pagination from "./Pagination";

// JourneyList renders one heading row and Pagination renders one footer row
const OVERHEAD_ROWS = 2;

type JourneyDetailPanelProps = {
	journeys: Journey[];
};

function JourneyDetailPanel({ journeys }: JourneyDetailPanelProps) {
	const isFocused = useFocusBox(true);
	const { rows } = useWindowSize();
	const containerRef = useRef<DOMElement>(null);
	const [itemsPerPage, setItemsPerPage] = useState(1);

	// biome-ignore lint/correctness/useExhaustiveDependencies: row change means terminal height change
	useEffect(() => {
		if (!containerRef.current) return;
		const { height } = measureElement(containerRef.current);
		setItemsPerPage(Math.max(1, height - OVERHEAD_ROWS));
	}, [rows]);

	return (
		<FocusBox isFocused={isFocused}>
			<Box ref={containerRef} flexDirection="column" flexGrow={1}>
				<Pagination
					items={journeys}
					itemsPerPage={itemsPerPage}
					isFocused={isFocused}
				>
					{(journeysOnPage) => (
						<JourneyList journeys={journeysOnPage} allJourneys={journeys} />
					)}
				</Pagination>
			</Box>
		</FocusBox>
	);
}

export default JourneyDetailPanel;
