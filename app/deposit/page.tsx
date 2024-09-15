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
        <section className="bg-radial to-black from-blue-950 w-screen h-screen text-white">
            <Image src="/assets/leftArrow.png" alt="atm" width={200} height={200} className="absolute top-5 left-5 h-14 w-auto object-cover hover:cursor-pointer" onClick={() => navigateToPage("menu")} />
            <h1 className="text-[5rem] py-10 text-center font-bold font-fira text-green-500">Deposit</h1>
            <h2 className="text-[3rem] text-center text-gray-500">Please insert your cash</h2>
        </section>
    );
}

export default depositPage;