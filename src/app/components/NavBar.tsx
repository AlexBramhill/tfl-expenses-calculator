import { Text } from "ink";
import type { Page } from "../useRouter";
import NavItem from "./NavItem";

const navItems: { key: string; label: string; page: Page }[] = [
	{ key: "w", label: "home", page: "home" },
	{ key: "s", label: "settings", page: "settings" },
	{ key: "r", label: "help", page: "help" },
];

type NavBarProps = {
	currentPage: Page;
	previousPage?: Page;
	canGoBack: boolean;
};

const NavBar = ({ currentPage, previousPage, canGoBack }: NavBarProps) => {
	if (currentPage === "settings") {
		return <NavItem title="back" shortcut="esc" isActive />;
	}

	return (
		<Text>
			<Text dimColor>q=quit</Text>
			{navItems.map((item) => (
				<Text key={item.key}>
					<Text dimColor> | </Text>
					<NavItem
						title={item.label}
						shortcut={item.key}
						isActive={item.page === currentPage}
					/>
				</Text>
			))}
			{canGoBack && (
				<Text>
					<Text dimColor> | </Text>
					<NavItem title={`back (${previousPage})`} shortcut="t" />
				</Text>
			)}
		</Text>
	);
};

export default NavBar;
