import { Component, Input } from '@angular/core';
import { Episode, Maybe } from 'graphql/generated';

@Component({
  selector: 'app-character-episode',
  templateUrl: './character-episode.component.html',
  styleUrls: ['./character-episode.component.scss'],
})
export class CharacterEpisodeComponent {
  @Input() episode: Maybe<Episode> = null;
}
