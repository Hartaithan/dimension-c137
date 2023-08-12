import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './pages/main/main.component';
import { CharacterPageComponent } from './pages/character/character.component';
import { MainLayoutComponent } from './layouts/main/main.component';
import { HeaderComponent } from './components/header/header.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { CharacterItemComponent } from './components/character-item/character-item.component';
import { CharacterGenderComponent } from './components/character-gender/character-gender.component';
import { CharactersListComponent } from './components/characters-list/characters-list.component';
import { CharactersFiltersComponent } from './components/characters-filters/characters-filters.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { StoreModule } from '@ngrx/store';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    CharacterPageComponent,
    MainLayoutComponent,
    HeaderComponent,
    CharacterItemComponent,
    CharacterGenderComponent,
    CharactersListComponent,
    CharactersFiltersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GraphQLModule,
    HttpClientModule,
    NgxSkeletonLoaderModule.forRoot({
      animation: 'pulse',
      loadingText: 'Loading...',
      theme: {
        background: '#2a2a2a',
        height: '100px',
        borderRadius: '8px',
      },
    }),
    InfiniteScrollModule,
    StoreModule.forRoot({}, {}),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
