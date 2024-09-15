// import { spawn } from 'child_process';
// import { NextResponse } from 'next/server';

// export async function GET() {
//   // Spawn the Python process with the `-u` flag for unbuffered output
  
//   const process = spawn('python3', ['-u', './app/api/runFacial/face_movements.py']);
//   const encoder = new TextEncoder();

//   // Create a ReadableStream to send data back to the client in real-time
  
//   const readableStream = new ReadableStream({
//     start(controller) {
//       process.stdout.on('data', (data) => {
//         controller.enqueue(encoder.encode(data)); // Send each chunk of stdout data to the client
//       });

//       process.stderr.on('data', (data) => {
//         // controller.enqueue(encoder.encode(`ERROR: ${data}`)); // Send error chunks to the client
//       });

//       process.on('close', () => {
//         controller.close(); // Close the stream when the Python process finishes
//       });

//       process.on('error', (err) => {
//         // controller.error(err); // Handle errors in the stream
//       });
//     },
//   });

//   return new Response(readableStream, {
//     headers: { 'Content-Type': 'text/plain' },
//   });
// }

import { spawn, ChildProcess } from 'child_process';
import { NextResponse } from 'next/server';

// Global storage for process references
const processMap_2 = new Map<string, ChildProcess>();

export async function GET(request: Request) {
  try{
  const url = new URL(request.url);
  const stop = url.searchParams.get('stop');
  const processId = url.searchParams.get('processId');

  if (stop && processId) {
    const processToStop = processMap_2.get(processId);
    if (processToStop) {
      processToStop.kill(); // Kill the process
      processMap_2.delete(processId); // Remove from the map
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
  const process = spawn('python3', ['-u', './app/api/runFacial/face_movements.py']);
  processMap_2.set(id, process); // Store the process reference with its ID

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
          processMap_2.delete(processId || id); // Clean up process reference
        }
      });

      process.stderr.on('data', (data) => {
        // Handle stderr if needed
      });

      process.on('close', () => {
        controller.close(); // Close the stream when the Python process finishes
        processMap_2.delete(id); // Clean up process reference
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

