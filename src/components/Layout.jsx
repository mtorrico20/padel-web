import { Outlet } from "react-router-dom";

import Header from "./Header";
import Navigation from "./Navigation";

const Layout = () => {
  return (
    <>
      <Header />

      <Navigation />

      <main className="main-content">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;