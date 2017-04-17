import { Directive, ElementRef, HostListener } from '@angular/core';

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
