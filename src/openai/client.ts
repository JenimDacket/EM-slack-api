import { config } from 'dotenv';
import OpenAI from 'openai';

config();

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default client;
