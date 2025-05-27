import { Component, Injector, CUSTOM_ELEMENTS_SCHEMA, signal, ViewChild, ElementRef, effect } from '@angular/core';
import { DynamicComponent } from './dynamic.component';
import { createCustomElement } from '@angular/elements';

@Component({
  selector: 'app-root',
  imports: [DynamicComponent],
  templateUrl: './app.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppComponent {
  @ViewChild('ref', { static: true }) ref!: ElementRef<HTMLElement>;
  toggle1 = signal(false);
  toggle2 = signal(false);
  toggle3 = signal(false);
  constructor(injector: Injector) {
    customElements.define('custom-element-dynamic', createCustomElement(DynamicComponent, { injector }));
    effect(() => {
      const active = this.toggle3();
      if (active) {
        const el = document.createElement('custom-element-dynamic');
        this.ref.nativeElement.appendChild(el);
      } else {
        this.ref.nativeElement.replaceChildren();
      }
    });
  }
}
