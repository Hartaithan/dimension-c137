import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { debounceTime, fromEvent, map, Observable, Subscription } from 'rxjs';
import { Gender, Status } from 'src/app/models/filters.model';
import { FiltersActions } from 'src/app/store/filters/filters.actions';
import {
  selectGenderFilter,
  selectSearchFilter,
  selectStatusFilter,
} from 'src/app/store/filters/filters.selectors';

@Component({
  selector: 'app-characters-filters',
  templateUrl: './characters-filters.component.html',
  styleUrls: ['./characters-filters.component.scss'],
})
export class CharactersFiltersComponent implements AfterViewInit, OnDestroy {
  @ViewChild('search') search: ElementRef | undefined;
  private subscription: Subscription | undefined;
  name: Observable<string> | undefined;
  status: Observable<string> | undefined;
  gender: Observable<string> | undefined;

  constructor(private store: Store) {
    this.name = store.select(selectSearchFilter);
    this.status = store.select(selectStatusFilter);
    this.gender = store.select(selectGenderFilter);
  }

  ngAfterViewInit() {
    if (!this.search) return;
    this.subscription = fromEvent(
      this.search.nativeElement as EventTarget,
      'input'
    )
      .pipe(
        map((event: Event) => (event.target as HTMLInputElement).value),
        debounceTime(500)
      )
      .subscribe(value => {
        this.store.dispatch(FiltersActions.setSearchFilter({ value }));
      });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onStatusChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const value = target.value as Status;
    this.store.dispatch(FiltersActions.setStatusFilter({ value }));
  }

  onGenderChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const value = target.value as Gender;
    this.store.dispatch(FiltersActions.setGenderFilter({ value }));
  }
}
