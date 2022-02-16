import React from "react";
import Link from "next/link";

export default function NavigationBar() {
  return (
    <nav className="p-3 mx-auto bg-slate-200 max-w-4xl  ">
      <div className="flex space-x-4 ">
        <Link href="/">
          <a className="text-md font-medium">Home</a>
        </Link>
        <Link href="/whitelist">
          <a className="text-md font-medium">whitelist</a>
        </Link>
        <Link href="/web3Rocks">
          <a className="text-md font-medium">Web3 Rocks Collection</a>
        </Link>
      </div>
    </nav>
  );
}
