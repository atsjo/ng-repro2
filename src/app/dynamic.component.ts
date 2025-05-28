import { afterRenderEffect, Component, input } from '@angular/core';

@Component({
  selector: 'dynamic',
  imports: [],
  templateUrl: './dynamic.component.html',
})
export class DynamicComponent {
  counter = input(0);

  constructor() {
    afterRenderEffect({
      earlyRead: () => {
        console.log('earlyRead');
        return 'from earlyRead';
      },
      write: fromEarlyRead => {
        const counter = this.counter();
        console.log('write', counter, fromEarlyRead());
      }
    });
  }
}
