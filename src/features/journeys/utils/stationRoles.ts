import type { Config } from "@/api/configRepo";

export const STATION_ROLES = ["none", "home", "office", "both"] as const;

export type StationRole = (typeof STATION_ROLES)[number];

type StationLists = Pick<Config, "homeStations" | "officeStations">;

export const getStationRole = (
	station: string,
	{ homeStations, officeStations }: StationLists,
): StationRole => {
	const isHome = homeStations.includes(station);
	const isOffice = officeStations.includes(station);

	if (isHome && isOffice) return "both";
	if (isHome) return "home";
	if (isOffice) return "office";
	return "none";
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
		role === "office" || role === "both",
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
