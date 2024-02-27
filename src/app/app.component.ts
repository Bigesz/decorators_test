import { Component, Injector } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSidenav, MatSidenavContainer, MatSidenavContent } from '@angular/material/sidenav';
import { NavComponent } from './components/nav/nav.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatSidenav, MatSidenavContent, MatSidenavContainer, NavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  static INJECTOR: Injector;

  constructor(injector: Injector) {
    AppComponent.INJECTOR = injector;
  }
}
