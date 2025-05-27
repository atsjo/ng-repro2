import { Component, Injector, signal, ViewChild, ElementRef, effect, OnInit, Injectable } from '@angular/core';
import { DynamicComponent } from './dynamic.component';
import { createCustomElement } from '@angular/elements';

@Injectable()
export class VM {
  constructor(injector: Injector) {
    customElements.define('custom-element-dynamic', createCustomElement(DynamicComponent, { injector }));
  }
}


@Component({
  selector: 'app-root',
  imports: [DynamicComponent],
  providers: [VM],
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  @ViewChild('ref', { static: true }) ref!: ElementRef<HTMLElement>;
  toggle1 = signal(true);
  toggle2 = signal(true);
  counter = signal(0);
  constructor(private injector: Injector, private vm: VM) {
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
