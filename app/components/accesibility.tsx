'use client';
import { NextUIProvider } from "@nextui-org/react";
import VisionComponent from "./checkPython";
import React, { useEffect } from "react";

export default function Accesibility() {
  const [activate, setActivate] = React.useState(true);
  useEffect(() => {
    // This function will be called when the component is unmounted
    return () => {
      console.log("Component is unmounted");
      setActivate(false);
      // Place your cleanup code here
    };
  }, []);
  return (
    <NextUIProvider className="font-gotham">
       <VisionComponent activate={activate} />
       <button onClick={() => {setActivate(!activate)}} style={{position: 'absolute', top:'40px',left:'40px'}}>Click me</button>
    </NextUIProvider>
  );
}