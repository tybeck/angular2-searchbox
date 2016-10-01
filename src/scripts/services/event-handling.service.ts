'use strict';

import {
  Injectable,
  EventEmitter
} from '@angular/core';

import {
  ModifiedSearch,
  Search
} from '../definitions/search';

import {
  API
} from './api.service';

@Injectable()
export class EventHandling {

  public emitter: EventEmitter<any>;

  constructor (
    private api: API
  ) {

    return this;

  }

  public init (): EventHandling {

    this
      .emitter = new EventEmitter<any>();

    return this;

  }

  public fire (type: string, data?: any): EventHandling {

    let ev = {

      '$$lastChange': new Date().getTime()

    };

    type = type.toLowerCase();

    this
      .api
      .$$registeredEvents
      .forEach((event: any): void => {

        if (event && event.type) {

          event.type = event
            .type
            .toLowerCase();

          if (event.type === type &&

            typeof event.fn === 'function') {

              event.fn(ev, data);

          }

        }

      });

    return this;

  }

  public onChange (parameters: any): EventHandling {

    this.fire('onChange', parameters);

    return this;

  }

  public onQueryAdded (n: string, o: string): EventHandling {

    if (o === null || typeof o === 'undefined' ||

      (typeof o !== 'undefined' && !o.length)) {

        if (n && n.length) {

          this.fire('onQueryAdded', n);

        }

    }

    return this;

  }

  public onQueryRemoved (n: string, o: string): EventHandling {

    if (o === null || typeof o !== 'undefined' && o && o.length) {

      if (!n || (typeof n === 'string' && !n.length)) {

        this.fire('onQueryRemoved', n);

      }

    }

    return this;

  }

  public onEraser (): EventHandling {

    this
      .fire('onEraser');

    return this;

  }

  public onGarbage (): EventHandling {

    this
      .fire('onGarbage');

    return this;

  }

  public onFilterChanged (filter: ModifiedSearch.ModifiedFilter): EventHandling {

    this
      .fire('onFilterChanged', filter);

    return this;

  }

  public onFilterSelectorChanged (selector: Search.Selector, filter: ModifiedSearch.ModifiedFilter): EventHandling {

    let opts = {

      'selector': selector,

      'filter': filter

    };

    this.fire('onFilterSelectorChanged', opts);

    return this;

  }

  public onOperatorChanged (operator: Search.Operator, filter: ModifiedSearch.ModifiedFilter): EventHandling {

    var opts = {

      'name': operator ? operator.name : '',

      'filter': filter

    };

    this.fire('onOperatorChanged', opts);

    return this;

  }

}