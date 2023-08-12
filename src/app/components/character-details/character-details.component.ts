import { Component, Input } from '@angular/core';
import { Character, Maybe } from 'graphql/generated';

@Component({
  selector: 'app-character-details',
  templateUrl: './character-details.component.html',
  styleUrls: ['./character-details.component.scss'],
})
export class CharacterDetailsComponent {
  @Input() character: Maybe<Character> = null;
}
