"use client"

import { useState } from "react";
import ATMKeypad from "./pinInput";
import { SpeechToText } from "../utils/audioRecognition";
import VisionComponent from "./checkPython";

export default function StartScreen() {
    const [accessibilityMode, setAccessibilityMode] = useState(false);

    const faceDetected = () => {
        console.log("Face detected");
        setAccessibilityMode(true);
    }

    SpeechToText();

    return (
        <div className="flex flex-col items-center justify-center text-white h-screen bg-radial from-blue-950 to-black">
            <h1 className="text-[5rem] font-bold text-foreground font-fira">Welcome to <span className="text-green-500">ATechM</span></h1>
            {/* <Image src="/assets/logo.png" alt="atm" width={200} height={200} className="h-28 w-auto object-cover" /> */}
            {accessibilityMode ? (
                <section className="flex flex-col items-center justify-center">
                    <p className="text-[3rem] text-foreground font-gotham text-yellow-500">Accessibility mode activated</p>
                    {/* <p className="text-[1.5rem] text-gray-500">Please input your PIN</p> */}
                    <ATMKeypad />
                </section>
            ) : (
                <section className="flex flex-col items-center justify-center">
                    <p className="text-[3rem] text-foreground font-gotham text-gray-500">Please insert your card</p>
                    <button onClick={faceDetected} className="mt-10 bg-white text-black p-4 rounded-lg">Face detected</button>
                    
                </section>
            )}
        </div>
    );
}