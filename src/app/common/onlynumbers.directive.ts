import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appOnlynumbers]'
})
export class OnlynumbersDirective {

  @Input() noOfDigit: number = 100;

  private regex: RegExp = new RegExp(/[^0-9]*/g);
  private specialKeys: Array<string> = ['Tab', 'End', 'Home', 'ArrowLeft', 'ArrowRight', 'Del', 'Backspace', 'Delete'];

  constructor(
    private eleRef: ElementRef
  ) { }

  @HostListener('keydown', ['$event'])
  public onKeyDown = (event: KeyboardEvent): void => {
    if (this.specialKeys.indexOf(event.key) !== -1) {
      return;
    }

    const current: string = this.eleRef.nativeElement.value;
    const position = this.eleRef.nativeElement.selectionStart;
    const next: string = [
      current.slice(0, position),
      event.key
    ].join('');
    if (next.length > this.noOfDigit) {
      event.preventDefault();
      return;
    }
    this.eleRef.nativeElement.value = next.replace(this.regex, '');
    if (this.eleRef.nativeElement.value !== next) {
      event.preventDefault();
      return;
    }

    this.eleRef.nativeElement.value = current.replace(this.regex, '');
  }

}
