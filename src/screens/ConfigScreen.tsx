import { Text } from "ink";
import { ConfigEditor } from "@/features/config";

function ConfigScreen() {
	return (
		<>
			<Text bold underline>
				Config
			</Text>
			<ConfigEditor />
		</>
	);
}

export default ConfigScreen;
