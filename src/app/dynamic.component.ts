import { afterRenderEffect, Component, signal } from '@angular/core';

@Component({
  selector: 'dynamic',
  imports: [],
  templateUrl: './dynamic.component.html',
})
export class DynamicComponent {
  readonly counter = signal(0);

  constructor() {
    setInterval(() => this.counter.update(o => o + 1), 1000);

    afterRenderEffect({
      earlyRead: () => {
        const val = `earlyRead`;
        console.log(val);
        return val;
      },
      write: fromEarlyRead => {
        const val = `write: ${this.counter()} ${fromEarlyRead()}`;
        console.log(val);
        return val;
      },
      mixedReadWrite: fromWrite => {
        const val = `mixedReadWrite: ${fromWrite()}`;
        console.log(val);
        return val;
      },
      read: fromMixedReadWrite => {
        const val = `read: ${fromMixedReadWrite()}`;
        console.log(val);
      }
    })
  }
}
