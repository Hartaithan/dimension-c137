import { createSelector } from '@ngrx/store';
import { FiltersState } from 'src/app/models/filters.model';

export const selectFiltersState = (state: FiltersState) => state;

export const selectSearchFilter = createSelector(
  selectFiltersState,
  (state: FiltersState) => state.search
);

export const selectStatusFilter = createSelector(
  selectFiltersState,
  (state: FiltersState) => state.status
);

export const selectGenderFilter = createSelector(
  selectFiltersState,
  (state: FiltersState) => state.gender
);
