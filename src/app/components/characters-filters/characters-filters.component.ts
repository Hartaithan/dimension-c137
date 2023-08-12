import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { debounceTime, fromEvent, map, Subscription } from 'rxjs';
import { Gender, Status } from 'src/app/models/filters.model';
import { FiltersActions } from 'src/app/store/filters/filters.actions';

@Component({
  selector: 'app-characters-filters',
  templateUrl: './characters-filters.component.html',
  styleUrls: ['./characters-filters.component.scss'],
})
export class CharactersFiltersComponent implements AfterViewInit, OnDestroy {
  @ViewChild('search') search: ElementRef | undefined;
  private subscription: Subscription | undefined;

  constructor(private store: Store) {}

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
