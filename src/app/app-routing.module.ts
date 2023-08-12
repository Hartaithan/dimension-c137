import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './pages/main/main.component';
import { CharacterPageComponent } from './pages/character/character.component';
import { MainLayoutComponent } from './layouts/main/main.component';
import { CardsPageComponent } from './pages/cards/cards.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: MainLayoutComponent,
    children: [{ path: '', component: MainPageComponent }],
  },
  {
    path: 'cards',
    pathMatch: 'full',
    component: MainLayoutComponent,
    children: [{ path: '', component: CardsPageComponent }],
  },
  {
    path: 'character/:id',
    component: MainLayoutComponent,
    children: [{ path: '', component: CharacterPageComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
