import {Component, inject, OnInit, ViewChild} from '@angular/core';
import {CityService} from '../../services/city.service';
import {City} from '../../Models/City';
import {Country} from '../../Models/Country';
import {CountryService} from '../../services/country.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-admin-city-overview',
  templateUrl: './admin-city-overview.component.html',
  styleUrl: './admin-city-overview.component.css'
})
export class AdminCityOverviewComponent implements OnInit {
  ngOnInit(): void {
      this.cityService.GetAllCities().subscribe(res=>{
        this.cities=res;
      })
      this.countryService.getAllCountries().subscribe(res=>{
        this.countries=res;
      })
  }
  cityService=inject(CityService);
  countryService=inject(CountryService);
  cities:City[]=[];
  countries:Country[]=[];
  city?:City;
  @ViewChild('cityForm') cityForm?:NgForm;

  CreateCity() {
      console.log(this.cityForm?.value);
      this.cityService.AddCity(this.cityForm?.value).subscribe({
        next: _ => {window.location.reload();},
        error:err=>console.log(err),
      })
  }

  removeCity($event:any){
    if(window.confirm('Are you sure you want to remove this city?')){
      this.cityService.RemoveCity($event.target.value).subscribe({
        next: _ => {window.location.reload();},
        error:err=>console.log(err),
      })
    }
  }
}
