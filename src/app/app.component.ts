import { Component, Injector, signal, ViewChild, ElementRef, effect, OnInit } from '@angular/core';
import { DynamicComponent } from './dynamic.component';
import { createCustomElement } from '@angular/elements';

@Component({
  selector: 'app-root',
  imports: [DynamicComponent],
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  @ViewChild('ref', { static: true }) ref!: ElementRef<HTMLElement>;
  toggle1 = signal(true);
  toggle2 = signal(true);
  constructor(private injector: Injector) {}

  ngOnInit() {
    const ref = this.ref.nativeElement;
    customElements.define('custom-element-dynamic', createCustomElement(DynamicComponent, { injector: this.injector }));
    effect(() => {
      const active = this.toggle2();
      if (active) {
        ref.replaceChildren(document.createElement('custom-element-dynamic'));
      } else {
        ref.replaceChildren();
      }
    }, { injector: this.injector });
  }
}
