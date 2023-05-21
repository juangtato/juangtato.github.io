import { Component } from '@angular/core';

@Component({
  selector: 'app-sidenav-layout',
  templateUrl: './sidenav-layout.component.html',
  styleUrls: ['./sidenav-layout.component.scss']
})
export class SidenavLayoutComponent {
  sideOpened: boolean = true;

  constructor() {

  }
}
