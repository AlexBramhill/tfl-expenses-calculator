import { Text } from "ink";
import { useThemeColour } from "@/components/ThemeColour";

type NavItemProps = {
	title: string;
	shortcut: string;
	isActive?: boolean;
};

const NavItem = ({ title, shortcut, isActive = false }: NavItemProps) => {
	const themeColour = useThemeColour();

	return (
		<Text
			bold={isActive}
			color={isActive ? themeColour : undefined}
			dimColor={!isActive}
		>
			{title} ({shortcut})
		</Text>
	);
};

export default NavItem;
