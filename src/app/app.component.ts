import { Component, Injector, signal, ElementRef, effect, afterNextRender } from '@angular/core';
import { DynamicComponent } from './dynamic.component';
import { createCustomElement } from '@angular/elements';

@Component({
  selector: 'app-root',
  imports: [],
  template: '',
})
export class AppComponent {
  toggle1 = signal(true);
  toggle2 = signal(true);
  counter = signal(0);
  constructor(injector: Injector, host: ElementRef<HTMLElement>) {
    customElements.define('ce-dynamic', createCustomElement(DynamicComponent, { injector }));
    setInterval(() => this.counter.update(o => o + 1), 1000);
    const ctrl = document.createElement('ce-dynamic') as HTMLElement & { counter: number };
    afterNextRender({ write: () => host.nativeElement.appendChild(ctrl) });
    effect(() => ctrl.counter = this.counter());
  }
}
