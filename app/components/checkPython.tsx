import { useState } from 'react';

export default function VisionComponent() {
  const [output, setOutput] = useState<string | null>(null);

  const runVisionScript = async () => {
    try {
      const response = await fetch('/api/runVision'); // Call the API route
      const data = await response.json();
      setOutput(data.output || data.error);
    } catch (error) {
      setOutput(`Error: ${error}`);
    }
  };

  return (
    <div>
      <h1>Vision Script Output:</h1>
      <button onClick={runVisionScript}>Run Vision Script</button>
      <pre>{output}</pre>
    </div>
  );
}
