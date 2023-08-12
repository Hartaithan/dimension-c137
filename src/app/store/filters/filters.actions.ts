import { createAction, props } from '@ngrx/store';
import { Gender, Status } from 'src/app/models/filters.model';

export const setSearch = createAction(
  '[Filters] Set search filter',
  props<{ value: string }>()
);
export const setStatus = createAction(
  '[Filters] Set status filter',
  props<{ value: Status }>()
);
export const setGender = createAction(
  '[Filters] Set gender filter',
  props<{ value: Gender }>()
);
export const reset = createAction('[Filters] Reset filters');
