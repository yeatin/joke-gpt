import { Injectable } from '@angular/core';
import { environment } from "../environments/environment"
@Injectable({
  providedIn: 'root'
})
export class GptService {
  gptObj: GptObj = {
    model: "gpt-3.5-turbo",
    messages: [{ role: "system", content: "You are a joke-making assistant. Come up with a joke that is based on user's input message. Exploit the input as a primary theme for the joke, and when it doesn't sound like a theme, make it work as a prompt or directive. Lastly, generate the joke in the same language of the user's message content. Mixing up different languages in one message is not permitted, and neither is offering translation. Simplified Chinese (China) is not allowed, you can either offer English or Traditional Chinese (Taiwan)." }]
  };
  constructor() { }

  getGptObj() {
    return this.gptObj;
  }

  addGptMessage(prompt: string) {
    this.gptObj.messages.push({ role: "user", content: prompt });
  }

  addEmptyAssistantMessage() {
    this.gptObj.messages.push({ role: "assistant", content: "" });
  }

  editAssistantMessage(message: { role: string, content: string }) {
    this.gptObj.messages[this.gptObj.messages.length - 1].content = message.content;
  }
  
  async getNewJoke() {
    this.addEmptyAssistantMessage();
    const data = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + environment.API_KEY,
      },
      body: JSON.stringify(this.gptObj)
    });
    const json = await data.json();
    if (json.choices) {
      this.editAssistantMessage(json.choices[0].message);
    }
    return json;
  }
}

export interface GptObj {
  model: string,
  messages: Array<{ role: string, content: string }>
}
