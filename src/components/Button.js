import React from "react";

export default function Button({ text, onClick }) {
  return (
    <div
      className="mt-8 max-w-sm mx-auto rounded-xl bg-rose-500 text-center font-semibold text-lg"
      onClick={onClick}
    >
      <span className="block px-2 py-4 rounded-xl bg-rose-700 text-xl text-white -translate-y-2 active:-translate-y-1 cursor-pointer">
        {text}
      </span>
    </div>
  );
}
