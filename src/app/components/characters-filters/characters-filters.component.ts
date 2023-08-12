import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { debounceTime, fromEvent, map } from 'rxjs';
import { FiltersActions } from 'src/app/store/filters/filters.actions';

@Component({
  selector: 'app-characters-filters',
  templateUrl: './characters-filters.component.html',
  styleUrls: ['./characters-filters.component.scss'],
})
export class CharactersFiltersComponent implements AfterViewInit {
  @ViewChild('search') search: ElementRef | undefined;

  constructor(private store: Store) {}

  ngAfterViewInit() {
    if (!this.search) return;
    fromEvent(this.search.nativeElement as EventTarget, 'input')
      .pipe(
        map((event: Event) => (event.target as HTMLInputElement).value),
        debounceTime(500)
      )
      .subscribe(value => {
        this.store.dispatch(FiltersActions.setSearchFilter({ value }));
      });
  }
}
