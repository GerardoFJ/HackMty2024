// app/api/runVision/route.ts
import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';

// Promisify exec to use async/await
const execPromise = promisify(exec);

export async function GET() {
  try {
    // Update the path to your Python script
    const { stdout, stderr } = await execPromise('python ./app/utils/script.py');

    if (stderr) {
      return NextResponse.json({ error: stderr }, { status: 500 });
    }

    return NextResponse.json({ output: stdout });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
