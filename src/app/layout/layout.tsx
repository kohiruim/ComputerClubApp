import { Outlet } from "react-router-dom";
import { Header } from "@/widgets";

export const Layout = () => (
  <>
    <Header />
    <main>
      <Outlet />
    </main>
  </>
);
