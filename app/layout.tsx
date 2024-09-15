import type { Metadata } from "next";
import "./globals.css";
import { fira, gotham } from "./utils/fonts";
import Accesibility from "./components/accesibility";
export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${fira} ${gotham}`}>
     
        {children}
      </body>
    </html>
  );
}
