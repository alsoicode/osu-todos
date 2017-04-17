import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '.action-done'
})
export class MarkDoneDirective {

  constructor(
    private elementRef: ElementRef,
  ) {}

  @HostListener('mouseover')
  addClassToParent(): void {
    this.elementRef.nativeElement.parentElement.classList.add('mark-for-completion');
  }

  @HostListener('mouseout')
  removeClassFromParent(): void {
    this.elementRef.nativeElement.parentElement.classList.remove('mark-for-completion');
  }
}
