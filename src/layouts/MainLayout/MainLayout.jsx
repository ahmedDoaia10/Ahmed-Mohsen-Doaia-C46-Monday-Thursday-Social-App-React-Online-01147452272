import React from "react";
import NavbarComponent from "../../components/Navbar/NavbarComponent";
import Footer from "../../components/Footer/Footer";
import { Outlet } from "react-router";

export default function MainLayout() {
  return (
    <>
      <NavbarComponent>
        
      </NavbarComponent>

      <Outlet />

      <Footer />
    </>
  );
}
