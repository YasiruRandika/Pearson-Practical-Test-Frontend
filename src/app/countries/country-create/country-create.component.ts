import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Country } from '../country.model';
import { CountryService } from '../country.service';

@Component({
  selector: 'app-country-create',
  templateUrl: './country-create.component.html',
  styleUrls: ['./country-create.component.scss']
})
export class CountryCreateComponent implements OnInit {
  enteredName = '';
  enteredCapital = '';
  buttonName = 'Add Country';
  private mode = 'create';
  isLoading = false;
  imagePreview : string | null = '';
  private countryID : string = '';
  country : Country | any = {id : '', name : '', capital : '', imageUrl : ''};

  FormGroup: FormGroup = this._formBuilder.group({
    'name': new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]}),
    'capital': new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]}),
    'image' : new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]})
  });;

  constructor(private snackBar : MatSnackBar, private _formBuilder: FormBuilder, public route : ActivatedRoute, public countryService : CountryService, private router : Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paraMap: ParamMap) => {
      if(paraMap.has('id')) {
        this.mode = 'edit';
        this.countryID = paraMap.get("id") || '';
        this.isLoading = true;
        this.buttonName = 'Update Country';
        this.countryService.getCountry(this.countryID).subscribe(data => {
          this.country = data;
          this.FormGroup.setValue( {
            'name': this.country.name,
            'capital': this.country.capital,
            'image': this.country.imageUrl
          });
          this.imagePreview = this.country.imageUrl;
        });
        this.isLoading = false;
      } else {
        this.mode = 'create';
      }
    });
  }

  onAddPost() {
    if(this.FormGroup.invalid) {
      return;
    }

    if(this.mode == 'create') {
   this.countryService.addCountry(this.FormGroup.value.name, this.FormGroup.value.capital, this.FormGroup.value.image)
   .subscribe((recievedData) => {
    this.snackBar.open("Country Added Successfully", "OK", {
      duration: 2500,
    });
    this.router.navigate(['/']);
   });
  } else {
    this.countryService.updateCountry(this.countryID, this.FormGroup.value.name, this.FormGroup.value.capital, this.FormGroup.value.image)
    .subscribe((recievedData) => {
      this.snackBar.open("Country Updated Successfully", "OK", {
        duration: 2500,
      });
      this.router.navigate(['/']);
     });;

  }
}

onImagePick() {
  this.imagePreview = this.FormGroup.value.image;
}

}
