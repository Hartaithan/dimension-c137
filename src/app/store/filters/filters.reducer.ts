import { createReducer, on } from '@ngrx/store';
import { FiltersState, Gender, Status } from 'src/app/models/filters.model';
import { FiltersActions } from './filters.actions';

export const initialState: FiltersState = {
  search: '',
  status: Status.Default,
  gender: Gender.Default,
};

export const filtersReducer = createReducer(
  initialState,
  on(
    FiltersActions.setSearchFilter,
    (state, { value }): FiltersState => ({ ...state, search: value })
  ),
  on(
    FiltersActions.setStatusFilter,
    (state, { value }): FiltersState => ({ ...state, status: value })
  ),
  on(
    FiltersActions.setGenderFilter,
    (state, { value }): FiltersState => ({ ...state, gender: value })
  ),
  on(FiltersActions.resetFilters, (): FiltersState => initialState)
);
