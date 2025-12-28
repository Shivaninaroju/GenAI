import "dotenv/config";            // ⭐ REQUIRED
import { GoogleGenAI } from "@google/genai";
import readlineSync from "readline-sync";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,   // ⭐ from .env
});

const History = [];

async function Chatting(userProblem) {
  History.push({
    role: "user",
    parts: [{ text: userProblem }],
  });

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-lite",
    contents: History,
  });

  const answer = response.candidates[0].content.parts[0].text;

  History.push({
    role: "model",
    parts: [{ text: answer }],
  });

  console.log("\n" + answer);
}

async function main() {
  const userProblem = readlineSync.question("Ask me anything--> ");
  await Chatting(userProblem);
  main(); // chat loop
}

main();
