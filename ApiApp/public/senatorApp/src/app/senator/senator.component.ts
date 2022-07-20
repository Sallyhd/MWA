import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SenatorsDataService } from '../senators-data.service';
import { Person, Senator } from '../senators/senators.component';

@Component({
  selector: 'app-senator',
  templateUrl: './senator.component.html',
  styleUrls: ['./senator.component.css']
})
export class SenatorComponent implements OnInit {

  senator:Senator=new Senator("",new Person("",""));

  constructor(private _senatorService:SenatorsDataService,private _router:ActivatedRoute) { }

  ngOnInit(): void {
    const senatorId = this._router.snapshot.params["senatorId"];
    this._senatorService.getSenator(senatorId).subscribe((senator)=>{
      this.senator=senator;
    })
  }

}
