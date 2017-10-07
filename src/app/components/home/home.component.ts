import { Component, OnInit } from '@angular/core';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  title = `App works !`;
  showHide = false;

  constructor() { }

  ngOnInit() {
  }

  expandTaskBar(){
    this.showHide = !this.showHide;
  }
}
