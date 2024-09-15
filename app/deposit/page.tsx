"use client"

import Image from 'next/image';
import { navigateToPage } from "../utils/functions";
import { useEffect, useState } from "react";

const depositPage: React.FC = () => {
    const [amount, setAmount] = useState(0);
    const [otherAmount, setOtherAmount] = useState(false);

    useEffect(() => {
        if (amount > 0) {
            navigateToPage("withdrawal/confirm", amount);
        }
    }, [amount]);

    return (
        <section className="bg-radia w-screen h-screen text-white min-h-screen bg-gray-900">
            <div className="relative h-full w-full bg-slate-950 flex flex-col justify-center"> 
                <div className="absolute bottom-0 left-[-20%] right-0 top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]"></div>
                <div className="absolute bottom-0 right-[-20%] top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]"></div>
                <Image src="/assets/leftArrow.png" alt="atm" width={200} height={200} className="absolute top-5 left-5 h-14 w-auto object-cover hover:cursor-pointer" onClick={() => navigateToPage("menu")} />
                <h1 className="text-[5rem] mb-10 text-center font-bold font-fira text-green-500">Deposit</h1>
                <h2 className="text-[3rem] text-center text-gray-500">Please insert your cash</h2>
            </div>
           
        </section>
    );
}

export default depositPage;