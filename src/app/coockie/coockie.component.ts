import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-coockie',
  templateUrl: './coockie.component.html',
  styleUrls: ['./coockie.component.css']
})
export class CoockieComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  hasConsented(){
    return localStorage.getItem("coockie") != null ? localStorage.getItem("coockie") : false;
  }
  consent(){
    localStorage.setItem("coockie","true");
  }
}
