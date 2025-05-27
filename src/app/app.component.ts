import { Component } from '@angular/core';
import { DynamicComponent } from './dynamic.component';

@Component({
  selector: 'app-root',
  imports: [DynamicComponent],
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'ng-repro';
}
