import {Component, inject, OnInit, ViewChild} from '@angular/core';
import {Country} from '../../Models/Country';
import {CountryService} from '../../services/country.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-admin-country-overview',
  templateUrl: './admin-country-overview.component.html',
  styleUrl: './admin-country-overview.component.css'
})
export class AdminCountryOverviewComponent implements OnInit {
  ngOnInit(): void {
      this.coutryService.getAllCountries().subscribe(countries => this.countries = countries);
  }
  coutryService=inject(CountryService);
  countries: Country[]=[];
  conutry?:Country;
  @ViewChild('countryForm') countryForm?:NgForm;

  CreateCountry() {
    this.coutryService.CreateCountry(this.countryForm?.value).subscribe({
      next:_=>window.location.reload(),
      error:err=>console.log(err),
    })
  }
  removeCountry($event:any){
    console.log($event.target.value);

    if(window.confirm("Are you sure you want to remove this country ?")){
        this.coutryService.RemoveCountry($event.target.value).subscribe({
          next:_=>window.location.reload(),
          error:err=>console.log(err),
        })
    }
    else
      return;
  }

}
