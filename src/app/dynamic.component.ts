import { Component, input } from '@angular/core';
import { CounterComponent } from './counter.component';

@Component({
  selector: 'dynamic',
  imports: [CounterComponent],
  templateUrl: './dynamic.component.html',
})
export class DynamicComponent {
  counter = input(0);
}
