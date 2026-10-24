import { Box, useInput } from "ink";
import { useState } from "react";
import type { Config } from "@/api/configRepo";
import { Line } from "@/components/Line";
import type { Journey } from "@/features/journeys/utils/journeyCalculator";
import {
	getNextStationRole,
	getStationRole,
	withStationRole,
} from "@/features/journeys/utils/stationRoles";

export const StationRoleEditor = ({
	journey,
	config,
	onConfigChange,
}: {
	journey: Journey;
	config: Config;
	onConfigChange: (config: Config) => void;
}) => {
	const stationRows = getStationRows(journey);
	const [selectedRowIndex, setSelectedRowIndex] = useState(0);
	const stationMaxWidth = Math.max(
		...stationRows.map(({ station }) => station.length),
	);

	const changeSelectedRole = (direction: 1 | -1) => {
		const { station } = stationRows[selectedRowIndex];
		const nextRole = getNextStationRole(
			getStationRole(station, config),
			direction,
		);
		onConfigChange(withStationRole(config, station, nextRole));
	};

	useInput((_input, key) => {
		if (key.downArrow)
			setSelectedRowIndex((index) =>
				Math.min(index + 1, stationRows.length - 1),
			);
		if (key.upArrow) setSelectedRowIndex((index) => Math.max(index - 1, 0));
		if (key.rightArrow) changeSelectedRole(1);
		if (key.leftArrow) changeSelectedRole(-1);
	});

	return (
		<Box flexDirection="column" marginTop={1}>
			{stationRows.map(({ label, station }, index) => {
				const isSelected = index === selectedRowIndex;
				return (
					<Line key={label} color={isSelected ? "green" : undefined}>
						{isSelected ? "❯ " : "  "}
						{label.padEnd(5)} {station.padEnd(stationMaxWidth)}
						{"   "}‹ {getStationRole(station, config)} ›
					</Line>
				);
			})}
			<Box marginTop={1}>
				<Line dimColor>↑ | ↓ to choose, ← | → to change</Line>
			</Box>
		</Box>
	);
};

const getStationRows = (journey: Journey) =>
	[
		{ label: "From", station: journey.startStation },
		{ label: "To", station: journey.endStation },
	].filter(({ station }) => station !== "");
