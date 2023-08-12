import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Apollo, QueryRef } from 'apollo-angular';
import { Character, Maybe, Query } from 'graphql/generated';
import { Subscription } from 'rxjs';
import { GET_CHARACTER } from 'src/app/queries/characters';

@Component({
  selector: 'app-character-page',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss'],
})
export class CharacterPageComponent implements OnInit, OnDestroy {
  loading = true;
  character: Maybe<Character> = null;

  private query: QueryRef<Pick<Query, 'character'>> | null = null;
  private querySubscription: Subscription | null = null;

  constructor(
    private route: ActivatedRoute,
    private apollo: Apollo
  ) {}

  fetchCharacter(id: string | null) {
    this.query = this.apollo.watchQuery<Pick<Query, 'character'>>({
      query: GET_CHARACTER,
      variables: { characterId: id },
    });
    this.querySubscription = this.query.valueChanges.subscribe(
      ({ data, loading }) => {
        this.loading = loading;
        this.character = data.character || null;
      }
    );
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.fetchCharacter(id);
  }

  ngOnDestroy() {
    if (this.querySubscription) {
      this.querySubscription.unsubscribe();
    }
  }
}
