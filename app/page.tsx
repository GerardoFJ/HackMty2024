import { NextUIProvider } from "@nextui-org/react";
import StartScreen from "./components/startScreen";

export default function Home() {
  return (
    <NextUIProvider>
        <StartScreen />
    </NextUIProvider>
  );
}
