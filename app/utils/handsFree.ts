"use client";

import { useEffect, useRef, useState } from "react";
import { SpeechToText } from "./audioRecognition";

const useHandsFree = () => {
  const {
    listen,
    result,
    setResult,
    listening,
  } = SpeechToText();
  const [trigger, setTrigger] = useState<number>(0);
  const [output, setOutput] = useState<string>("");
  const [click, setClick] = useState(false);
  const [focusedButton, setFocusedButton] = useState<[number, number]>([0, 0]); // Focus tracking
  const buttonsRef = useRef<(HTMLButtonElement | null)[][]>([]); // Store button refs in a 2D array

  // Listen for voice commands
  const handleStartListening = async () => {
    try {
      listen();
    } catch (error) {
      console.error("Error in speech recognition:", error);
    }
  };

  useEffect(() => {
    if (result) {
      console.log("Confirm detected:", result);
      setClick(true);
      setResult(false);
    }
  }, [result])

  useEffect(() => {
    if (!listening) {
      handleStartListening();
    }
  }, [listening]);

  // Click the focused button when the state changes
  useEffect(() => {
    if (click) {
      const [row, col] = focusedButton;
      buttonsRef.current[row][col]?.click();
      setClick(false);
    }
  }, [click]);

  // Fetch real-time output from the face recognition API
  const fetchRealTimeOutput = async () => {
    const response = await fetch("/api/runFacial");

    // If the response body exists and is a readable stream
    if (response.body) {
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let finished = false;

      // While we still have chunks of data
      while (!finished) {
        const { done, value } = await reader.read();

        // Check if we've reached the end of the stream
        if (done) {
          finished = true;
          break;
        }

        // Decode and print the chunk
        const chunk = decoder.decode(value);
        setOutput(chunk); // Append the chunk to the state
        setTrigger((prev) => prev + 1); // Update the trigger state
      }
    }
  };

  // When a gesture is detected, update the focused button
  useEffect(() => {
    const [row, col] = focusedButton;
    const normalizedEvent = output.trim().toLowerCase(); // Normalize the event string
    console.log("Normalized event:", normalizedEvent);
    switch (normalizedEvent) {
      case "up":
        if (row > 0) setFocusedButton([row - 1, col]);
        break;
      case "down":
        if (row < buttonsRef.current.length - 1) setFocusedButton([row + 1, col]);
        break;
      case "left":
        if (col > 0) setFocusedButton([row, col - 1]);
        break;
      case "right":
        if (col < buttonsRef.current[row].length - 1) setFocusedButton([row, col + 1]);
        break;
      default:
        console.log("Unknown command:", normalizedEvent);
        break;
    }
  }, [trigger]);

  // Focus the current button when state changes
  useEffect(() => {
      const [row, col] = focusedButton;
      if (buttonsRef.current[row] && buttonsRef.current[row][col]) {
        buttonsRef.current[row][col]?.focus();
    }
  }, [focusedButton]);

  return {
    trigger,
    output,
    click,
    focusedButton,
    buttonsRef,
    handleStartListening,
    fetchRealTimeOutput,
  };
};

export { useHandsFree };