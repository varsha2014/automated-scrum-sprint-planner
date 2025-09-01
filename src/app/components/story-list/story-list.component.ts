import { Component } from '@angular/core';
import { StoryService } from '../../services/story.service';
import { Observable } from 'rxjs';
import { Story } from '../../models/story.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-story-list',
  imports: [CommonModule],
  templateUrl: './story-list.component.html',
  styleUrl: './story-list.component.scss',
})
export class StoryListComponent {
  public stories$: Observable<Story[]>;

  constructor(private storyService: StoryService) {
    this.stories$ = this.storyService.stories$;
  }
}
