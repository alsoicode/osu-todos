import { Directive, ElementRef, HostListener } from '@angular/core';

/**
 * Class that binds mouse events to a DOM element to mark the parent element
 * for completion
 *
 * @export
 * @class MarkDonelDirective
 */
@Directive({
  selector: '.action-done'
})
export class MarkCompleteDirective {

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
