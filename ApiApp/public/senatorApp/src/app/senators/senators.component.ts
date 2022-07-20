import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SenatorsDataService } from '../senators-data.service';

export class Senator{
  #_id!:string;
  #title!:string;
  #leadership_title!:string;
  #startdate!:string;
  #enddate!:string;
  #state!:string;
  #party!:string;
  #phone!:string;
  #description!:string;
  #role_type!:string;
  #person:Person;

  constructor(title:string,person:Person){
    this.#title=title;
    this.#person=person;
  }
  get _id(){return this.#_id;}
  get title(){return this.#title;}
  get state(){return this.#state;}
  get party(){return this.#party;}
  get startdate(){return this.#startdate;}
  get enddate(){return this.#enddate;}
  get description(){return this.#description;}
  get role_type(){return this.#role_type;}
  get phone(){return this.#phone;}
  get leadership_title(){ 
    if(this.#leadership_title!=null){ 
      return this.#leadership_title;}
      else{
        return "";
      }
    }
  get person(){return this.#person;}

   toString(){return this.title+"-"+this.#person.firstname+"-"+this.person.lastname+"-"+ this.leadership_title;}
}
export class Person{
 #firstname:string;
 #lastname:string;
 constructor(firstname:string,lastname:string){
  this.#firstname=firstname;
  this.#lastname=lastname;
 }

 get firstname(){return this.#firstname;}
 get lastname(){return this.#lastname;}
}


@Component({
  selector: 'app-senators',
  templateUrl: './senators.component.html',
  styleUrls: ['./senators.component.css']
})
export class SenatorsComponent implements OnInit {

  senators:Senator[]=[];
  constructor(private _senatorService:SenatorsDataService,private _router:Router) { }

  ngOnInit(): void {
    this._senatorService.getSenators().subscribe((senators)=>
    {
      this.senators= senators;
    });
  }
  delete(senatorId:string){
    console.log("in delete",senatorId);
    
    this._senatorService.deleteSenator(senatorId).subscribe((senator)=>
    {
      console.log("deleted senator");
      this._router.navigate([""]);
      
    })
  }

}
