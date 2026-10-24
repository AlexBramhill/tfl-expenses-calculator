import type { Config } from "@/api/configRepo";

export const STATION_ROLES = ["none", "home", "away", "both"] as const;

export type StationRole = (typeof STATION_ROLES)[number];

type StationLists = Pick<Config, "homeStations" | "officeStations">;

export const getStationRole = (
	station: string,
	{ homeStations, officeStations }: StationLists,
): StationRole => {
	const isHome = homeStations.includes(station);
	const isAway = officeStations.includes(station);

	if (isHome && isAway) return "both";
	if (isHome) return "home";
	if (isAway) return "away";
	return "none";
};

export const getNextStationRole = (role: StationRole, direction: 1 | -1) => {
	const nextIndex = STATION_ROLES.indexOf(role) + direction;
	return STATION_ROLES.at(nextIndex % STATION_ROLES.length) ?? role;
};

export const withStationRole = <T extends StationLists>(
	config: T,
	station: string,
	role: StationRole,
): T => ({
	...config,
	homeStations: setMembership(
		config.homeStations,
		station,
		role === "home" || role === "both",
	),
	officeStations: setMembership(
		config.officeStations,
		station,
		role === "away" || role === "both",
	),
});

const setMembership = (
	stations: string[],
	station: string,
	isMember: boolean,
) => {
	if (!isMember) return stations.filter((existing) => existing !== station);
	return stations.includes(station) ? stations : [...stations, station];
};
