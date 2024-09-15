import { spawn } from 'child_process';
import { NextResponse } from 'next/server';

export async function GET() {
  // Spawn the Python process with the `-u` flag for unbuffered output
  const process = spawn('python', ['-u', './app/api/runFacial/face_movements.py']);
  const encoder = new TextEncoder();

  // Create a ReadableStream to send data back to the client in real-time
  const readableStream = new ReadableStream({
    start(controller) {
      process.stdout.on('data', (data) => {
        controller.enqueue(encoder.encode(data)); // Send each chunk of stdout data to the client
      });

      process.stderr.on('data', (data) => {
        // controller.enqueue(encoder.encode(`ERROR: ${data}`)); // Send error chunks to the client
      });

      process.on('close', () => {
        controller.close(); // Close the stream when the Python process finishes
      });

      process.on('error', (err) => {
        // controller.error(err); // Handle errors in the stream
      });
    },
  });

  return new Response(readableStream, {
    headers: { 'Content-Type': 'text/plain' },
  });
}
