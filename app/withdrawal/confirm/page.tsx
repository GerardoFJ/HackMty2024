"use client"

import { Button } from "@nextui-org/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const withdrawalPage: React.FC = () => {
    const searchParams = useSearchParams();
    const [amountValue, setAmountValue] = useState<string | null>(null);

    // Use useEffect to ensure the code runs on the client side
    useEffect(() => {
        const amount = searchParams.get('amount');
        if (amount) {
            setAmountValue(amount);
        }
    }, [searchParams]);

    return (
        <section className="flex flex-col justify-center items-center bg-radial to-black from-blue-950 w-screen h-screen text-white font-gotham">
            <h1 className="text-[5rem] py-10 text-center font-bold font-fira">Withdrawal confirmed</h1>
            <h2 className="text-[3rem] pt-5 text-center">Please take you cash</h2>
            <h2 className="text-[3rem] pt-5 text-center">Amount: {amountValue}</h2>
        </section>
    );
}

export default withdrawalPage;