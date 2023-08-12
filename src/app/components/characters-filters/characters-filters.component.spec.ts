import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharactersFiltersComponent } from './characters-filters.component';

describe('CharactersFiltersComponent', () => {
  let component: CharactersFiltersComponent;
  let fixture: ComponentFixture<CharactersFiltersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CharactersFiltersComponent],
    });
    fixture = TestBed.createComponent(CharactersFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
