import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { CountryCreateComponent } from "./country-create/country-create.component";
import { CountryListComponent } from "./country-list/country-list.component";
import { HttpClientModule } from "@angular/common/http";
import { AngularMaterialModule } from "../angular-material-module";


@NgModule({
  declarations : [
    CountryListComponent,
    CountryCreateComponent
  ],
  imports : [
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    AngularMaterialModule
  ]
})

export class CountryModule{}
