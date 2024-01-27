import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { CyclesContextProvider } from "./contexts/CyclesContext";
import { Router } from "./Router";
import { GlobalStyle } from "./styles/global";
import theme from "./styles/themes/default";

export function App() {
    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <CyclesContextProvider>
                    <Router />
                </CyclesContextProvider>
            </BrowserRouter>
            <GlobalStyle />
        </ThemeProvider>
    );
}
