import { Component, AfterViewChecked } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { GptService } from '../gpt.service';


@Component({
  selector: 'app-joke-section',
  templateUrl: './joke-section.component.html',
  styleUrls: ['./joke-section.component.css']
})
export class JokeSectionComponent implements AfterViewChecked {
  jokeForm = this.formBuilder.group({
    theme: ""
  });
  ngAfterViewChecked() {
    this.scrollToBottom();
  }
  scrollToBottom() {
    const scrollAnchor = document.querySelector("#scrollAnchor");
    scrollAnchor?.scrollIntoView();

  }
  prevJoke: string | null | undefined;
  gptObj = this.gptService.getGptObj();
  isGptProcessing = false;


  constructor(
    private formBuilder: FormBuilder,
    private gptService: GptService
  ) {
  }

  onGenerate(): void {
    let theme = this.jokeForm.value.theme;
    this.isGptProcessing = true;
    if (theme === undefined || theme === null || theme.length === 0) {
      theme = "隨便給我一個笑話";
    }
    this.jokeForm.reset();
    this.gptService.addGptMessage(`${theme}`);
    this.gptService.getNewJoke()
      .then(data => {
        this.isGptProcessing = false;
        if(data.error){
          this.gptService.editAssistantMessage({ role: "assistant", content: "An error occurred while generating the joke. Please try again." });
          console.error(data);
        }
      });
  }
}
