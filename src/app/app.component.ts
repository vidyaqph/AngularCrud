import { Component } from '@angular/core';
import {
  Router,
  NavigationStart,
  NavigationEnd,
  Event,
  NavigationCancel,
  NavigationError
} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // title = 'app';
  showLoadingIndicator = true;
  constructor(private _router: Router) {
    // subscribe to navigation events so that it can be tracked and navigator indicator can be shown during navigation start and end.
    _router.events.subscribe((routerEvent: Event) => {
      if (routerEvent instanceof NavigationStart) {
        this.showLoadingIndicator = true;
      }
      if (routerEvent instanceof NavigationEnd) {
        this.showLoadingIndicator = false;
      }
      if (
        routerEvent instanceof NavigationCancel ||
        routerEvent instanceof NavigationError
      ) {
        this.showLoadingIndicator = false;
      }
    });
  }
}
