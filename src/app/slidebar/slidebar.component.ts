import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'slidebar',
  templateUrl: './slidebar.component.html',
  styleUrls: ['./slidebar.component.css']
})
export class SlidebarComponent implements OnInit {
  isSideNavHidden: boolean = false;
  // width = 250;

  constructor() { }

  ngOnInit() {
  }

  openNav(): void {
    this.isSideNavHidden = false;
  }

  closeNav(): void {
    this.isSideNavHidden = true;
  }

  toggleNav(){
    this.isSideNavHidden = !this.isSideNavHidden;
  }

}
