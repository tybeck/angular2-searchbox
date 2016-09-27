'use strict';

export function hasEventErrors (
  evt: string,
  fn: Function,
  emptyFnAllowed: boolean = false) {

  if (typeof evt !== 'string') {

    throw new TypeError('Tyb API - Event Name parameter must be type String!');

  }

  if (typeof fn !== 'function' && !emptyFnAllowed) {

    throw new TypeError('Tyb API - Event Function parameter must be type Function!');

  }

  return this;

}

export function hasInvalidEventType (
  evt: string,
  types: string[]
) {

  let validType: boolean = false;

  types.forEach((type: string): void => {

    type = type.toLowerCase();

    evt = evt.toLowerCase();

    if (type === evt) {

      validType = true;

    }

  });

  if (!validType) {

    throw new ReferenceError('Tyb API - Invalid Event Type Provided!');

  }

  return this;

}