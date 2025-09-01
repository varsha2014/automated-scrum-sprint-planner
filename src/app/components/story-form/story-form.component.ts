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
import { uniqueStoryNameAsyncValidator } from '../../custom/custom-validator';

@Component({
  selector: 'app-story-form',
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './story-form.component.html',
  styleUrl: './story-form.component.scss',
})
export class StoryFormComponent {
  public form: FormGroup;

  constructor(public fb: FormBuilder, private storyService: StoryService) {
    this.form = this.fb.group({
      name: [
        '',
        {
          validators: [Validators.required],
          asyncValidators: [uniqueStoryNameAsyncValidator(this.storyService)],
          updateOn: 'blur', // optional
        },
      ],
      points: [null, [Validators.required, Validators.min(1)]],
      description: [''],
    });
  }

  public addStory(): void {
    if (this.form.valid) {
      const trimmedValue = {
        ...this.form.value,
        name: this.form.value.name.trim(),
      };

      this.storyService.addStory(trimmedValue);
      this.form.reset();
    }
  }
}
