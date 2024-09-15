import { useState, useEffect } from 'react';

const SpeechToText = () => {
  const [isListening, setIsListening] = useState<boolean>(true);

  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      alert('Your browser does not support speech recognition. Please try Google Chrome.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    const handleStart = () => {
      setIsListening(true);
    };

    const handleEnd = () => {
      setIsListening(false);
    };

    const handleResult = (event: SpeechRecognitionEvent) => {
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcriptChunk = event.results[i][0].transcript;
        
        // Split the transcript into words
        const words = transcriptChunk.toLowerCase().split(/\s+/).map(word => word.replace(/[.,]$/, ''));
        console.log(words);
        
        // Check if "confirm" is in the words
        if (words.includes("confirm")) {
          // Do something when "confirm" is detected
          console.log("The word 'confirm' was spoken!");
        }
      }
    };
    
    recognition.onstart = handleStart;
    recognition.onend = handleEnd;
    recognition.onresult = handleResult;

    if (isListening) {
      recognition.start();
    } else {
      recognition.stop();
    }
  }, [isListening]);
};

export { SpeechToText };
