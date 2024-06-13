import Header from "./header";
import Footer from "./footer";
import React, { useState } from "react";

const Layout = (props) => {

  

  return (
    <div>
      <Header/>
      <main>{props.children}</main>
      <Footer />
    </div>
  );
};
export default Layout;
