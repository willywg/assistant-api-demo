const OpenAI = require('openai');
require('dotenv').config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_TOKEN,
});

const ASSISTANT_ID = process.env.ASSISTANT_ID;

async function createThread(req, res) {
  try {
    const thread = await openai.beta.threads.create();
    res.json({ threadId: thread.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear el thread' });
  }
}

async function handleStreamChat(req, res) {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  // Forzar el flush del buffer
  res.flushHeaders();

  const threadId = req.params.room_id;
  const userMessage = req.query.message;

  if (!threadId || !userMessage) {
    res.write('event: error\n');
    res.write('data: {"error": "Se requiere threadId y message"}\n\n');
    res.end();
    return;
  }

  try {
    await openai.beta.threads.messages.create(threadId, {
      role: "user",
      content: userMessage
    });

    const stream = await openai.beta.threads.runs.create(threadId, {
      assistant_id: ASSISTANT_ID,
      stream: true,
    });

    res.write('event: start-chat\n');
    res.write('data: [CHAT-INICIADO]\n\n');
    let fullResponse = '';

    for await (const event of stream) {
      if (event.event === 'thread.message.delta') {
        const chunk = event.data.delta.content?.[0];
        if (chunk && 'text' in chunk) {
          const assistantReply = encodeURIComponent(chunk.text.value);
          res.write('event: response-chat\n');
          res.write(`data: ${assistantReply}\n\n`);
          fullResponse += chunk.text.value;
        }
      }

      if (event.event === 'thread.run.completed') {
        console.log(fullResponse);
        res.write('event: end-chat\n');
        res.write('data: [CHAT-FINALIZADO]\n\n');
        res.end();
      }
    }
  } catch (error) {
    console.error(error);
    res.write('event: error\n');
    res.write(`data: ${JSON.stringify({ error: error.message })}\n\n`);
    res.end();
  }
}

module.exports = { handleStreamChat, createThread }; 