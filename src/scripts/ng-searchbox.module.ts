'use strict';

import {
  NgModule
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  FormsModule
} from '@angular/forms';

import {
  NgSearchboxComponent
} from './components/ng-searchbox.component';

import {
  NgSearchboxFilteringComponent
} from './components/ng-searchbox-filtering.component';

import {
  NgSearchboxAddedFiltersWrapper
} from './components/ng-searchbox-added-filters-wrapper.component';

import {
  NgSearchboxAddedFilter
} from './components/ng-searchbox-added-filter.component';

import {
  NgSearchboxFilterSelectors
} from './components/ng-searchbox-filter-selectors.component';

import {
  NgSearchboxFilterOperators
} from './components/ng-searchbox-filter-operators.component';

@NgModule({

  'imports': [
    CommonModule,
    FormsModule
  ],

  'declarations': [
    NgSearchboxComponent,
    NgSearchboxFilteringComponent,
    NgSearchboxAddedFiltersWrapper,
    NgSearchboxAddedFilter,
    NgSearchboxFilterSelectors,
    NgSearchboxFilterOperators
  ],

  'providers': [
    {

      'provide': Window,

      'useValue': window

    }, {

      'provide': Document,

      'useValue': document

    }
  ],

  'exports': [
    NgSearchboxComponent
  ]

})

export class NgSearchboxModule {

}