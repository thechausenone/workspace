import { Component, OnInit } from '@angular/core';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  showHide = false;

  constructor() { }

  ngOnInit() {
  }

  expandTaskBar(){
    this.showHide = !this.showHide;
    
  }
}
