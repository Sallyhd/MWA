import { Component, OnInit } from '@angular/core';
import { filter } from 'rxjs';
import { CitiesDataService } from '../cities-data.service';
import { City } from '../cities/cities.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  cityName:string="";
  cities:City[]=[];
  filteredCities:City[]=[];
  constructor(private _cityService:CitiesDataService) { }

  ngOnInit(): void {
  }
  find(){
    console.log("name",this.cityName);
    this._cityService.getCitiesPagin(100).subscribe((cities)=>
    {
      var temp =  cities.filter((city)=>{ city.city.includes(this.cityName);});
      console.log("temp",temp);
      
      this.filteredCities = temp;
      
     // console.log("cities 22",    this.cities.filter((city)=>{  city.city.includes(this.cityName);}));
      //console.log("cities",this.cities);
      
  });
  }
}
