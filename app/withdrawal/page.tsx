"use client"

import { Button, Input } from "@nextui-org/react";
import Image from 'next/image';
import { navigateToPage } from "../utils/functions";
import { useEffect, useState, useRef } from "react";
import { useHandsFree } from "../utils/handsFree";
import { CheckCircle, Delete, XCircle } from "lucide-react";

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
    const [input, setInput] = useState('')
    const [message, setMessage] = useState('')

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

    const handleNumberClick = (number: number) => {
        setInput(prev => prev + number)
    }
    
    const handleDelete = () => {
        setInput(prev => prev.slice(0, -1))
    }
    
    const handleClear = () => {
        setInput('')
        setMessage('')
    }
    
    const handleSubmit = () => {
        if (parseInt(input) > 0) {
            navigateToPage('withdrawal/confirm', parseInt(input))
        }
    }

    return (
        <section>
            <Button onClick={faceDetected} className="text-white text-3xl">run</Button>
            <button ref={(el) => {
                if (!buttonsRef.current[0]) {
                    buttonsRef.current[0] = [];
                }
                buttonsRef.current[0][0] = el;
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
                <div className="max-w-sm mx-auto mt-10 p-6 bg-gray-100 rounded-lg shadow-md">
                    <Input
                        type="text"
                        value={input}
                        readOnly
                        className="text-center text-2xl mb-4 text-black"
                        placeholder="Enter amount"
                    />
                    <div className="grid grid-cols-3 gap-2 mb-4">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((number, index) => {
                            const row = Math.floor(index / 3) + 1;
                            const col = index % 3;

                            return (
                                <Button
                                    key={number}
                                    ref={(el) => {
                                        // Initialize the row if it doesn't exist
                                        if (!buttonsRef.current[row]) {
                                            buttonsRef.current[row] = [];
                                        }
                                        // Assign the button reference
                                        buttonsRef.current[row][col] = el;
                                    }}
                                    onClick={() => handleNumberClick(number)}
                                    className={`text-2xl h-14 ${row === focusedButton[0] && col === focusedButton[1] ? 'bg-blue-500 hover:bg-blue-600' : ''}`}
                                >
                                    {number}
                                </Button>
                            );
                        })}
                        <Button ref={(el) => {
                            if (!buttonsRef.current[4]) {
                                buttonsRef.current[4] = [];
                            }
                            buttonsRef.current[4][0] = el;
                        }} onClick={handleClear} className="text-2xl h-14 bg-yellow-500 hover:bg-yellow-600">
                            <XCircle className="w-6 h-6" />
                        </Button>
                        <Button ref={(el) => {
                            if (!buttonsRef.current[4]) {
                                buttonsRef.current[4] = [];
                            }
                            buttonsRef.current[4][1] = el;
                        }} onClick={() => handleNumberClick(0)} className="text-2xl h-14">
                            0
                        </Button>
                        <Button ref={(el) => {
                            if (!buttonsRef.current[4]) {
                                buttonsRef.current[4] = [];
                            }
                            buttonsRef.current[4][2] = el;
                        }} onClick={handleDelete} className="text-2xl h-14 bg-red-500 hover:bg-red-600">
                            <Delete className="w-6 h-6" />
                        </Button>
                    </div>
                    <Button 
                        ref={(el) => {
                            if (!buttonsRef.current[5]) {
                                buttonsRef.current[5] = [el, el, el];
                            }
                        }}
                        onClick={handleSubmit} className="w-full text-xl h-14 bg-green-500 hover:bg-green-600">
                        <CheckCircle className="w-6 h-6 mr-2" /> Submit
                    </Button>
                    {message && (
                        <p className="mt-4 text-center text-sm font-medium text-gray-500">
                            {message}
                        </p>
                    )}
                </div>
            )}
        </section>
    );
}

export default withdrawalPage;