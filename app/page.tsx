'use client';
import { NextUIProvider } from "@nextui-org/react";
import StartScreen from "./components/startScreen";
import React from "react";
import Accesibility from "./components/accesibility";

export default function Home() {
  const [activate, setActivate] = React.useState(true);
  return (
    <NextUIProvider className="font-gotham">
       <Accesibility />
       {/* <VisionComponent activate={activate} />
       <button onClick={() => {setActivate(!activate)}} style={{position: 'absolute', top:'40px',left:'40px'}}>Click me</button> */}
        <StartScreen />
    </NextUIProvider>
  );
}

// /pages/_app_.js
