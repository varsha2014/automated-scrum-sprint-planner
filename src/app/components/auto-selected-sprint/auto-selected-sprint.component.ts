import { Component } from '@angular/core';
import { StoryService } from '../../services/story.service';
import { Story } from '../../models/story.model';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-auto-selected-sprint',
  imports: [CommonModule],
  templateUrl: './auto-selected-sprint.component.html',
  styleUrl: './auto-selected-sprint.component.scss',
})
export class AutoSelectedSprintComponent {
  public selectedStories$: Observable<Story[]>;
  public sprintId!: number;
  constructor(private storyService: StoryService) {
    this.selectedStories$ = this.storyService.selectedStories$;
  }

  ngOnDestroy(): void {
    // this.selectedStories$.unsubscribe();
  }

  public getTotalPoints(stories: Story[]): number {
    return stories.reduce((sum, s) => sum + s.points, 0);
  }
}
