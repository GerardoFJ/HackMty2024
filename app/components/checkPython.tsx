// Some React component in the app directory
import { useEffect, useState } from 'react';

export default function VisionComponent() {
  const [output, setOutput] = useState<string | null>(null);

  useEffect(() => {
    const runVisionScript = async () => {
      const response = await fetch('../api/runVision');
      const data = await response.json();
      setOutput(data.output || data.error);
    };

    runVisionScript();
  }, []);

  return (
    <div>
      <h1>Vision Script Output:</h1>
      <pre>{output}</pre>
    </div>
  );
}
