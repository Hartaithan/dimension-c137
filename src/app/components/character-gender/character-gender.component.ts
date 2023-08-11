import { Component, Input } from '@angular/core';
import { Character } from 'graphql/generated';

@Component({
  selector: 'app-character-gender',
  templateUrl: './character-gender.component.html',
})
export class CharacterGenderComponent {
  @Input() gender: Character['gender'] = null;
}
