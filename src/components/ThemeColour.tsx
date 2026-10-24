import { defaultTheme, extendTheme, ThemeProvider } from "@inkjs/ui";
import {
	createContext,
	type ReactNode,
	useContext,
	useEffect,
	useState,
} from "react";
import { DEFAULT_THEME_COLOUR, type ThemeColour } from "@/api/configRepo";

const ThemeColourContext = createContext<{
	colour: ThemeColour;
	setPreviewColour: (colour: ThemeColour | undefined) => void;
}>({ colour: DEFAULT_THEME_COLOUR, setPreviewColour: () => {} });

export function ThemeColourProvider({
	colour,
	children,
}: {
	colour: ThemeColour;
	children: ReactNode;
}) {
	const [previewColour, setPreviewColour] = useState<ThemeColour>();
	const shownColour = previewColour ?? colour;

	return (
		<ThemeColourContext value={{ colour: shownColour, setPreviewColour }}>
			<ThemeProvider theme={getInkUiTheme(shownColour)}>
				{children}
			</ThemeProvider>
		</ThemeColourContext>
	);
}

export const useThemeColour = () => useContext(ThemeColourContext).colour;

export const usePreviewThemeColour = (colour: ThemeColour) => {
	const { setPreviewColour } = useContext(ThemeColourContext);

	useEffect(() => {
		setPreviewColour(colour);
		return () => setPreviewColour(undefined);
	}, [colour, setPreviewColour]);
};

const getInkUiTheme = (colour: ThemeColour) =>
	extendTheme(defaultTheme, {
		components: {
			Select: {
				styles: {
					selectedIndicator: () => ({ color: colour }),
					focusIndicator: () => ({ color: colour }),
					label: ({ isFocused, isSelected }) => ({
						color: isFocused || isSelected ? colour : undefined,
					}),
				},
			},
		},
	});
