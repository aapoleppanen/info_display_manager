import "@mantine/core/styles.css";
import { MantineProvider, SimpleGrid } from "@mantine/core";
import { theme } from "./theme";
import Config from "./containers/Config/Config";
import Preview from "./containers/Preview/Preview";
import { useState } from "react";
import { ApartmentConfig } from "./types";

export default function App() {
  const [config, setConfig] = useState<ApartmentConfig>({
    1: [
      { residentName: "John", houseNumber: "1" },
      { residentName: "Jane", houseNumber: "2" },
    ],
    2: [
      { residentName: "Bob", houseNumber: "3" },
      { residentName: "Alice", houseNumber: "4" },
    ],
  });

  return (
    <MantineProvider theme={theme}>
      <SimpleGrid cols={2} spacing="xs">
        <Config config={config} setConfig={setConfig} />
        <Preview config={config} />
      </SimpleGrid>
    </MantineProvider>
  );
}
