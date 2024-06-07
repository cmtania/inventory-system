import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SidebarNavService {
    readonly sidenavMinWidth = 250;
  readonly sidenavMaxWidth = window.innerWidth - 300;

  get sidenavWidth(): number {
    return parseInt(
      getComputedStyle(document.body).getPropertyValue('--sidenav-width'),
      10
    );
  }

  setSidenavWidth(width: number) {
    const clampedWidth = Math.min(
      Math.max(width, this.sidenavMinWidth),
      this.sidenavMaxWidth
    );

    document.body.style.setProperty('--sidenav-width', `${clampedWidth}px`);
  }
}