import { Component } from '@angular/core';

@Component({
  styleUrls: [
    './home.component.scss',
  ],
  template: `
    <div class="container text-center">
      <div class="row">
        <div class="col-sm-12 col-md-4 col-md-offset-4 col-lg-4 col-lg-offset-4">
          <h1>Hi</h1>
          <login-button></login-button>
          <a class="btn btn-link" href="https://github.com/join" target="_blank">I don&#8217;t have a Github Account</a>
        </div>
      </div>
    </div>
  `,
})
export class HomeComponent {}
