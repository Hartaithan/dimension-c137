import { Component, OnDestroy, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
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
  characters: Characters['results'] = [];

  private querySubscription: Subscription | null = null;

  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.querySubscription = this.apollo
      .watchQuery<Pick<Query, 'characters'>>({
        query: GET_CHARACTERS,
        variables: { page: 1 },
      })
      .valueChanges.subscribe(({ data, loading }) => {
        this.loading = loading;
        this.characters = data.characters?.results || [];
      });
  }

  ngOnDestroy() {
    if (this.querySubscription) {
      this.querySubscription.unsubscribe();
    }
  }
}
