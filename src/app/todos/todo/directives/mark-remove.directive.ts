import { Directive, ElementRef, HostListener } from '@angular/core';

/**
 * Class that binds mouse events to a DOM element to mark the parent element
 * for removal
 *
 * @export
 * @class MarkRemovalDirective
 */
@Directive({
  selector: '.action-remove'
})
export class MarkRemovalDirective {

  constructor(
    private elementRef: ElementRef,
  ) {}

  @HostListener('mouseover')
  addClassToParent(): void {
    this.elementRef.nativeElement.parentElement.classList.add('mark-for-removal');
  }

  @HostListener('mouseout')
  removeClassFromParent(): void {
    this.elementRef.nativeElement.parentElement.classList.remove('mark-for-removal');
  }
}
