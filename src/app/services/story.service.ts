import { Injectable } from '@angular/core';
import { BehaviorSubject, take } from 'rxjs';
import { Story } from '../models/story.model';

@Injectable({
  providedIn: 'root',
})
export class StoryService {
  private storiesSubject = new BehaviorSubject<Story[]>([]);
  private selectedStoriesSubject = new BehaviorSubject<Story[]>([]);

  public stories$ = this.storiesSubject.asObservable();
  public selectedStories$ = this.selectedStoriesSubject.asObservable();

  public get currentStories(): Story[] {
    return this.storiesSubject.value;
  }
  
  public addStory(story: Story): void {
    const current = this.storiesSubject.value;
    if (
      !current.some((s) => s.name.toLowerCase() === story.name.toLowerCase())
    ) {
      this.storiesSubject.next([...current, story]);
    }
  }

  public clearStories(): void {
    this.storiesSubject.next([]);
    this.clearSelectedStories();
  }

  public clearSelectedStories(): void {
    this.selectedStoriesSubject.next([]);
  }

  // generateSprint(capacity: number) {
  //   const stories = [...this.storiesSubject.value].sort(
  //     (a, b) => a.points - b.points
  //   );
  //   let total = 0;
  //   const selected: Story[] = [];

  //   for (const story of stories) {
  //     if (total + story.points <= capacity) {
  //       selected.push(story);
  //       total += story.points;
  //     }
  //   }
  //   this.selectedStoriesSubject.next(selected);
  // }

  public generateSprint(capacity: number): void {
    const stories = [...this.storiesSubject.value];

    let bestSet: Story[] = [];
    let bestSum = 0;

    function dfs(index: number, current: Story[], total: number) {
      if (total > capacity) return;

      if (total > bestSum) {
        bestSum = total;
        bestSet = [...current];
      }

      if (index >= stories.length) return;

      // Include current story
      dfs(
        index + 1,
        [...current, stories[index]],
        total + stories[index].points
      );

      // Exclude current story
      dfs(index + 1, current, total);
    }

    dfs(0, [], 0);

    this.selectedStoriesSubject.next(bestSet);
  }
}
