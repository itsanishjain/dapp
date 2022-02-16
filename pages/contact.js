import React from "react";
import { useRef, useState,useEffect } from "react";

export default function Contact() {
  const inputEmailRef = useRef();
  const inputPasswordRef = useRef();

  const [email, setEmail] = useState("");

  const renderCount = useRef(1);

  function emailFocus() {
    console.log("emailInputRef", inputEmailRef.current);

    inputEmailRef.current.focus();
  }

  function passwordFocus() {
    // console.log("inputRef", inputRef.current);
    inputPasswordRef.current.focus();
  }

  useEffect(() => {
    renderCount.current = renderCount.current + 1;
  })

  return (
    <div>
      <p className="text-2xl font-medium text-center">Contact Us</p>
      <div className="max-w-sm mx-auto border p-2 space-y-2">
        <input
          className="border border-slate-500 rounded-sm p-1"
          placeholder="Email"
          name="Email"
          ref={inputEmailRef}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={emailFocus}>Hi</button>
        <p>email field renders {renderCount.current} times </p>
        <input
          className="border border-slate-500 rounded-sm p-1"
          name="password"
          ref={inputPasswordRef}
        />
        <button onClick={passwordFocus}>BUY</button>
      </div>
    </div>
  );
}
