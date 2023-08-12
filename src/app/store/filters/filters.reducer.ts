import { createReducer, on } from '@ngrx/store';
import { FiltersState, Gender, Status } from 'src/app/models/filters.model';
import { reset, setGender, setSearch, setStatus } from './filters.actions';

export const initialState: FiltersState = {
  search: '',
  status: Status.Default,
  gender: Gender.Default,
};

export const counterReducer = createReducer(
  initialState,
  on(
    setSearch,
    (state, { value }): FiltersState => ({ ...state, search: value })
  ),
  on(
    setStatus,
    (state, { value }): FiltersState => ({ ...state, status: value })
  ),
  on(
    setGender,
    (state, { value }): FiltersState => ({ ...state, gender: value })
  ),
  on(reset, (): FiltersState => initialState)
);
