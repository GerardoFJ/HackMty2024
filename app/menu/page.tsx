"use client"

import { Button } from "@nextui-org/react"; // Import the Image component from the correct package
import Image from 'next/image';
import { navigateToPage } from "../utils/functions";
import { useHandsFree } from "../utils/handsFree";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

const menuPage: React.FC = () => {
    const {
        trigger,
        output,
        click,
        focusedButton,
        buttonsRef,
        handleStartListening,
        fetchRealTimeOutput,
    } = useHandsFree();

    const faceDetected = () => {
        console.log("Face detected");
        handleStartListening();
        fetchRealTimeOutput();
    }
    
    return (
        <div>
            <Button onClick={faceDetected} className="text-lg">run</Button>
            <button ref={(el) => {
                if (!buttonsRef.current[0]) {
                    buttonsRef.current[0] = [el, el, el, el];
                }
            }} onClick={() => navigateToPage("")} className="absolute top-0 left-0 w-12">
                <Image 
                src="/assets/leftArrow.png" 
                alt="atm" 
                width={200} 
                height={200} 
                className={`absolute top-5 left-5 h-14 w-auto object-cover hover:cursor-pointer ${0 === focusedButton[0] && [0, 1, 2].includes(focusedButton[1]) ? 'border-2 border-white' : ''}`}
                />
            </button>
        {/* Transaction Buttons */}
        <div className="grid grid-cols-2 gap-6 justify-center mx-10 my-32">
            {/* Left Side (Money Options) */}
            <div className="col-span-1">
                <div className={`bg-yellow-500 text-gray-900 p-0 rounded-lg mb-4 flex items-center justify-center ${1 === focusedButton[0] && 0 === focusedButton[1] ? 'bg-yellow-600' : ''}`}>
                    <Button ref={
                        (el) => {
                            if (!buttonsRef.current[1]) {
                                buttonsRef.current[1] = [];
                            }
                            buttonsRef.current[1][0] = el;
                        }
                    } onClick={() => navigateToPage("withdrawal")} className="w-full text-left text-xl font-bold appearance-none bg-transparent border-none p-10 m-1">Money Withdrawal</Button>
                </div>
                <div className={`bg-yellow-500 text-gray-900 p-0 rounded-lg mb-0 flex items-center justify-center ${2 === focusedButton[0] && 0 === focusedButton[1] ? 'bg-yellow-600' : ''}`}>
                    <Button ref={
                        (el) => {
                            if (!buttonsRef.current[2]) {
                                buttonsRef.current[2] = [];
                            }
                            buttonsRef.current[2][0] = el;
                        }} onClick={() => navigateToPage("deposit")} className="w-full text-left text-xl font-bold appearance-none bg-transparent border-none p-10 m-1">Money Deposit</Button>
                </div>
            </div>

            {/* Right Side (Other Options) */}
            <div className="col-span-1 grid grid-cols-2 gap-4">
                <div className={`bg-gray-800 p-6 rounded-lg flex items-center justify-center ${1 === focusedButton[0] && 1 === focusedButton[1] ? 'bg-gray-700' : ''}`}>
                    <Button ref={
                        (el) => {
                            if (!buttonsRef.current[1]) {
                                buttonsRef.current[1] = [];
                            }
                            buttonsRef.current[1][1] = el;
                        }} onClick={() => navigateToPage("withdrawal")} className="w-full text-center text-lg appearance-none bg-transparent border-none text-white">Balance Inquiry</Button>
                </div>
                <div className={`bg-gray-800 p-6 rounded-lg flex items-center justify-center ${1 === focusedButton[0] && 2 === focusedButton[1] ? 'bg-gray-700' : ''}`}>
                    <Button ref={
                        (el) => {
                            if (!buttonsRef.current[1]) {
                                buttonsRef.current[1] = [];
                            }
                            buttonsRef.current[1][2] = el;
                        }} onClick={() => navigateToPage("withdrawal")} className="w-full text-center text-lg appearance-none bg-transparent border-none text-white">Internal Transfer</Button>
                </div>
                <div className={`bg-gray-800 p-6 rounded-lg flex items-center justify-center ${2 === focusedButton[0] && 1 === focusedButton[1] ? 'bg-gray-700' : ''}`}>
                    <Button ref={
                        (el) => {
                            if (!buttonsRef.current[2]) {
                                buttonsRef.current[2] = [];
                            }
                            buttonsRef.current[2][1] = el;
                        }} onClick={() => navigateToPage("withdrawal")} className="w-full text-center text-lg appearance-none bg-transparent border-none text-white">PIN Change</Button>
                </div>
                <div className={`bg-gray-800 p-6 rounded-lg flex items-center justify-center ${2 === focusedButton[0] && 2 === focusedButton[1] ? 'bg-gray-700' : ''}`}>
                    <Button ref={
                        (el) => {
                            if (!buttonsRef.current[2]) {
                                buttonsRef.current[2] = [];
                            }
                            buttonsRef.current[2][2] = el;
                        }} onClick={() => navigateToPage("withdrawal")} className="w-full text-center text-lg appearance-none bg-transparent border-none text-white">Exit/Take Card</Button>
                </div>
            </div>
        </div>


        </div>

    );
}

export default menuPage;