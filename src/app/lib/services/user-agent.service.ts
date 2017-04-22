import { Injectable } from '@angular/core';

@Injectable()
export class UserAgentService {

  public isMobile = false;

  constructor() {
    this.isMobile = navigator.userAgent.match(/(iPad|iPhone|iPod|Android|Mobile)/g) ? true : false;
  }

}
