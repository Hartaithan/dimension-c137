import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Gender, Status } from 'src/app/models/filters.model';

export const FiltersActions = createActionGroup({
  source: 'Filters',
  events: {
    'Set search filter': props<{ value: string }>(),
    'Set status filter': props<{ value: Status }>(),
    'Set gender filter': props<{ value: Gender }>(),
    'Reset filters': emptyProps(),
  },
});
