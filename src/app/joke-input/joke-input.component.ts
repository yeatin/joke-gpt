import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { GptService } from '../gpt.service';

@Component({
  selector: 'app-joke-input',
  templateUrl: './joke-input.component.html',
  styleUrls: ['./joke-input.component.css']
})
export class JokeInputComponent {
  jokeForm = this.formBuilder.group({
    theme: ""
  });
  isGptProcessing = this.gptService.getIsGptProcessing();
  controller: AbortController | null = null;
  constructor(
    private formBuilder: FormBuilder,
    private gptService: GptService) {

  }
  onGenerate(): void {
    // to abort the fetch when stopGeneratingButton is clicked
    this.controller = new AbortController();
    let theme = this.jokeForm.value.theme;
    this.gptService.changeIsGptProcessing(true);
    if (theme === undefined || theme === null || theme.length === 0) {
      theme = "你來決定題材";
    }
    this.jokeForm.reset();
    // add user message to gptObj and ngObj
    this.gptService.addGptMessage({role: "user", content: theme});
    this.gptService.addNgMessage({role: "user", content: theme});
    // add loading message to ngObj
    this.gptService.addEmptyAssistantMessage();
    this.gptService.getNewJoke(this.controller)
      .then(data => {
        if (!data || data.error || !data.choices) {
          this.handleError(data);
        }
        if (data.choices) {
          this.gptService.addGptMessage(data.choices[0].message);
          this.gptService.editAssistantMessage(data.choices[0].message);
        }
        this.gptService.changeIsGptProcessing(false);
      })
      .catch(err => {
        this.handleError(err);
      });
  }

  handleError(err: Error): void {
    if (err.name === "AbortError") {
      // delete 1 gptMessage
      this.gptService.popGptMessage();

      // delete assistant loading
      this.gptService.popNgMessage();
      // delete user prompt
      this.gptService.popNgMessage();
    }
    else {
      this.gptService.editAssistantMessage({ role: "assistant", content: "⚠️⚠️ 系統超載，請再輸入一次。" });
      this.gptService.popGptMessage();
    }
    this.gptService.changeIsGptProcessing(false);
    console.error(err);
  }

  onStopGenerating(controller: AbortController | null): void {
    controller?.abort();
  }
}
