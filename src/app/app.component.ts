import { Component, Injector, signal, ViewChild, ElementRef, effect, OnInit, Injectable, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DynamicComponent } from './dynamic.component';
import { createCustomElement } from '@angular/elements';

@Component({
  selector: 'app-root',
  imports: [DynamicComponent],
  templateUrl: './app.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppComponent implements OnInit {
  @ViewChild('ref', { static: true }) ref!: ElementRef<HTMLElement>;
  toggle1 = signal(true);
  toggle2 = signal(true);
  counter = signal(0);
  constructor(private injector: Injector) {
    customElements.define('custom-element-dynamic', createCustomElement(DynamicComponent, { injector }));
    setInterval(() => this.counter.update(o => o + 1), 1000);
  }

  ngOnInit() {
    const ref = this.ref.nativeElement;
    let ctrl: HTMLElement | undefined;
    effect(() => {
      const active = this.toggle2();
      if (active && !ctrl) {
        ref.appendChild(ctrl = document.createElement('custom-element-dynamic'));
      } else if (ctrl) {
        ref.removeChild(ctrl);
        ctrl = undefined;
      }
    }, { injector: this.injector });
    effect(() => {
      const count = this.counter();
      if (ctrl) (ctrl as HTMLElement & { counter: number }).counter = count;
    }, { injector: this.injector });
  }
}
