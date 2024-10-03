import {
  Directive,
  Input,
  OnChanges,
  SimpleChanges,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

@Directive({
  selector: '[appRepeat]',
})
export class RepeatDirective implements OnChanges {
  @Input()
  appRepeat: number = 1;

  constructor(
    private viewContainer: ViewContainerRef,
    private template: TemplateRef<HTMLElement>
  ) {
    this.repeat();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['appRepeat']) {
      this.repeat();
    }
  }

  repeat(): void {
    this.viewContainer.clear();
    for (let i = 0; i < this.appRepeat; i++) {
      this.viewContainer.createEmbeddedView(this.template);
    }
  }
}
