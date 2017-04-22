import { Component } from '@angular/core';


@Component({
  template: `
    <div class="row">
      <div class="col-sm-12 col-md-12 col-lg-12 text-center">
        <h1>Page Not Found</h1>
        <a routerLink="/">Home</a>
      </div>
    </div>
  `
})
export class NoContentComponent {}
