import "@mantine/core/styles.css";
import "./style.css";
import { MantineProvider } from "@mantine/core";
import { Router } from "./Router";
import { shadcnTheme } from "./theme";
import { shadcnCssVariableResolver } from "./cssVariableResolver";

function App() {
    return (
      <MantineProvider forceColorScheme="dark" theme={shadcnTheme} cssVariablesResolver={shadcnCssVariableResolver}>
        <Router />
      </MantineProvider>
    );
}

export default App;
