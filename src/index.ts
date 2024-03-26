import { App } from '@slack/bolt';
import { config } from 'dotenv';
import { convertToPinyin, translateToEnglish } from './openai/languageServices';
import { getChineseSubstrs } from './utils/languageRegex';
import { repl } from './utils/repl';
import { arrsToMap } from './utils/arrsToMap';

config();

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode: true,
  appToken: process.env.SLACK_APP_TOKEN,
  port: Number(process.env.PORT) || 3000,
});

(async () => {
  await app.start(process.env.PORT || 3000);
  console.log('Bolt app started!!');
})();

// The open_modal shortcut opens a plain old modal
app.shortcut('characters_to_pinyin_converter', async ({ shortcut, ack, client, logger }) => {
  try {
    // Acknowledge shortcut request
    await ack();
    console.log('shortcut: ', shortcut);
    //console.log('client: ', client);

    const chinWords = getChineseSubstrs(shortcut.message.text);
    if (chinWords.length > 0) {
      const conversion = await convertToPinyin(chinWords);
      const map = arrsToMap(chinWords, conversion);
      const replaced = repl(shortcut.message.text, map);
      console.log('replaced: ', replaced);

      client.chat.postEphemeral({
        channel: shortcut.channel.id,
        text: `${shortcut.message.text}\n${replaced}`,
        user: shortcut.user.id,
      });
    }
    // Call the views.open method using one of the built-in WebClients

    logger.info();
  } catch (error) {
    logger.error(error);
  }
});

app.shortcut('translate_chinese_to_english', async ({ shortcut, ack, client, logger }) => {
  try {
    // Acknowledge shortcut request
    await ack();
    console.log('shortcut: ', shortcut);
    //console.log('client: ', client);

    const translation = await translateToEnglish(shortcut.message.text);
    console.log('translation: ', translation);

    client.chat.postEphemeral({
      channel: shortcut.channel.id,
      text: `${shortcut.message.text}\n${translation}`,
      user: shortcut.user.id,
    });
    // Call the views.open method using one of the built-in WebClients

    logger.info();
  } catch (error) {
    logger.error(error);
  }
});

/* General Message Send example
app.message(async ({ message, say }) => {
  const chinWords = getChineseSubstrs(message.text);
  console.log('chinwords: ', chinWords);
  if (chinWords.length > 0) {
    const conversion = await convertToPinyin(chinWords);
    console.log('conversion: ', conversion);
    const map = arrsToMap(chinWords, conversion);
    console.log('map: ', map);
    const replaced = repl(message.text, map);
    console.log('replaced: ', replaced);
    await say(replaced);
  }
});
 */
