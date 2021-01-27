import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CountryCreateComponent } from './countries/country-create/country-create.component';
import { CountryListComponent } from './countries/country-list/country-list.component';

const routes: Routes = [
  {path : '', component : CountryListComponent},
  {path : 'addCountry', component : CountryCreateComponent},
  {path : 'updateCountry/:id', component : CountryCreateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
