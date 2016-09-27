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
  NgAdvancedSearchboxComponent
} from './components/ng-advanced-searchbox.component';

import {
  NgAdvancedSearchboxFilteringComponent
} from './components/ng-advanced-searchbox-filtering.component';

import {
  NgAdvancedSearchboxAddedFiltersWrapper
} from './components/ng-advanced-searchbox-added-filters-wrapper.component';

import {
  NgAdvancedSearchboxAddedFilter
} from './components/ng-advanced-searchbox-added-filter';

import {
  NgAdvancedSearchboxFilterSelectors
} from './components/ng-advanced-searchbox-filter-selectors';

@NgModule({

  'imports': [
    CommonModule,
    FormsModule
  ],

  'declarations': [
    NgAdvancedSearchboxComponent,
    NgAdvancedSearchboxFilteringComponent,
    NgAdvancedSearchboxAddedFiltersWrapper,
    NgAdvancedSearchboxAddedFilter,
    NgAdvancedSearchboxFilterSelectors
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
    NgAdvancedSearchboxComponent
  ]

})

export class NgSearchboxModule {

}