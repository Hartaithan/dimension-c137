import { Component, Input } from '@angular/core';
import { Character, Maybe } from 'graphql/generated';

@Component({
  selector: 'app-character-item',
  templateUrl: './character-item.component.html',
  styleUrls: ['./character-item.component.scss'],
})
export class CharacterItemComponent {
  @Input() character: Maybe<Character> = null;
}
