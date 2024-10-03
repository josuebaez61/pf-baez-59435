import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Directive({
  selector: '[appHighlight]',
})
export class HighlightDirective implements OnChanges {
  @Input()
  color = 'yellow';

  constructor(private el: ElementRef<HTMLElement>) {
    this.applyStyles();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['color']) {
      this.applyStyles();
    }
  }

  applyStyles(): void {
    this.el.nativeElement.style.backgroundColor = this.color;
  }
}
