import React from "react";
import Link from "next/link";

export default function NavigationBar() {
  return (
    <nav className="rounded-lg p-4 mx-auto  bg-stone-300 max-w-4xl mt-4 overflow-x-auto  ">
      <div className="flex space-x-4 ">
        <Link href="/">
          <a className="text-lg font-medium p-1 hover:bg-slate-400 hover:rounded ease-in">
            Home
          </a>
        </Link>
        <Link href="/whitelist">
          <a className="text-lg p-1 font-medium hover:bg-slate-400 hover:rounded">
            whitelist
          </a>
        </Link>
        <Link href="/web3Rocks">
          <a className="text-lg font-medium p-1 hover:bg-slate-400 hover:rounded">
            Web3Rocks_Collection
          </a>
        </Link>
        <Link href="/ico">
          <a className="text-lg font-medium p-1 hover:bg-slate-400 hover:rounded">
            Ico
          </a>
        </Link>
      </div>
    </nav>
  );
}
