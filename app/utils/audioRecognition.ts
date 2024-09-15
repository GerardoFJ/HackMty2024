// SpeechToText.tsx
const SpeechToText = (): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

    recognition.continuous = false; // Set to false to get a single result
    recognition.interimResults = false; // Set to false to get final results only

    recognition.onstart = () => {
      console.log('Speech recognition started');
    };

    recognition.onend = () => {
      resolve(false);
      console.log('Speech recognition ended');
    };

    // recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
    //   console.error('Speech recognition error detected: ' + event.error);
    //   reject(event.error);
    // };

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = event.results[0][0].transcript;
      console.log('Speech recognition result: ', transcript);
      // Check if "confirm" is in the result
      const keywords = ['confirm', 'approve', 'accept', 'yes', 'ok', 'okay'];
      if (keywords.some(keyword => transcript.toLowerCase().includes(keyword))) {
        resolve(true);
      }
    };

    recognition.start();
  });
};

export { SpeechToText };
