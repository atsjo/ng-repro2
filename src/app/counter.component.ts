import { afterRenderEffect, Component, input } from '@angular/core';

@Component({
  selector: 'counter',
  imports: [],
  templateUrl: './counter.component.html',
})
export class CounterComponent {
  readonly counter = input(0);

  constructor() {
    afterRenderEffect({
      earlyRead: () => {
        const val = `earlyRead`;
        console.log(val);
        return val;
      },
      write: fromEarlyRead => {
        const val = `write: ${this.counter()} ${fromEarlyRead()}`;
        console.log(val);
      }
    })
  }
}
