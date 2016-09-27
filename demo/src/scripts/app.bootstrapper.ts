'use strict';

import {
  platformBrowserDynamic
} from '@angular/platform-browser-dynamic';

import {
  AppModule
} from './app.module';

let bootstrapper: Bootstrapper;

export class Bootstrapper {

  constructor () {

    if (!bootstrapper) {

      bootstrapper = this;

    } else {

      return bootstrapper;

    }

    return this;

  }

  public compile () {

    platformBrowserDynamic()
      .bootstrapModule(
        AppModule
      );

    return this;

  }

}
