import { Injectable } from '@angular/core';

/**
 * Detects the userAgent of the device accessing the application.
 * Poor-man's way of detecting a mobile device.
 *
 * @export
 * @class UserAgentService
 */
@Injectable()
export class UserAgentService {

  public isMobile = false;

  constructor() {
    this.isMobile = navigator.userAgent.match(/(iPad|iPhone|iPod|Android|Mobile)/g) ? true : false;
  }

}
