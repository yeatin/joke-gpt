import { Component, AfterViewChecked } from '@angular/core';
import { GptService } from '../gpt.service';


@Component({
  selector: 'app-joke-section',
  templateUrl: './joke-section.component.html',
  styleUrls: ['./joke-section.component.css']
})
export class JokeSectionComponent implements AfterViewChecked {
  ngAfterViewChecked() {
    this.scrollToBottom();
  }
  scrollToBottom() {
    const scrollAnchor = document.querySelector("#scrollAnchor");
    scrollAnchor?.scrollIntoView();

  }
  gptObj = this.gptService.getGptObj();
  isGptProcessing = this.gptService.getIsGptProcessing();

  constructor(private gptService: GptService){
  }
}
