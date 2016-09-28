'use strict';

import {
  Injectable
} from '@angular/core';

@Injectable()
export class MemoryService {

  public hash: string = 'ng2-searchbox';

  public storage: Storage = null;

  constructor (
    private window: Window
  ) {

    this.storage = window.localStorage;

    return this;

  }

  public getAndSet (key: string, value?: string): void {

    if (!this
        .storage
        .getItem(this.hash)
    ) {

      this
        .storage
        .setItem(this.hash, '{}');

    }

    let store = this
      .storage
      .getItem(this.hash);

    if (store) {

      store = JSON.parse(store);

      if (typeof value === 'undefined') {

        return store[key];

      } else {

        store[key] = value;

        this
          .storage
          .setItem(
            this.hash,
            JSON.stringify(store)
          );

      }

    }

  }

  public getAll (): any {

    let data: any = JSON.parse(
      this
        .storage
        .getItem(
          this.hash
        )
    );

    if (data) {

      delete data.cache;

      return data;

    }

    return {};

  }

  public removeAll (): any {

    let cache = this.getAndSet('cache'),

      obj: any = {};

    if (cache !== null) {

      obj.cache = cache;

    }

    this
      .storage
      .setItem(
        this.hash,
        JSON.stringify(obj)
      );

  }

}