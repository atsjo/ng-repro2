import { Component, signal } from '@angular/core';
import { CounterComponent } from './counter.component';

@Component({
  selector: 'dynamic',
  imports: [CounterComponent],
  templateUrl: './dynamic.component.html',
})
export class DynamicComponent {
  counter = signal(0);
  constructor() {
    setInterval(() => this.counter.update(o => o + 1), 1000);
  }
}
