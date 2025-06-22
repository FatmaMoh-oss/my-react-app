import { Footer } from "../../components/Footer/Footer";
import { Navbar } from "../../components/NavBar/NavBar";
import React, { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
