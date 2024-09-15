import { useState } from "react";

const SpeechToText = () => {
  const [result, setResult] = useState<boolean>(false);
  const [listening, setListening] = useState<boolean>(true);

  const listen = () => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

    recognition.continuous = true; // Set to false to get a single result
    recognition.interimResults = false; // Set to false to get final results only

    recognition.onstart = () => {
      setListening(true);
      console.log('Speech recognition started');
    };

    recognition.onend = () => {
      setListening(false);
      console.log('Speech recognition ended');
    };

    // recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
    //   console.error('Speech recognition error detected: ' + event.error);
    //   reject(event.error);
    // };

    let processedIndex = 0; // Track the index of processed speech results

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      // Combine only the unprocessed speech results
      let transcript = '';
    
      for (let i = processedIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript + ' ';
      }
    
      console.log('Unprocessed speech recognition result:', transcript);
    
      if (transcript.trim().length === 0) return; // Ignore if there's no new transcript
    
      // Update processedIndex to the current length of results
      processedIndex = event.results.length;
    
      // Split the transcript into individual words for checking
      const words = transcript.toLowerCase().trim().split(/\s+/);
    
      // Clean each word by removing punctuation
      const cleanWords = words.map(word => word.replace(/[.,!?]/g, ''));
    
      const keywords = ['confirm', 'approve', 'accept', 'yes', 'ok', 'okay'];
    
      // Check each cleaned word against the keywords
      const keywordDetected = cleanWords.some(word => keywords.includes(word));
    
      if (keywordDetected) {
        console.log('Keyword detected');
        setResult(true);
      } else {
        console.log('No keyword detected');
      }
    };
    
    recognition.start();
  };

  return {
    listen,
    setResult,
    result,
    listening
  }
};

export { SpeechToText };
