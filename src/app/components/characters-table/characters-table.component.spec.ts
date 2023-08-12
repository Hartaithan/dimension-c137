import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharactersTableComponent } from './characters-table.component';

describe('CharactersTableComponent', () => {
  let component: CharactersTableComponent;
  let fixture: ComponentFixture<CharactersTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CharactersTableComponent],
    });
    fixture = TestBed.createComponent(CharactersTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
