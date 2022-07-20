import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Senator } from './senators/senators.component';

@Injectable({
  providedIn: 'root'
})
export class SenatorsDataService {

  _baseUrl = "http://localhost:3000/api";
  constructor(private _http:HttpClient) { }

  getSenators():Observable<Senator[]>{
    const url=this._baseUrl+"/senators";
    return this._http.get<Senator[]>(url);
  }
  getSenator(senatorId:string):Observable<Senator>{
    //const senatorId=this._activatedRouter.snapshot.params["senatorId"];
    const url=this._baseUrl+"/senators/"+senatorId;
    return this._http.get<Senator>(url);
  }

  deleteSenator(senatorId:string):Observable<Senator>{
    //const senatorId=this._activatedRouter.snapshot.params["senatorId"];
    const url=this._baseUrl+"/senators/"+senatorId;
    return this._http.delete<Senator>(url);
  }

}
