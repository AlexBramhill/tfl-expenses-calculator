import { Box, useInput } from "ink";
import { useState } from "react";
import type { Config } from "@/api/configRepo";
import { ChoiceField } from "@/components/ChoiceField";
import { Line } from "@/components/Line";
import type { Journey } from "@/features/journeys/utils/journeyCalculator";
import {
	getStationRole,
	STATION_ROLES,
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

	useInput((_input, key) => {
		if (key.downArrow)
			setSelectedRowIndex((index) =>
				Math.min(index + 1, stationRows.length - 1),
			);
		if (key.upArrow) setSelectedRowIndex((index) => Math.max(index - 1, 0));
	});

	return (
		<Box flexDirection="column" marginTop={1}>
			{stationRows.map(({ label, station }, index) => (
				<ChoiceField
					key={label}
					label={`${label} ${station}`}
					value={getStationRole(station, config)}
					options={STATION_ROLES}
					isFocused={index === selectedRowIndex}
					onChange={(role) =>
						onConfigChange(withStationRole(config, station, role))
					}
				/>
			))}
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
