"use client";

import Image from 'next/image';
import { navigateToPage } from "../utils/functions";

const InteractiveImage: React.FC = () => {
  return (
    <Image 
      src="/assets/leftArrow.png" 
      alt="atm" 
      width={200} 
      height={200} 
      className="absolute top-5 left-5 h-14 w-auto object-cover hover:cursor-pointer" 
      onClick={() => navigateToPage("menu")} 
    />
  );
};

export default InteractiveImage;