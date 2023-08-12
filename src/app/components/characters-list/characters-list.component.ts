/* eslint-disable @ngrx/no-typed-global-store */
/* eslint-disable @ngrx/no-store-subscription */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Apollo, QueryRef } from 'apollo-angular';
import { Characters, FilterCharacter, Query } from 'graphql/generated';
import { Subscription } from 'rxjs';
import { FiltersState, RootStore } from 'src/app/models/filters.model';
import { GET_CHARACTERS } from 'src/app/queries/characters';
import { selectFilters } from 'src/app/store/filters/filters.selectors';

@Component({
  selector: 'app-characters-list',
  templateUrl: './characters-list.component.html',
  styleUrls: ['./characters-list.component.scss'],
})
export class CharactersListComponent implements OnInit, OnDestroy {
  loading = true;
  fetching = false;
  characters: Characters['results'] = [];
  info: Characters['info'] = null;

  private query: QueryRef<Pick<Query, 'characters'>> | null = null;
  private querySubscription: Subscription | null = null;

  private filtersSubscription: Subscription | null = null;

  constructor(
    private apollo: Apollo,
    private store: Store<RootStore>
  ) {}

  fetchCharacters(filters: FiltersState) {
    this.loading = true;
    const filter: FilterCharacter = {
      name: filters.search,
      gender: filters.gender,
      status: filters.status,
    };
    this.query = this.apollo.watchQuery<Pick<Query, 'characters'>>({
      query: GET_CHARACTERS,
      variables: { filter, page: 1 },
    });
    this.querySubscription = this.query.valueChanges.subscribe(
      ({ data, loading }) => {
        this.loading = loading;
        this.characters = data.characters?.results || [];
        this.info = data.characters?.info || null;
      }
    );
  }

  ngOnInit() {
    this.filtersSubscription = this.store
      .select(selectFilters)
      .subscribe(filters => {
        this.fetchCharacters(filters);
      });
  }

  ngOnDestroy() {
    if (this.querySubscription) {
      this.querySubscription.unsubscribe();
    }
    if (this.filtersSubscription) {
      this.filtersSubscription.unsubscribe();
    }
  }

  fetchMore() {
    if (!this.query) return;
    if (!this.info) return;
    if (!this.info.next) return;
    this.fetching = true;
    this.query
      .fetchMore({
        variables: {
          page: this.info.next,
        },
      })
      .then(({ data }) => {
        const prev = this.characters || [];
        const next = data.characters?.results || [];
        this.characters = [...prev, ...next];
        this.info = data.characters?.info || null;
      })
      .catch(error => console.error('next page error', error))
      .finally(() => {
        this.fetching = false;
      });
  }
}
