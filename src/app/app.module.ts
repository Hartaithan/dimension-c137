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
import { CharactersListComponent } from './components/characters-list/characters-list.component';
import { CharacterItemComponent } from './components/character-item/character-item.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    CharacterPageComponent,
    MainLayoutComponent,
    HeaderComponent,
    CharactersListComponent,
    CharacterItemComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, GraphQLModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
