"use client"

import { navigateToPage } from "@/app/utils/functions";
import { useHandsFree } from "@/app/utils/handsFree";
import { Button, Spinner } from "@nextui-org/react";
import { div } from "framer-motion/client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const withdrawalPage: React.FC = () => {
    const {
        trigger,
        output,
        click,
        focusedButton,
        buttonsRef,
        handleStartListening,
        fetchRealTimeOutput,
    } = useHandsFree();
    
    const [startedAI, setStartedAI] = useState(false);
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

    const faceDetected = () => {
        console.log("Face detected");
        handleStartListening();
        fetchRealTimeOutput();
    }

    return (
        <div className="overflow-hidden">
            {/* <Button onClick={faceDetected}>run</Button> */}
        {confirm ? (
                <section className="flex flex-col items-center bg-radial w-screen text-white font-gotham">
                    <h1 className="mr-8 text-[5rem] py-10 text-center font-bold font-fira"><span className="text-green-500">Withdrawal</span> confirmed</h1>
                    <h2 className="mr-8 text-[3rem] text-center text-gray-500">Please take you cash</h2>
                    <h2 className="mr-8 text-[3rem] text-center relative">Amount: ${amountValue ? amountValue : <Spinner className="absolute left-52 top-9" />}</h2>

                </section>
            ) : (
                <section className="flex flex-col items-center bg-radial w-screen text-white font-gotham">
                    <h1 className="mr-8 text-[5rem] py-10 text-center font-bold font-fira">Withdrawal</h1>
                    <h2 className="mr-8 text-[2rem] text-center text-gray-500">Are you sure you want to withdraw the amount of</h2>
                    <h2 className="mr-8 text-[3rem] text-center relative">${amountValue ? amountValue : <Spinner className="absolute left-14 top-9" />}</h2>
                    <div className="flex gap-5 mr-8">
                    <Button
                            ref={(el) => {
                                if (!buttonsRef.current[0]) {
                                    buttonsRef.current[0] = [];
                                }
                                buttonsRef.current[0][0] = el;
                            }}
                            onClick={() => navigateToPage("withdrawal")}
                            className={`mt-10 p-10 bg-red-600 text-white text-[3rem] ${focusedButton[0] === 0 && focusedButton[1] === 0 ? 'bg-red-800' : ''}`}
                        >
                            Cancel
                        </Button>
                        <Button
                            ref={(el) => {
                                if (!buttonsRef.current[0]) {
                                    buttonsRef.current[0] = [];
                                }
                                buttonsRef.current[0][1] = el;
                            }}
                            onClick={() => setConfirm(true)}
                            className={`mt-10 p-10 bg-green-500 text-white text-[3rem] ${focusedButton[0] === 0 && focusedButton[1] === 1 ? 'bg-green-700' : ''}`}
                        >
                            Confirm
                        </Button>
                    </div>
                </section>
        )}
        </div>
    );
}

export default withdrawalPage;