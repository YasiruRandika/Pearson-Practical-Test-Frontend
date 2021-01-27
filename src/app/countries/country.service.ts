import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, Subject } from "rxjs";
import { environment } from "src/environments/environment";
import { Country } from "./country.model";

const BACKEND_URL = environment.apiUrl;

@Injectable({providedIn:'root'})
export class CountryService {
  private countries : any;
  private countryUpdated = new Subject<{countries : Country[]}>();

  constructor(private http : HttpClient, private router : Router){}

  /*
  Country List update Listner
   */
  getCountryListUpdateListner() {
    return this.countryUpdated.asObservable();
  }

  /*
  This method is for get the country list from backend
  No input parameters
  List of Countries will return
   */
  getCountries() {
    this.http.get<Observable<any>>(BACKEND_URL + "getCountryList")
    .subscribe((recievedList) => {
      console.log("List Recieved");
      console.log(recievedList);
      this.countries = recievedList;
      this.countryUpdated.next({countries : [...this.countries]});
    });
  }

  /*
  Add new country to the database
  Country name and imageUrl will provide as input paramers
  This method is sending these inputs to backend
   */
  addCountry(name : string, capital : string, image : string) {
    let countryData = {name : name, capital : capital, imageUrl : image};

    return this.http.post<Observable<any>>(BACKEND_URL + "addCountry", countryData)
  }

  /*
   * This method will delete a country from the list
   id of the required country should be provided
   */
  deleteCountry(id : string) {
    return this.http.delete(BACKEND_URL + "deleteCountry/" + id);
  }

  /**
   * This method will update a country on database
   * Country name, id and imageUrl should be provided as
   */
  updateCountry(id : string, name : string, capital : string, image : string) {
    let countryData = {id : +id, name : name, capital : capital, imageUrl : image};
    console.log(countryData);

    return this.http.put<Observable<any>>(BACKEND_URL + "updateCountry/" + id, countryData);
  }

  /**
   * Get country by id
   * This will return the country according to the provided id
   */
  getCountry(id : string) {
    return this.http.get<Observable<any>>(BACKEND_URL + "getCountryById/" + id);
  }
}
