import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JokeSectionComponent } from './joke-section.component';

describe('JokeSectionComponent', () => {
  let component: JokeSectionComponent;
  let fixture: ComponentFixture<JokeSectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JokeSectionComponent]
    });
    fixture = TestBed.createComponent(JokeSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
