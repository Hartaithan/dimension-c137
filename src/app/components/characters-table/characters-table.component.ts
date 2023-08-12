/* eslint-disable @ngrx/no-typed-global-store */
/* eslint-disable @ngrx/no-store-subscription */
import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { Apollo, QueryRef } from 'apollo-angular';
import {
  Character,
  Characters,
  FilterCharacter,
  Maybe,
  Query,
} from 'graphql/generated';
import { Subscription } from 'rxjs';
import { GET_CHARACTERS } from 'src/app/queries/characters';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { selectFilters } from 'src/app/store/filters/filters.selectors';
import { FiltersState, RootStore } from 'src/app/models/filters.model';

@Component({
  selector: 'app-characters-table',
  templateUrl: './characters-table.component.html',
  styleUrls: ['./characters-table.component.scss'],
})
export class CharactersTableComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  loading = true;
  fetching = false;
  characters: Characters['results'] = [];
  info: Characters['info'] = null;
  displayedColumns: string[] = ['id', 'image', 'name', 'gender'];
  dataSource = new MatTableDataSource(this.characters ?? []);

  @ViewChild(MatSort) sort: MatSort = new MatSort();

  private query: QueryRef<Pick<Query, 'characters'>> | null = null;
  private querySubscription: Subscription | null = null;

  private filtersSubscription: Subscription | null = null;

  constructor(
    private apollo: Apollo,
    private router: Router,
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
        this.dataSource.data = this.characters;
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

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy() {
    if (this.querySubscription) {
      this.querySubscription.unsubscribe();
    }
    if (this.filtersSubscription) {
      this.filtersSubscription.unsubscribe();
    }
  }

  goToCharacter(row: Maybe<Maybe<Character>>) {
    if (!row || !row.id) return;
    this.router.navigate(['/character', row.id]);
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
        this.dataSource.data = this.characters;
        this.info = data.characters?.info || null;
      })
      .catch(error => console.error('next page error', error))
      .finally(() => {
        this.fetching = false;
      });
  }

  isIntersecting(status: boolean) {
    if (status) {
      this.fetchMore();
    }
  }
}
