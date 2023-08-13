import { createSelector } from '@ngrx/store';
import { FiltersState, RootStore } from 'src/app/models/filters.model';

export const selectFilters = (store: object) => (store as RootStore).filters;

export const selectSearchFilter = createSelector(
  selectFilters,
  (state: FiltersState) => state.search
);

export const selectStatusFilter = createSelector(
  selectFilters,
  state => state.status
);

export const selectGenderFilter = createSelector(
  selectFilters,
  state => state.gender
);
