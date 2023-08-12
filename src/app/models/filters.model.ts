export enum Status {
  Default = '',
  Alive = 'alive',
  Dead = 'dead',
  Unknown = 'unknown',
}

export enum Gender {
  Default = '',
  Female = 'female',
  Male = 'male',
  Genderless = 'genderless',
  Unknown = 'unknown',
}

export interface FiltersState {
  search: string;
  status: Status;
  gender: Gender;
}

export interface RootStore {
  filters: FiltersState;
}
