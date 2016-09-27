'use strict';

import {
  Component,
  ComponentFactoryResolver,
  AfterViewInit,
  Input,
  EventEmitter,
  ChangeDetectorRef
} from '@angular/core';

import {
  NgAdvancedSearchboxAddedFiltersWrapperTemplate
} from '../ng.templates';

import {
  NgAdvancedSearchboxAddedFilter
} from './ng-advanced-searchbox-added-filter';

import {
  Search,
  ModifiedSearch
} from '../definitions/search';

import {
  FilteringService
} from '../services/filtering.service';

@Component({

  'selector': 'ng-advanced-searchbox-added-filters-wrapper',

  'template': NgAdvancedSearchboxAddedFiltersWrapperTemplate,

  'entryComponents': [
    NgAdvancedSearchboxAddedFilter
  ]

})

export class NgAdvancedSearchboxAddedFiltersWrapper implements AfterViewInit {

  @Input('observer') observer: EventEmitter<Search.BindingEventChange> = null;

  public Filtering: FilteringService = null;

  constructor (
    public componentFactoryResolver: ComponentFactoryResolver,
    private changeDetectionRef: ChangeDetectorRef
  ) {

    return this;

  }

  ngAfterViewInit () {

    let self: NgAdvancedSearchboxAddedFiltersWrapper = <NgAdvancedSearchboxAddedFiltersWrapper>this;

    this
      .observer
      .subscribe((change: Search.BindingEventChange): void => {

        switch (change.name) {

          case Search.FilteringServiceChange:

            self
              .Filtering = <FilteringService>change.data;

          break;

        }

        self
          .changeDetectionRef
          .detectChanges();

      });

  }

}