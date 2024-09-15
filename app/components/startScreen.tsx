"use client"

import { use, useEffect, useRef, useState } from "react";
import { Button } from "@nextui-org/react"
import { Input } from "@nextui-org/react"
import { XCircle, Delete, CheckCircle } from 'lucide-react'
import { navigateToPage } from '../utils/functions'
import { useHandsFree } from "../utils/handsFree";

export default function StartScreen() {
    const {
        trigger,
        output,
        click,
        focusedButton,
        buttonsRef,
        handleStartListening,
        fetchRealTimeOutput,
    } = useHandsFree();

    const [accessibilityMode, setAccessibilityMode] = useState(false);
    const [input, setInput] = useState('')
    const [message, setMessage] = useState('')
    
    const faceDetected = () => {
        console.log("Face detected");
        handleStartListening();
        setAccessibilityMode(true);
        fetchRealTimeOutput();
    }

    const handleNumberClick = (number: number) => {
        if (input.length < 4) {
        setInput(prev => prev + number)
        }
    }

    const handleDelete = () => {
        setInput(prev => prev.slice(0, -1))
    }

    const handleClear = () => {
        setInput('')
        setMessage('')
    }

    const handleSubmit = () => {
        if (input.length === 4) {
            if (input === '1234') {
                setMessage('PIN correct. Redirecting...')
                setTimeout(() => {
                    navigateToPage('menu')
                }, 1000)
            } else {
                setMessage('Incorrect PIN. Please try again.')
            }
        } else {
        setMessage('Please enter a 4-digit PIN.')
        }
    }

    useEffect(() => {
        const scanUser = async () => {
            try {
                const response = await fetch('/api/runLogin');
                const data = await response.json();
                console.log(data);
            } catch (error) {
                console.error('Error in facial recognition:', error);
            }
        }
        scanUser();
    });

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-8">
            <div className="relative h-full w-full bg-slate-950">
                <div className="absolute bottom-0 left-[-20%] right-0 top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]"></div>
                <div className="absolute bottom-0 right-[-20%] top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]"></div>
            </div>
            <h1 className="text-[5rem] font-bold text-foreground font-fira">Welcome to <span className="text-green-500">ATechM</span></h1>
            {accessibilityMode ? (
                <section className="flex flex-col items-center justify-center">
                    <p className="text-[3rem] text-foreground font-gotham text-yellow-500">Accessibility mode activated</p>
                    <div
                    className="max-w-sm mx-auto mt-10 p-6 bg-gray-100 rounded-lg shadow-md"
                    tabIndex={0} // Make the container focusable
                    >
                    <Input
                        type="password"
                        value={input}
                        readOnly
                        className="text-center text-2xl mb-4 text-black"
                        placeholder="Enter PIN"
                    />
                    <div className="grid grid-cols-3 gap-2 mb-4">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((number, index) => {
                        const row = Math.floor(index / 3);
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
                        <Button
                        ref={(el) => {
                            if (!buttonsRef.current[3]) {
                                buttonsRef.current[3] = [];
                            }
                            buttonsRef.current[3][0] = el;
                        }}
                        onClick={handleClear}
                        className={`text-2xl h-14 bg-yellow-500 hover:bg-yellow-600 ${3 === focusedButton[0] && 0 === focusedButton[1] ? 'bg-yellow-600' : ''}`}
                        >
                        <XCircle className="w-6 h-6" />
                        </Button>
                        <Button
                        ref={(el) => {
                            if (!buttonsRef.current[3]) {
                                buttonsRef.current[3] = [];
                            }
                            buttonsRef.current[3][1] = el;
                        }}
                        onClick={() => handleNumberClick(0)}
                        className={`text-2xl h-14 ${3 === focusedButton[0] && 1 === focusedButton[1] ? 'bg-blue-500 hover:bg-blue-600' : ''}`}
                        >
                        0
                        </Button>
                        <Button
                        ref={(el) => {
                            if (!buttonsRef.current[3]) {
                                buttonsRef.current[3] = [];
                            }
                            buttonsRef.current[3][2] = el;
                        }}
                        onClick={handleDelete}
                        className={`text-2xl h-14 bg-red-500 hover:bg-red-600 ${3 === focusedButton[0] && 2 === focusedButton[1] ? 'bg-red-600' : ''}`}
                        >
                        <Delete className="w-6 h-6" />
                        </Button>
                    </div>
                    <Button
                        ref={(el) => {
                            if (!buttonsRef.current[4]) {
                                buttonsRef.current[4] = [el, el, el];
                            }
                        }}
                        onClick={handleSubmit}
                        className="w-full text-xl h-14 bg-green-500 hover:bg-green-600"
                    >
                        <CheckCircle className="w-6 h-6 mr-2" /> Submit
                    </Button>
                    {message && (
                        <p className="mt-4 text-center text-sm font-medium text-gray-500">
                        {message}
                        </p>
                    )}
                    </div>
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