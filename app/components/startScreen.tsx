"use client"

import { useState } from "react";
import ATMKeypad from "./pinInput";
import VisionComponent from "./checkPython";

export default function StartScreen() {
    const [accessibilityMode, setAccessibilityMode] = useState(false);

    const faceDetected = () => {
        console.log("Face detected");
        setAccessibilityMode(true);
    }

    return (
        <div className="flex flex-col items-center justify-center text-white h-screen bg-radial from-blue-950 to-black">
            <h1 className="text-[5rem] font-bold text-foreground font-fira">Welcome to your ATM</h1>
            {accessibilityMode ? (
                <section className="flex flex-col items-center justify-center">
                    <p className="text-[3rem] text-foreground font-gotham">Accessibility mode activated</p>
                    <p className="text-[1.5rem]">Please input your PIN</p>
                    <ATMKeypad />
                </section>
            ) : (
                <section className="flex flex-col items-center justify-center">
                    <p className="text-[3rem] text-foreground font-gotham">Please insert your card</p>
                    <button onClick={faceDetected} className="mt-10 bg-white text-black p-4 rounded-lg">Face detected</button>
                </section>
            )}
        </div>
    );
}