import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokemonDetailsComponent } from './pages/pokemon-details/pokemon-details.component';
import { PokemonPageResolver } from './services/pokemon-page-resolver/pokemon-page-resolver.service';
import { PokemonListComponent } from './pages/pokemon-list/pokemon-list.component';

const RESOLVERS = [
  PokemonPageResolver
];

const ROUTES: Routes = [
  {
    path: '',
    component: PokemonListComponent,
    resolve: {
      initialPage: PokemonPageResolver
    },
    children: [
      {
        path: ':id',
        component: PokemonDetailsComponent,
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  providers: [
    ...RESOLVERS
  ],
  exports: [RouterModule]
})
export class PokemonRoutingModule {
}
