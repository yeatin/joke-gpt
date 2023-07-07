import { Injectable } from '@angular/core';
import { environment } from "../environments/environment"
@Injectable({
  providedIn: 'root'
})
export class GptService {
  gptObj: GptObj = {
    model: "gpt-3.5-turbo",
    messages: [{ role: "system", content: "You are a joke-making assistant. Come up with a joke based on user's input message. Exploit the input as a primary theme for the joke, and when it doesn't sound like a theme, make it work as a prompt or directive. Generate the joke in the same language of the user's message content. Make sure you identify user's input first, and then make a joke in the same language. There are three things you are not allowed to do. First, mixing up different languages in your response message is not permitted, and neither is offering translation. Second, simplified Chinese (China Chinese) is not allowed. Produce Traidional Chinese (Taiwanese Chinese) only, when the user input message is Chinese. Third, making a joke in a different language as user's input message. If user sent a English theme, you tell a joke in English." }]
  };
  ngObj = [
    {
      role: "assistant",
      content: "告訴我笑話的主題，語言不限！送出空白提示的話我會自由發揮。"
    }
  ]
  isGptProcessing = { state: false };
  constructor() { }

  getGptObj() {
    return this.gptObj;
  }

  getNgObj() {
    return this.ngObj;
  }

  addGptMessage(message: {role: string, content: string}) {
    this.gptObj.messages.push(message);
  }

  addNgMessage(message: {role: string, content: string}) {
    this.ngObj.push(message);
  }

  addEmptyAssistantMessage() {
    this.ngObj.push({ role: "assistant", content: "" });
  }

  editAssistantMessage(message: { role: string, content: string }) {
    this.ngObj[this.ngObj.length - 1].content = message.content;
  }

  getIsGptProcessing() {
    return this.isGptProcessing;
  }

  changeIsGptProcessing(state: boolean) {
    this.isGptProcessing.state = state;
  }

  popGptMessage() {
    return this.gptObj.messages.pop();
  }

  popNgMessage() {
    return this.ngObj.pop();
  }

  async getNewJoke(controller: AbortController | null) {
    try {
      const data = await fetch(environment.API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.gptObj),
        signal: controller?.signal
      });
      const json = await data.json();
      return json;
    }
    catch (err) {
      return err;
    }
  }
}

export interface GptObj {
  model: string,
  messages: Array<{ role: string, content: string }>
}
