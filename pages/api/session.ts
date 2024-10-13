import { v4 as uuidv4 } from 'uuid';
import { NextApiRequest, NextApiResponse } from 'next';

// In-memory session store (can be replaced with a database)
const sessions: { [key: string]: any } = {};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const sessionId = uuidv4();  // Generate a unique session ID
    sessions[sessionId] = { members: [] };  // Create a new session
    res.status(200).json({ sessionId });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
