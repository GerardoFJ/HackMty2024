'use client';
import { NextUIProvider } from "@nextui-org/react";
import VisionComponent from "./checkPython";
import React, { useContext, useEffect } from "react";
import { ActivateProvider, ActivateContext } from './ActivateProvider';

export default function Accesibility() {
  const activateContext = useContext(ActivateContext);

  if (!activateContext) {
    throw new Error('useContext must be used within an ActivateProvider');
  }

  const { activate, setActivate } = activateContext;

  useEffect(() => {
    
    console.log("Component is mounted");
    console.log(activate);
    // This function will be called when the component is unmounted
    return () => {
      console.log("Component is unmounted");
      setActivate(false);
      // Place your cleanup coe here
    };
  }, []);
  return (
    <NextUIProvider className="font-gotham">
       <VisionComponent activate={activate} />
       {/* <button onClick={() => {setActivate(!activate)}} style={{position: 'absolute', top:'50px',left:'50px'}}> Clicle</button> */}
    </NextUIProvider>
  );
}