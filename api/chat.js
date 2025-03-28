import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Solo POST consentito" });
  }

  const userMessage = req.body.message;

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [
        { role: "system", content: "Tu sei MaraSense, un assistente olografico intelligente e gentile. Rispondi sempre in italiano." },
        { role: "user", content: userMessage }
      ],
    });

    const reply = completion.data.choices[0].message.content;
    res.status(200).json({ reply });

  } catch (error) {
    console.error("Errore OpenAI:", error.response?.data || error.message);
    res.status(500).json({ error: "Errore nella richiesta a ChatGPT" });
  }
}
