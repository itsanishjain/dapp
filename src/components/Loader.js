import React from "react";

export default function Loader() {
  return (
    <div className="flex justify-center items-center py-3">
      <div className="animate-spin rounded-full h-24 w-24 border-b-2 border-red-700" />
    </div>
  );
}
