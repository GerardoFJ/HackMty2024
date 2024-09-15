"use client"

import { navigateToPage } from "@/app/utils/functions";
import { Button, Spinner } from "@nextui-org/react";
import { div } from "framer-motion/client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const withdrawalPage: React.FC = () => {
    const searchParams = useSearchParams();
    const [amountValue, setAmountValue] = useState<string | null>(null);
    const [confirm, setConfirm] = useState(false);

    // Use useEffect to ensure the code runs on the client side
    useEffect(() => {
        const amount = searchParams.get('amount');
        if (amount) {
            setAmountValue(amount);
        }
    }, [searchParams]);

    useEffect(() => {
        if (confirm) {
            const timer = setTimeout(() => {
                navigateToPage("");
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [confirm]);

    return (
        <div className="h-screen w-screen overflow-hidden">
        {confirm ? (
                <section className="flex flex-col justify-center items-center bg-radial to-black from-blue-950 w-screen h-screen text-white font-gotham">
                    <h1 className="text-[5rem] py-10 text-center font-bold font-fira"><span className="text-green-500">Withdrawal</span> confirmed</h1>
                    <h2 className="text-[3rem] pt-5 text-center text-gray-500">Please take you cash</h2>
                    <h2 className="text-[3rem] pt-5 text-center relative">Amount: ${amountValue ? amountValue : <Spinner className="absolute left-52 top-9" />}</h2>

                </section>
            ) : (
                <section className="flex flex-col justify-center items-center bg-radial to-black from-blue-950 w-screen h-screen text-white font-gotham">
                    <h1 className="text-[5rem] py-10 text-center font-bold font-fira">Withdrawal</h1>
                    <h2 className="text-[3rem] pt-5 text-center text-gray-500">Are you sure you want to withdraw the amount of</h2>
                    <h2 className="text-[3rem] pt-5 text-center relative">${amountValue ? amountValue : <Spinner className="absolute left-14 top-9" />}</h2>
                    <div className="flex gap-5">
                        <Button onClick={() => navigateToPage("withdrawal")} className="mt-10 p-10 bg-red-600 text-white text-[3rem]">Cancel</Button>
                        <Button onClick={() => setConfirm(true)} className="mt-10 p-10 bg-green-500 text-white text-[3rem]">Confirm</Button>
                    </div>
                </section>
        )};
        </div>
    );
}

export default withdrawalPage;