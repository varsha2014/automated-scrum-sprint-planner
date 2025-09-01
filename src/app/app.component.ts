import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StoryFormComponent } from './components/story-form/story-form.component';
import { StoryListComponent } from './components/story-list/story-list.component';
import { SprintCalculatorComponent } from './components/sprint-calculator/sprint-calculator.component';
import { AutoSelectedSprintComponent } from './components/auto-selected-sprint/auto-selected-sprint.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    StoryFormComponent,
    StoryListComponent,
    SprintCalculatorComponent,
    AutoSelectedSprintComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
