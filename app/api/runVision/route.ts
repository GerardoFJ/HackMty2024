import { spawn, ChildProcess } from 'child_process';
import { NextResponse } from 'next/server';

// Global storage for process references
const processMap = new Map<string, ChildProcess>();

export async function GET(request: Request) {
  try{
  const url = new URL(request.url);
  const width = url.searchParams.get('width');
  const height = url.searchParams.get('height');
  const stop = url.searchParams.get('stop');
  const processId = url.searchParams.get('processId');

  if (stop && processId) {
    const processToStop = processMap.get(processId);
    if (processToStop) {
      processToStop.kill(); // Kill the process
      processMap.delete(processId); // Remove from the map
      console.log(`Python process with ID ${processId} killed`);
    } else {
      console.log(`No process found with ID ${processId}`);
    }
    return new Response('Process stopped', { status: 200 });
  }
  if(processId){
    console.log(`Process ID: ${processId}`);
  }
  
  // Generate a unique ID for the process
  const id = Date.now().toString();
  
  // Spawn the Python process with the `-u` flag for unbuffered output
  const process = spawn('python3', ['-u', 'app/api/runVision/fingerPointer.py', `${width}`, `${height}`]);
  processMap.set(id, process); // Store the process reference with its ID

  const encoder = new TextEncoder();
  console.log('Python process spawned');

  // Create a ReadableStream to send data back to the client in real-time
  const readableStream = new ReadableStream({
    start(controller) {
      process.stdout.on('data', (data) => {
        // console.log('sending');
        try{
        const state = controller.enqueue(encoder.encode(data)); 
        console.log(state)// Send each chunk of stdout data to the client
        }catch(e){
          process.kill();
          processMap.delete(processId || id); // Clean up process reference
        }
      });

      process.stderr.on('data', (data) => {
        // Handle stderr if needed
      });

      process.on('close', () => {
        controller.close(); // Close the stream when the Python process finishes
        processMap.delete(id); // Clean up process reference
      });

      process.on('error', (err) => {
        // Handle process error if needed
      });
    },
  });

  return new Response(readableStream, {
    headers: { 'Content-Type': 'text/plain', 'Process-Id': id },
  });}
  catch(e){
    console.log("Error : ", e);
  }
}
