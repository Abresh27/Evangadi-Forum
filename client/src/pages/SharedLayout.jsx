import React from "react";
import { Outlet } from "react-router-dom";
import Navigationbar from "../components/navbar/Navigationbar";
import Footer from "../components/Footer/Footer";

export default function SharedLayout() {
  return (
    <>
      <Navigationbar />
      <Outlet />
      <Footer />
    </>
  );
}
