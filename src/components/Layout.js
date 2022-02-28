import React from "react";
import Card from "./Card";
import NavigationBar from "./NavigationBar";

export default function Layout({ children }) {
  return (
    <>
      <div className="mx-2 flex">
        <NavigationBar />
      </div>
      {children}
    </>
  );
}
