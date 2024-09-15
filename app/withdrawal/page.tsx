"use client"

import { Button } from "@nextui-org/react";
import Image from 'next/image';
import { navigateToPage } from "../utils/functions";
import { useEffect, useState } from "react";
import ATMKeypad from "../components/pinInput";

const withdrawalPage: React.FC = () => {
    const [amount, setAmount] = useState(0);
    const [otherAmount, setOtherAmount] = useState(false);

    useEffect(() => {
        if (amount > 0) {
            navigateToPage("withdrawal/confirm", amount);
        }
    }, [amount]);

    return (
        <section className="bg-radial to-black from-blue-950 w-screen h-screen text-white font-gotham">
            <Image src="/assets/leftArrow.png" alt="atm" width={200} height={200} className="absolute top-5 left-5 h-14 w-auto object-cover hover:cursor-pointer" onClick={() => navigateToPage("menu")} />
            <h1 className="text-[5rem] py-10 text-center font-bold font-fira text-green-500">Withdrawal</h1>
            <h2 className="text-[3rem] text-center text-gray-500">Choose amount</h2>
            {!otherAmount ? (
                <section className="grid grid-cols-4 gap-10 px-10 mt-28">
                    <Button onClick={() => setAmount(100)} className="h-28 text-[2rem] bg-white text-left w-full">100</Button>
                    <Button onClick={() => setAmount(200)} className="h-28 text-[2rem] bg-white text-left w-full">200</Button>
                    <Button onClick={() => setAmount(500)} className="h-28 text-[2rem] bg-white text-left w-full">500</Button>
                    <Button onClick={() => setAmount(1000)} className="h-28 text-[2rem] bg-white text-left w-full">1000</Button>
                    <Button onClick={() => setAmount(2000)} className="h-28 text-[2rem] bg-white text-left w-full">2000</Button>
                    <Button onClick={() => setAmount(5000)} className="h-28 text-[2rem] bg-white text-left w-full">5000</Button>
                    <Button onClick={() => setOtherAmount(true)} className="h-28 text-[2rem] bg-yellow-500 text-left w-full col-span-2">Choose other amount</Button>
                </section>
            ) : (
                <ATMKeypad money={true} />
            )}
        </section>
    );
}

export default withdrawalPage;