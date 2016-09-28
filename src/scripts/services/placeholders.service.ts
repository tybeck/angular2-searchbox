'use strict';

import {
  Injectable
} from '@angular/core';

import {
  Search
} from '../definitions/search';

import {
  NgSearchboxComponent
} from '../components/ng-searchbox.component';

@Injectable()
export class PlaceholdersService {

  private index: number = 0;

  private position: number = 0;

  private val: string = '';

  private timer: any = null;

  private config: Search.Configuration = null;

  constructor (
    private searchbox: NgSearchboxComponent
  ) {

    this
      .setup();

    return this;

  }

  public setup (): PlaceholdersService {

    let config: Search.Configuration = this
      .searchbox
      .ngSearchBoxConfig;

    this.config = config;

    if (this.config && this.config.placeholders) {

      this
        .start(this.index);

    }

    return this;

  }

  public start (index: number): void {

    if(typeof index !== 'undefined') {

      this.index = index;

    } else {

      if(typeof this.index !== 'undefined') {

        this.index = 0;

      } else {

        this.index ++;

      }

    }

    this.position = 0;

    this.val = '';

    this
      .change();

  }

  public change (reverse?: boolean) {

    let self: PlaceholdersService = <PlaceholdersService>this;

    if (reverse) {

      self.timer = setTimeout((): void => {

        self.val = self.val.slice(0, self.val.length - 1);

        self
          .searchbox
          .placeholder = self.val;

        if(self.val.length) {

          self.change(true);

        } else {

          self.position = 0;

          self.index ++;

          if(self.index > (self.config.placeholders.length - 1)) {

            self.index = 0;

          }

          self.change();

        }

      }, self
          .config
          .placeholderSpeedOutInterval || 25);

    } else {

      self.timer = setTimeout((): void => {

        var val = self.config.placeholders[self.index],

          len = val.length;

        self.val += val[self.position];

        self
          .searchbox
          .placeholder = self.val;

        self.position ++;

        if(self.position < len) {

          self.change();

        } else {

          self.timer = setTimeout(function () {

            self.change(true);

          }, self.config.placeholderInterval || 2000);

        }

      }, self.config.placeholderSpeedInInterval || 75);

    }

  }

}