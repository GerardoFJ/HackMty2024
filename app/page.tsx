import { NextUIProvider } from "@nextui-org/react";
import StartScreen from "./components/startScreen";

export default function Home() {
  return (
    <NextUIProvider className="font-gotham">
        <StartScreen />
    </NextUIProvider>
  );
}
