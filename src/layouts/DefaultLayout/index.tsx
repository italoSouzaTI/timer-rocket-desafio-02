import { Outlet } from "react-router-dom";
import { Header } from "../../compoentes/Header";
import { LayoutContainer } from "./styles";

export function DefaultLayout () {
    return (
        <LayoutContainer>
            <Header />
            <Outlet />
        </LayoutContainer>
    )
}