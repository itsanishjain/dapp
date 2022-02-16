import React from "react";

export default function NFTCard () {
  return (
    <div className="bg-gradient-to-br from-orange-400 to-orange-700 h-[32rem] mt-8 mb-8 max-w-sm mx-auto p-1 rounded-[24px] shadow-lg shadow-red-300 scale-75 translate-x-4 skew-y-6 ">
      <div className="h-full bg-gradient-to-br from-purple-500 to-pink-500 rounded-[24px]">
        <div className="flex justify-between p-4 border-fuchsia-500 ">
          <p className="font-semibold text-lg">NFT CLUB</p>
          <p className="font-medium text-lg">||||||||</p>
        </div>
        <div className="bg-gradient-to-r from-sky-200 to-sky-800 w-64 h-4/6 rounded-[24px] mx-auto border flex justify-center items-center ">
          <img src="rocket.svg" className="w-32 h-32 " />
        </div>
        <div className="flex justify-between p-4">
          <p className="font-semibold text-xl">#1</p>
          <p className="font-semibold text-xl">Qty. 1000</p>
        </div>
        <p className="font-semibold text-center text-2xl">MINT PASS</p>
      </div>
    </div>
  );
}
