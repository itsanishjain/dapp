import React from "react";

/*
max-w-0 => max-width: 0rem;
flex => display: flex;
*/

export default function Card({ name, designation, imageUrl }) {
  return (
    <>
      {/* <div className="p-6 max-w-sm mx-auto bg-white-700 rounded-xl shadow-lg shadow-slate-400 flex  items-center space-x-4">
        <div className="shrink-0">
          <img className="h-12 w-12" src="vercel.svg" alt="logo" />
        </div>
        <div>
          <h3 className="text-2xl font-medium text-black">ChitChat</h3>
          <p className="text-slate-500">You have a new message!</p>
        </div>
      </div>  */}


      {/* CARD 2 */}

      <div className="max-w-lg mx-auto mt-8 space-y-2 p-8 bg-gradient-to-tr from-indigo-500 to-indigo-900 rounded-lg shadow-md shadow-slate-300 sm:flex items-center sm:py-4 sm:space-x-6">
        <img
          src={imageUrl}
          className=" mx-auto w-24 h-48 rounded-full sm:mx-0 sm:shrink-0"
          alt="logo"
        />

        <div className="text-center">
          <div className="space-y-0.5">
            <p className="text-xl font-semibold text-blue-200  ">{name}</p>
            <p className="text-slate-100 font-medium text-md">{designation}</p>
          </div>
          {/* <button className="border border-purple-500 rounded-full px-4 py-1 text-sm text-purple-400 font-semibold hover:text-white hover:bg-purple-400 hover:border:transparent ">
            Message
          </button> */}
        </div>
      </div>
    </>
  );
}
