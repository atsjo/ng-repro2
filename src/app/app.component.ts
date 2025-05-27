import { Component, Injector, CUSTOM_ELEMENTS_SCHEMA, signal  } from '@angular/core';
import { DynamicComponent } from './dynamic.component';
import { createCustomElement } from '@angular/elements';

@Component({
  selector: 'app-root',
  imports: [DynamicComponent],
  templateUrl: './app.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppComponent {
  toggle1 = signal(true);
  toggle2 = signal(true);
  constructor(injector: Injector) {
    customElements.define('custom-element-dynamic', createCustomElement(DynamicComponent, { injector }));
  }
}
