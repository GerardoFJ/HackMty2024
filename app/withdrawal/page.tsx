"use client"

import { Button } from "@nextui-org/react";
import Image from 'next/image';
import { navigateToPage } from "../utils/functions";
import { useEffect, useState } from "react";
import ATMKeypad from "../components/pinInput";
import { useHandsFree } from "../utils/handsFree";

const withdrawalPage: React.FC = () => {
    const {
        trigger,
        output,
        click,
        focusedButton,
        buttonsRef,
        handleStartListening,
        fetchRealTimeOutput,
    } = useHandsFree();
    
    const [amount, setAmount] = useState(0);
    const [otherAmount, setOtherAmount] = useState(false);

    useEffect(() => {
        if (amount > 0) {
            navigateToPage("withdrawal/confirm", amount);
        }
    }, [amount]);

    const faceDetected = () => {
        console.log("Face detected");
        handleStartListening();
        fetchRealTimeOutput();
    }

    return (
        <section>
            {/* <Button onClick={faceDetected}>run</Button> */}
            <button ref={(el) => {
                if (!buttonsRef.current[0]) {
                    buttonsRef.current[0] = [el];
                } else {
                    buttonsRef.current[0][0] = el;
                }
            }} onClick={() => navigateToPage("")} className="absolute top-0 left-0 w-12">
                <Image 
                src="/assets/leftArrow.png" 
                alt="atm" 
                width={200} 
                height={200} 
                className={`absolute top-5 left-5 h-14 w-auto object-cover hover:cursor-pointer ${0 === focusedButton[0] && [0].includes(focusedButton[1]) ? 'border-2 border-white' : ''}`}
                />
            </button>
            <h1 className="text-[3rem] py-0 text-center font-bold font-fira text-white mt-5">Withdrawal</h1>
            {!otherAmount ? (
                <section className="grid grid-cols-4 gap-10 px-20 mt-10">
                    <Button ref={(el) => {
                        if (!buttonsRef.current[1]) {
                            buttonsRef.current[1] = [];
                        }
                        buttonsRef.current[1][0] = el;
                    }} 
                    onClick={() => setAmount(100)} 
                    className={`h-28 text-[2rem] bg-white text-left w-full ${focusedButton[0] === 1 && focusedButton[1] === 0 ? 'bg-gray-300' : ''}`}>
                        100
                    </Button>
                    <Button ref={(el) => {
                        if (!buttonsRef.current[1]) {
                            buttonsRef.current[1] = [];
                        }
                        buttonsRef.current[1][1] = el;
                    }} 
                    onClick={() => setAmount(200)} 
                    className={`h-28 text-[2rem] bg-white text-left w-full ${focusedButton[0] === 1 && focusedButton[1] === 1 ? 'bg-gray-300' : ''}`}>
                        200
                    </Button>
                    <Button ref={(el) => {
                        if (!buttonsRef.current[1]) {
                            buttonsRef.current[1] = [];
                        }
                        buttonsRef.current[1][2] = el;
                    }} 
                    onClick={() => setAmount(500)} 
                    className={`h-28 text-[2rem] bg-white text-left w-full ${focusedButton[0] === 1 && focusedButton[1] === 2 ? 'bg-gray-300' : ''}`}>
                        500
                    </Button>
                    <Button ref={(el) => {
                        if (!buttonsRef.current[1]) {
                            buttonsRef.current[1] = [];
                        }
                        buttonsRef.current[1][3] = el;
                    }} 
                    onClick={() => setAmount(1000)} 
                    className={`h-28 text-[2rem] bg-white text-left w-full ${focusedButton[0] === 1 && focusedButton[1] === 3 ? 'bg-gray-300' : ''}`}>
                        1000
                    </Button>
                    <Button ref={(el) => {
                        if (!buttonsRef.current[2]) {
                            buttonsRef.current[2] = [];
                        }
                        buttonsRef.current[2][0] = el;
                    }} 
                    onClick={() => setAmount(2000)} 
                    className={`h-28 text-[2rem] bg-white text-left w-full ${focusedButton[0] === 2 && focusedButton[1] === 0 ? 'bg-gray-300' : ''}`}>
                        2000
                    </Button>
                    <Button ref={(el) => {
                        if (!buttonsRef.current[2]) {
                            buttonsRef.current[2] = [];
                        }
                        buttonsRef.current[2][1] = el;
                    }} 
                    onClick={() => setAmount(5000)} 
                    className={`h-28 text-[2rem] bg-white text-left w-full ${focusedButton[0] === 2 && focusedButton[1] === 1 ? 'bg-gray-300' : ''}`}>
                        5000
                    </Button>
                    <Button ref={(el) => {
                        if (!buttonsRef.current[2]) {
                            buttonsRef.current[2] = [];
                        }
                        buttonsRef.current[2][2] = el;
                    }} 
                    onClick={() => setOtherAmount(true)} 
                    className={`h-28 text-[2rem] bg-yellow-500 text-left w-full col-span-2 ${focusedButton[0] === 2 && [2, 3].includes(focusedButton[1]) ? 'border-2 border-white' : ''}`}>
                        Choose other amount
                    </Button>
                </section>
            ) : (
                <ATMKeypad money={true} />
            )}
        </section>
    );
}

export default withdrawalPage;
