"use client"

import { Button } from "@nextui-org/react";
import { navigateToPage } from "../utils/functions";

const menuPage: React.FC = () => {
    return (
        <section className="bg-radial to-black from-blue-950 w-screen h-screen text-white font-gotham">
            <h1 className="text-[5rem] py-10 text-center font-bold font-fira">Welcome to smart ATM</h1>
            <h2 className="text-[3rem] pt-5 text-center">Please select your action</h2>
            <section className="grid grid-cols-2 gap-10 px-10 mt-28">
                <Button onClick={() => navigateToPage("withdrawal")} className="h-28 text-[2rem] bg-white text-left w-full">Withdrawal</Button>
                <Button className="h-28 text-[2rem] bg-white text-left w-full">Deposit</Button>
                <Button className="h-28 text-[2rem] bg-white text-left w-full">Other service</Button>
            </section>
        </section>
    );
}

export default menuPage;