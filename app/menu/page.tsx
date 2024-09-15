"use client"

import { Button } from "@nextui-org/react"; // Import the Image component from the correct package
import Image from 'next/image';
import { navigateToPage } from "../utils/functions";
import Weather from "../components/weather";
import { div } from "framer-motion/m";

const menuPage: React.FC = () => {
    
    return (
        <div>

        {/* Transaction Buttons */}
        <div className="grid grid-cols-2 gap-6 justify-center mx-10 my-32">
            {/* Left Side (Money Options) */}
            <div className="col-span-1">
                <div className="bg-yellow-500 text-gray-900 p-0 rounded-lg mb-4 flex items-center justify-center">
                    <Button onClick={() => navigateToPage("withdrawal")} className="w-full text-left text-xl font-bold appearance-none bg-transparent border-none p-10 m-1">Money Withdrawal</Button>
                </div>
                <div className="bg-yellow-500 text-gray-900 p-0 rounded-lg mb-0 flex items-center justify-center">
                    <Button onClick={() => navigateToPage("deposit")} className="w-full text-left text-xl font-bold appearance-none bg-transparent border-none p-10 m-1">Money Deposit</Button>
                </div>
            </div>

            {/* Right Side (Other Options) */}
            <div className="col-span-1 grid grid-cols-2 gap-4">
                <div className="bg-gray-800 p-6 rounded-lg flex items-center justify-center">
                    <Button onClick={() => navigateToPage("withdrawal")} className="w-full text-center text-lg appearance-none bg-transparent border-none text-white">Balance Inquiry</Button>
                </div>
                <div className="bg-gray-800 p-6 rounded-lg flex items-center justify-center">
                    <Button onClick={() => navigateToPage("withdrawal")} className="w-full text-center text-lg appearance-none bg-transparent border-none text-white">Internal Transfer</Button>
                </div>
                <div className="bg-gray-800 p-6 rounded-lg flex items-center justify-center">
                    <Button onClick={() => navigateToPage("withdrawal")} className="w-full text-center text-lg appearance-none bg-transparent border-none text-white">PIN Change</Button>
                </div>
                <div className="bg-gray-800 p-6 rounded-lg flex items-center justify-center">
                    <Button onClick={() => navigateToPage("withdrawal")} className="w-full text-center text-lg appearance-none bg-transparent border-none text-white">Exit/Take Card</Button>
                </div>
            </div>
        </div>


        </div>

    );
}

export default menuPage;