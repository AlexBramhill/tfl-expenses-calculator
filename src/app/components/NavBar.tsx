import { Text } from "ink";
import NavItem from "@/app/components/NavItem";
import type { Page } from "@/app/useRouter";

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
					<NavItem title={`back (${previousPage})`} shortcut="esc" />
				</Text>
			)}
		</Text>
	);
};

export default NavBar;
