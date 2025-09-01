import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { StoryService } from '../../services/story.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sprint-calculator',
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './sprint-calculator.component.html',
  styleUrl: './sprint-calculator.component.scss',
})
export class SprintCalculatorComponent {
  public form: FormGroup;

  constructor(private fb: FormBuilder, private storyService: StoryService) {
    this.form = this.fb.group({
      sprintName: ['', Validators.required],
      capacity: [null, [Validators.required, Validators.min(1)]],
    });
  }

  public generateSprint(): void {
    if (this.form.valid) {
      this.storyService.generateSprint(this.form.value.capacity);
      this.form.reset();
    }
  }

  public clearStories(): void {
    this.storyService.clearStories();
  }

  public clearSprints(): void {
    this.storyService.clearSelectedStories();
  }
}
