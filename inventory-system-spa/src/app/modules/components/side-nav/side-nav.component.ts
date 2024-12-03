import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-side-nav',
  standalone: false,
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.scss'
})
export class SideNavComponent {
  isExpanded: boolean = true;
  constructor(){
  }

}
