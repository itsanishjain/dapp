import React from "react";

export default function GradientButton({ text, onClick }) {
  return (
    <div
      className="mt-8 max-w-sm rounded-lg bg-gradient-to-r from-orange-300 to-orange-500 text-center font-semibold text-lg"
      onClick={onClick}
    >
      <span className="block px-2 py-4 rounded-lg bg-gradient-to-r from-orange-300 to-orange-500 text-xl text-white  cursor-pointer">
        {text}
      </span>
    </div>
  );
}
