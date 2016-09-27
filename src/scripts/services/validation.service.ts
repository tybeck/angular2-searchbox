'use strict';

import {
  Injectable
} from '@angular/core';

import {
  ModifiedSearch
} from '../definitions/search';

@Injectable()
export class ValidationService {

  public has (filter: ModifiedSearch.ModifiedFilter): boolean {

    return (filter && filter.validation) ? true : false;

  }

}