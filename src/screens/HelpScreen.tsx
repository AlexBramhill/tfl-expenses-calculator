import { Box, Text } from "ink";
import Pagination from "@/components/Pagination";

type HelpLine = {
	text: string;
	heading?: boolean;
	dimColor?: boolean;
};

const heading = (text: string): HelpLine => ({ text, heading: true });
const line = (text: string): HelpLine => ({ text });
const blank = (): HelpLine => ({ text: "" });

const helpLines: HelpLine[] = [
	heading("Keyboard shortcuts"),
	line("w        home"),
	line("s        settings"),
	line("r        help"),
	line("q        quit"),
	line("Tab      move focus between panels (Shift+Tab to go back)"),
	line("↑ / ↓    scroll the focused panel, or paginate a focused list"),
	line("t        toggle grouping by file or by month (on home)"),
	line("esc      back"),
	blank(),
	heading("Getting started"),
	line("Drop your TFL CSVs into the app folder (default"),
	line("~/.tfl-expense-calculator/, configurable in settings)."),
];

const HelpScreen = () => {
	return (
		<>
			<Text bold underline>
				Help
			</Text>
			<Pagination items={helpLines} isFocused>
				{(linesOnPage) => (
					<Box flexDirection="column">
						{linesOnPage.map((helpLine, index) => (
							<Text
								// biome-ignore lint/suspicious/noArrayIndexKey: lines are static and never reordered
								key={index}
								bold={helpLine.heading}
								underline={helpLine.heading}
								dimColor={helpLine.dimColor}
							>
								{helpLine.text || " "}
							</Text>
						))}
					</Box>
				)}
			</Pagination>
		</>
	);
};

export default HelpScreen;
