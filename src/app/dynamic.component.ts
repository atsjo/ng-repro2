import { afterRenderEffect, Component, input, isSignal } from '@angular/core';
import { CounterComponent } from './counter.component';

@Component({
  selector: 'dynamic',
  imports: [CounterComponent],
  templateUrl: './dynamic.component.html',
})
export class DynamicComponent {
  counter = input(0);

  constructor() {
    afterRenderEffect({
      earlyRead: () => 'from earlyRead',
      write: fromEarlyRead => {
        if (!isSignal(fromEarlyRead)) console.warn('Error passing state', fromEarlyRead);
      }
    });
  }
}
