import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { Country } from '../country.model';
import { CountryService } from '../country.service';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.scss']
})
export class CountryListComponent implements OnInit {

  constructor(public countryService : CountryService, private snackBar : MatSnackBar) { }
  countries : Country[] = [];

  private countrySubsciption : Subscription = new Subscription();
  isLoading = false;

  ngOnInit(): void {
    this.isLoading = true;
    this.countryService.getCountries();
    this.countrySubsciption = this.countryService.getCountryListUpdateListner().subscribe((countryData : {countries : Country[]}) => {
      this.countries = countryData.countries;
    });
    this.isLoading = false;
  }

  ngOnDestroy() {
    this.countrySubsciption.unsubscribe();
  }

  onDelete(id : string) {
    this.countryService.deleteCountry(id).subscribe(() => {},
    (error) => {
        this.snackBar.open("Country Deleted Successfully", "OK", {
          duration: 2500,
        });
      this.countryService.getCountries();
    })
  }

}
