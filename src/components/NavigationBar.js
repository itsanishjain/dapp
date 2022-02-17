import React from "react";
import Link from "next/link";

export default function NavigationBar() {
  return (
    <nav className="p-3 mx-auto bg-slate-200 max-w-4xl mt-4  ">
      <div className="flex space-x-4 ">
        <Link href="/">
          <a className="text-md font-medium p-1 hover:bg-slate-300 hover:rounded">Home</a>
        </Link>
        <Link href="/whitelist">
          <a className="text-md p-1 font-medium hover:bg-slate-300 hover:rounded">whitelist</a>
        </Link>
        <Link href="/web3Rocks">
          <a className="text-md font-medium p-1 hover:bg-slate-300 hover:rounded">Web3Rocks_Collection</a>
        </Link>
      </div>
    </nav>
  );
}
