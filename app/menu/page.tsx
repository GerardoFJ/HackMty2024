"use client"

import { Button } from "@nextui-org/react"; // Import the Image component from the correct package
import Image from 'next/image';
import { navigateToPage } from "../utils/functions";

const menuPage: React.FC = () => {
    return (
        <section className="bg-radial to-black from-blue-950 w-screen h-screen text-white font-gotham">
            <Image src="/assets/leftArrow.png" alt="atm" width={200} height={200} className="absolute top-5 left-5 h-14 w-auto object-cover hover:cursor-pointer" onClick={() => navigateToPage("")} />
            <h1 className="text-[5rem] py-10 text-center font-bold font-fira">Welcome to <span className="text-green-500">smart ATM</span></h1>
            <h2 className="text-[3rem] pt-5 text-center text-gray-500">Please select your action</h2>
            <section className="grid grid-cols-2 gap-10 px-10 mt-28">
                <Button onClick={() => navigateToPage("withdrawal")} className="h-28 text-[2rem] bg-white text-left w-full">Withdrawal</Button>
                <Button onClick={() => navigateToPage("deposit")} className="h-28 text-[2rem] bg-white text-left w-full">Deposit</Button>
                <Button className="h-28 text-[2rem] bg-white text-left w-full">Other service</Button>
            </section>
        </section>
    );
}

export default menuPage;