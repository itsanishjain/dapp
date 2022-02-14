import React from "react";


export default function Button() {
  return (
    <div className="mt-8 max-w-sm mx-auto rounded-xl bg-rose-500 text-center font-semibold text-lg">
      <span className="block px-2 py-4 rounded-xl bg-rose-700 text-lg text-white -translate-y-2 active:-translate-y-1 cursor-pointer">
        Checkout
      </span>
    </div>
  );
}
