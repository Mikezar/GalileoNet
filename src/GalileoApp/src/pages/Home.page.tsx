import { Box } from "@mantine/core";
import { Apod } from "../components/Apod/Apod";
import { Menu } from "../components/Menu/Menu";

export function HomePage() {
  return (
    <Box style={{margin: 15}}>
      <Menu />
      <Apod />
    </Box>
  );
}
