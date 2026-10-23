export const TEXT_FIELD_IDS = {
	csvFolder: "csvFolder",
	homeStations: "homeStations",
	officeStations: "officeStations",
} as const;

export const isTextFieldId = (id?: string) =>
	Object.values(TEXT_FIELD_IDS).some((textFieldId) => textFieldId === id);
