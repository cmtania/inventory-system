import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-layout',
  standalone: false,
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  isExpanded: boolean = false;
  constructor(
    private readonly _router: Router,
  ){}

  logout() {
    this._router.navigate(['/login']);
  }
}
