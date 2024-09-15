// app/api/runVision/route.ts (or pages/api/runVision.ts if using Pages Router)
import { exec } from 'child_process';
import { promisify } from 'util';
import { NextResponse } from 'next/server'; // App Router
// or use: import type { NextApiRequest, NextApiResponse } from 'next'; // Pages Router

const execPromise = promisify(exec);

export async function GET() {  // For App Router; use "handler" for Pages Router
  try {
    // Adjust the path to your Python script
    const { stdout, stderr } = await execPromise('python ./app/api/runLogin/facial_recognition.py');
    
    if (stderr) {
    //   return NextResponse.json({ error: stderr }, { status: 500 });
    }
    
    return NextResponse.json({ output: stdout }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
