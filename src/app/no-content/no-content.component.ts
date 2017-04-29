import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';


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
export class NoContentComponent implements OnInit {

  constructor (
    private titleService: Title,
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('Oops - Page Not Found');
  }

}
