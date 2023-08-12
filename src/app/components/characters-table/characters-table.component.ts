import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo, QueryRef } from 'apollo-angular';
import { Character, Characters, Maybe, Query } from 'graphql/generated';
import { Subscription } from 'rxjs';
import { GET_CHARACTERS } from 'src/app/queries/characters';

@Component({
  selector: 'app-characters-table',
  templateUrl: './characters-table.component.html',
  styleUrls: ['./characters-table.component.scss'],
})
export class CharactersTableComponent implements OnInit, OnDestroy {
  loading = true;
  fetching = false;
  characters: Characters['results'] = [];
  info: Characters['info'] = null;
  displayedColumns: string[] = ['id', 'image', 'name', 'gender'];

  private query: QueryRef<Pick<Query, 'characters'>> | null = null;
  private subscription: Subscription | null = null;

  constructor(
    private apollo: Apollo,
    private router: Router
  ) {}

  ngOnInit() {
    this.query = this.apollo.watchQuery<Pick<Query, 'characters'>>({
      query: GET_CHARACTERS,
      variables: { page: 1 },
    });
    this.subscription = this.query.valueChanges.subscribe(
      ({ data, loading }) => {
        this.loading = loading;
        this.characters = data.characters?.results || [];
        this.info = data.characters?.info || null;
      }
    );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
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
