import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterGenderComponent } from './character-gender.component';

describe('CharacterGenderComponent', () => {
  let component: CharacterGenderComponent;
  let fixture: ComponentFixture<CharacterGenderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CharacterGenderComponent],
    });
    fixture = TestBed.createComponent(CharacterGenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
