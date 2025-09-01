import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { StoryService } from '../services/story.service';
import { delay, map, of } from 'rxjs';

export function uniqueStoryNameAsyncValidator(
  service: StoryService
): AsyncValidatorFn {
  return (control: AbstractControl) => {
    const name = control.value?.trim();
    return of(service.currentStories).pipe(
      delay(300), // simulate API delay
      map((stories) =>
        stories.some((s) => s.name === name) ? { nonUniqueName: true } : null
      )
    );
  };
}
