'use strict';

import {
  Injectable
} from '@angular/core';

import {
  Search
} from '../definitions/search';

import * as helpers from '../utils/api.utils.';

@Injectable()
export class API {

  public $$registeredEvents: Search.RegisteredEvent[] = <Search.RegisteredEvent[]>[];

  public $$allowedEvents: string[] = <string[]>[
    'onChange',
    'onQueryAdded',
    'onQueryRemoved',
    'onQueryChanged',
    'onFilterAdded',
    'onFilterRemoved',
    'onFilterChanged',
    'onOperatorChanged',
    'onFilterSelectorChanged',
    'onEraser',
    'onGarbage',
    'onEnteredEditMode',
    'onLeavedEditMode'
  ];

  constructor () {

    return this;

  }

  public on (type: string, fn: Function): API {

    let self: API = <API>this,

      isRegisteredAlready: boolean = false;

    helpers
      .hasEventErrors(type, fn)
      .hasInvalidEventType(type, this.$$allowedEvents);

    this
      .$$registeredEvents
      .forEach((event: any): void => {

        if (event && event.fn === fn &&

          event.type === type) {

            isRegisteredAlready = true;

        }

      });

    if (!isRegisteredAlready) {

      self.$$registeredEvents.push({

        'type': type,

        'fn': fn

      });

    }

    return this;

  }

  public off (type: string, fn: Function): API {

    var self: API = <API>this,

      isFnEmpty: boolean = false;

    helpers
      .hasEventErrors(type, fn, true)
      .hasInvalidEventType(type, self.$$allowedEvents);

    if (typeof fn !== 'function') {

      isFnEmpty = true;

    }

    self
      .$$registeredEvents
      .slice()
      .reverse()
      .forEach((
        addedEvent: Search.RegisteredEvent,
        addedIndex: number,
        addedObject: any): void => {

        if ((addedEvent && addedEvent.fn === fn && addedEvent.type === type) ||

          (isFnEmpty && addedEvent && addedEvent.type === type)) {

            self.$$registeredEvents
              .splice(addedObject.length - 1 - addedIndex, 1);

        }

      });

    return this;

  }

  public offAll (): API {

    let self: API = <API>this;

    self
      .$$registeredEvents
      .slice()
      .reverse()
      .forEach((
        addedEvent: Search.RegisteredEvent,
        addedIndex: number,
        addedObject: any): void => {

          self.$$registeredEvents
            .splice(addedObject.length - 1 - addedIndex, 1);

      });

    return this;

  }

}