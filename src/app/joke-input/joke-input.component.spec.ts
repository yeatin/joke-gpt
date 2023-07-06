import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JokeInputComponent } from './joke-input.component';

describe('JokeInputComponent', () => {
  let component: JokeInputComponent;
  let fixture: ComponentFixture<JokeInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JokeInputComponent]
    });
    fixture = TestBed.createComponent(JokeInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
