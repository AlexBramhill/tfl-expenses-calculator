import { Text } from "ink";
import { useThemeColour } from "@/components/ThemeColour";

const AppTitle = () => (
	<Text bold color={useThemeColour()} underline>
		TFL CSV Expense Parser
	</Text>
);

export default AppTitle;
