import React from "react";
import Link from "next/link";

export default function NavigationBar() {
  return (
    <nav className="p-3 mx-auto bg-slate-200 max-w-4xl  ">
      <div className="flex space-x-4 ">
        <Link href="/">
          <a className="text-md font-medium">Home</a>
        </Link>
        <Link href="/about">
          <a className="text-md font-medium">About</a>
        </Link>
      </div>
    </nav>
  );
}
