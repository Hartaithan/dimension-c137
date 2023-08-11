import { Component, OnDestroy, OnInit } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import { Characters, Query } from 'graphql/generated';
import { Subscription } from 'rxjs';
import { GET_CHARACTERS } from 'src/app/queries/characters';

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
  private subscription: Subscription | null = null;

  constructor(private apollo: Apollo) {}

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
      .catch(error => console.log('next page error', error))
      .finally(() => {
        this.fetching = false;
      });
  }
}
