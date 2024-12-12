import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Country} from '../Models/Country';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private http=inject(HttpClient)
  baseUrl:string="http://localhost:7000/api/";
  getAllCountries(){
    return this.http.get<Country[]>(this.baseUrl + 'country/getAll');
  }

  CreateCountry(model:Country){
    return this.http.post(this.baseUrl+'country/create',model);
  }
}
