import React from "react";
import Card from "./Card";
import NavigationBar from "./NavigationBar";

export default function Layout({children}) {
  return (
    <>
      <NavigationBar />
      {children}
    </>
  );
}
