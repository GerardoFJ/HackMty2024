'use client'
import { useEffect, useRef, useState } from 'react';
import VirtualMouse from './VirtualMouse';
import { Braah_One } from 'next/font/google';
import { useHandsFree } from "../utils/handsFree";
interface VisionComponentProps {
  activate: boolean; // Define the type of the prop
}
export default function VisionComponent( 
  {
    activate,

  }
  : VisionComponentProps
) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [active, setActive] = useState(false);
  const [started, setStarted] = useState(false);
  const activateRef = useRef(active);
  const {
    trigger,
    output,
    click,
    focusedButton,
    buttonsRef,
    handleStartListening,
    fetchRealTimeOutput_Head,
    Activated
} = useHandsFree();
    const handleMouseClick = (x: number, y: number) => {
    const element = document.elementFromPoint(x, y);
    if (element) {
      element.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    }
  };
  useEffect(() => {
    activateRef.current = activate;
    console.log(`Activate: ${activate}`);
    if(activateRef.current && !started) {
      Activated.current = false;
      setStarted(true);
      console.log('Starting vision script');
      fetchRealTimeOutput();
    } // Update ref whenever activate changes

  }, [activate]);
 

  const fetchRealTimeOutput = async () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    var x = 0;
    var y = 0;
    console.log(`Width: ${width}, Height: ${height}`);
    const response = await fetch(`/api/runVision?width=${width}&height=${height}`)
    const process_id = response.headers.get('Process-Id');
    console.log(`Process ID: ${process_id}`);
    
    // If the response body exists and is a readable stream
    if (response.body) {
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let finished = false;

      // While we still have chunks of data
      while (!finished && activateRef.current) {
        const { done, value } = await reader.read();
        
        // Check if we've reached the end of the stream
        if (done) {
          console.log('Stream complete');
          finished = true;
          setActive(false);
          setStarted(false);
          break;
        }
        if (!activateRef.current) {
          console.log('Deactivating stream processing');
          finished = true; // Exit the loop if not activated
          const processStopResponse = await fetch(`/api/runVision?stop=true&processId=${process_id}`);
          setActive(false);
          setStarted(false);
        }
        // Decode and print the chunk
        const chunk = decoder.decode(value);
        // console.log(chunk);
        const values = chunk.split(' '); // Assuming space is the delimiter
        if (values.length === 2 && values[0] !== '' && values[1] !== '') {
          setActive(true);
          const [value1, value2] = values;
          // console.log(`Value 1: ${value1}, Value 2: ${value2}`);
          
          
        const element = document.elementFromPoint(parseInt(value1), parseInt(value2));
        if (element && element.tagName.toLowerCase() === 'button') {
          console.log("found a button")
          const rect = element.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          setPosition({ x: centerX, y: centerY});

          x = centerX;
          y = centerY;
          
        }else{
          setPosition({ x: parseInt(value1), y: parseInt(value2)});

          x = parseInt(value1);
          y = parseInt(value2);
        }
        

          console.log(`X: ${x}, Y: ${y}`);
        }

        if(chunk.includes("click")){
          console.log('Click detected');
          handleMouseClick(x, y);
        }
          // Append the chunk to the state
        
      }
      setActive(false);
      
    }
};

  return (
    <div>
      
      {active && (
      <VirtualMouse x={position.x} y={position.y} onClick={handleMouseClick} />
      )}
      {/* {activate && (
        <button onClick={fetchRealTimeOutput} style={{position: 'absolute', top:'0px',left:'0px'}}>Run Vision Script</button>
    )} */}
      
      
    </div>
  );
}
