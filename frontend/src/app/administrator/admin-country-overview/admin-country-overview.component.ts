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
      this.countryService.getAllCountries().subscribe(countries => this.countries = countries);
  }
  countryService=inject(CountryService);
  countries: Country[]=[];
  country:any;
  editMode:boolean=false;
  @ViewChild('countryForm') countryForm?:NgForm;

  CreateCountry() {
    this.countryService.CreateCountry(this.countryForm?.value).subscribe({
      next:_=>window.location.reload(),
      error:err=>console.log(err),
    })
  }
  removeCountry($event:any){
    console.log($event.target.value);

    if(window.confirm("Are you sure you want to remove this country ?")){
        this.countryService.RemoveCountry($event.target.value).subscribe({
          next:_=>window.location.reload(),
          error:err=>console.log(err),
        })
    }
    else
      return;
  }

  LoadCountry($event: any) {
    console.log(this.countries[$event.target.value]);
    this.country=this.countries[$event.target.value];
    this.editMode=true;

  }
  EditCountry() {
    console.log("Jel radi");
    console.log(this.countryForm?.value);
    this.countryService.UpdateCountry(this.countryForm?.value,this.country.id).subscribe({
      next:_=>{
        window.location.reload();
        this.editMode=false; },
      error:err=>console.log(err)
    })
  }

}
