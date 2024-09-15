"use client"

import { useState } from "react";
import ATMKeypad from "./pinInput";
import { SpeechToText } from "../utils/audioRecognition";

export default function StartScreen() {
    const [accessibilityMode, setAccessibilityMode] = useState(false);

    const faceDetected = () => {
        console.log("Face detected");
        setAccessibilityMode(true);
    }

    SpeechToText();

    return (
        // <div className="flex flex-col items-center justify-center text-white h-screen bg-radial from-blue-950 to-black">
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-8">
            <div className="relative h-full w-full bg-slate-950">
                <div className="absolute bottom-0 left-[-20%] right-0 top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]"></div>
                <div className="absolute bottom-0 right-[-20%] top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]"></div>
            </div>
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