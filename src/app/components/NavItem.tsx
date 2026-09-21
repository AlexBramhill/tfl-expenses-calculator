import { Text } from "ink";

type NavItemProps = {
	title: string;
	shortcut: string;
	isActive?: boolean;
};

const NavItem = ({ title, shortcut, isActive = false }: NavItemProps) => (
	<Text
		bold={isActive}
		color={isActive ? "green" : undefined}
		dimColor={!isActive}
	>
		{title} ({shortcut})
	</Text>
);

export default NavItem;
