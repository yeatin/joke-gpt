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
  constructor(
    private formBuilder: FormBuilder,
    private gptService: GptService) {

  }
  onGenerate(): void {
    let theme = this.jokeForm.value.theme;
    this.gptService.changeIsGptProcessing(true);
    if (theme === undefined || theme === null || theme.length === 0) {
      theme = "你來決定題材";
    }
    this.jokeForm.reset();
    this.gptService.addGptMessage(`${theme}`);
    this.gptService.getNewJoke()
      .then(data => {
        if (!data || data.error || !data.choices) {
          this.handleError(data);
        }
        this.gptService.changeIsGptProcessing(false);
      })
      .catch(err => {
        this.handleError(err);
      });
  }
  handleError(err: object) {
    this.gptService.editAssistantMessage({ role: "assistant", content: "發生預期外的錯誤，請再嘗試一次。" });
    this.gptService.changeIsGptProcessing(false);
    console.error(err);
  }
}
