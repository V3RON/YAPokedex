import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonDetailsComponent } from './pages/pokemon-details/pokemon-details.component';
import { PokemonDetailsModalComponent } from './components/pokemon-details-modal/pokemon-details-modal.component';
import {
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatSnackBarModule
} from '@angular/material';
import { SearchFormComponent } from './components/pokemon-search-form/pokemon-search-form.component';
import { PokemonListComponent } from './pages/pokemon-list/pokemon-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { PokemonRoutingModule } from './pokemon-routing.module';
import { PokemonStatsViewComponent } from './components/pokemon-stats-view/pokemon-stats-view.component';

const MATERIAL_COMPONENTS = [
  MatFormFieldModule,
  MatInputModule,
  MatCardModule,
  MatDialogModule,
  MatIconModule,
  MatButtonModule,
  MatGridListModule,
  MatSnackBarModule
];

const COMPONENTS = [
  PokemonDetailsComponent,
  SearchFormComponent,
  PokemonListComponent
];

const MODALS = [
  PokemonDetailsModalComponent
];

@NgModule({
  declarations: [
    ...COMPONENTS,
    ...MODALS,
    PokemonStatsViewComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PokemonRoutingModule,
    SharedModule,

    ...MATERIAL_COMPONENTS
  ],
  entryComponents: [
    ...MODALS
  ]
})
export class PokemonModule {
}
