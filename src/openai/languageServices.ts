import { checkAndFixArrayString } from '../utils/checkAndFixArrayString';
import client from './client';

const convertToPinyin = async (characters: string[]): Promise<string[]> => {
  console.log('openai feed: ', `["${characters.join('", "')}"]`);
  const completion = await client.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: `TERSE. Return pinyin for: ["${characters.join('","')}"] as array length ${
          characters.length
        }: ["word, list"]`,
      },
    ],
    temperature: 0,
    model: 'gpt-3.5-turbo',
  });
  console.log(completion.choices[0].message.content);
  const res = checkAndFixArrayString(completion.choices[0].message.content || '');
  console.log('Result: ', JSON.parse(res));
  return JSON.parse(res);
};

const translateToEnglish = async (sentence: string): Promise<string> => {
  const completion = await client.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: `TERSE. Translate into English: "${sentence}".`,
      },
    ],
    temperature: 0.2,
    model: 'gpt-3.5-turbo',
  });
  return completion.choices[0].message.content || 'woops! translation had trouble... Try again?';
};

export { convertToPinyin, translateToEnglish };
