import { NextUIProvider } from "@nextui-org/react";
import Image from "next/image";
import AtmUI from "./components/atmUI";

export default function Home() {
  return (
    <NextUIProvider>
        <AtmUI />
    </NextUIProvider>
  );
}
