import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  styleUrls: [
    './home.component.scss',
  ],
  template: `
    <div class="container text-center">
      <div class="row">
        <div class="col-sm-6 col-sm-offset-3 col-md-4 col-md-offset-4 col-lg-4 col-lg-offset-4">
          <h1>Hi</h1>
          <login-button></login-button>
          <a class="btn btn-link" href="https://github.com/join" target="_blank">I don&#8217;t have a Github Account</a>
        </div>
      </div>
    </div>
  `,
})
export class HomeComponent implements OnInit {

  constructor (
    private titleService: Title,
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('Welcome to Things to Do');
  }

}
