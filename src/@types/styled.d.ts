import "styled-components";
import theme from "../styles/themes/default";

type ThemeType = keyof typeof theme;

declare module "styled-components" {
    export interface defaultTheme extends ThemeType {}
}
