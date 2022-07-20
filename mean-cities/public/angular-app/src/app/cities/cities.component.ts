import { Component, OnInit } from '@angular/core';
import { CitiesDataService } from '../cities-data.service';

export class City {
  #_id!: String;
  #city!: String;
  #zip!: String;
  #loc!: {
    x: Number,
    y: Number
  };
  #pop!: Number;
  #state!: String;

  get _id() {return this.#_id};
  get city() {return this.#city;}
  get zip() {return this.#zip;}
  get x() {return this.#loc.x;}
  get y() {return this.#loc.y;}
  get pop() {return this.#pop;}
  get state() {return this.#state;}
  
  set _id(_id) {this.#_id= _id;}
  set city(city) {this.#city= city;}
  set zip(zip) {this.#zip= zip;}
  set x(x) {this.#loc.x= x;}
  set y(y) {this.#loc.y= y;}
  set loc(loc:{x: Number,y: Number}) {this.#loc= loc;}
  set pop(pop) {this.#pop= pop;}
  set state(state) {this.#state= state;}
  
  constructor() {
    this.loc= {x: 0, y: 0};
  }
}

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.css']
})
export class CitiesComponent implements OnInit {

  countPage:number=0;
  cities!: City[];
  totalCitiesCount:number=0;
  nextBtnDisabled:boolean=false;
  prevBtnDisabled:boolean=true;
  constructor(private cityService:CitiesDataService) { }

  ngOnInit(): void {
    this.cityService.getCities().subscribe({
      next: (cities)=> {this.fillCities(cities); this.totalCitiesCount=cities.length;},
      error: (error)=>{this.cities= []; console.log(error);
      },
    });
  }

  private fillCities(cities: City[]) {
    this.cities= cities;
  }

  Prev(){
    this.countPage--;
    this.cityService.getCitiesPagin(this.countPage).subscribe((cities)=>{
      if(!cities){
        this.nextBtnDisabled=false;
        this.prevBtnDisabled=true;
        
      }
      else{
        this.cities=cities;

        this.nextBtnDisabled=false;
        this.prevBtnDisabled=false;
        if(this.countPage==0){
        this.prevBtnDisabled=true;
      }

      }
    });
  }
  
  next(){
    console.log("nest pressed");
    
    this.countPage++;
    console.log("count",this.countPage);
    
    this.cityService.getCitiesPagin(this.countPage*5).subscribe((cities)=>{
      if(!cities){
        console.log("next",this.nextBtnDisabled);
        console.log("prev",this.prevBtnDisabled);
        
        this.nextBtnDisabled=true;
        this.prevBtnDisabled=false;
      }
      else{
        console.log("cities",cities);
        this.cities=cities;
        this.nextBtnDisabled=false;
        if(this.countPage >= this.totalCitiesCount/5){
        this.nextBtnDisabled=true;
      }
        this.prevBtnDisabled=false;
      }
    });

  }

}
