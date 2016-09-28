'use strict';

import {
  Component,
  ComponentFactoryResolver,
  AfterViewInit,
  Input,
  EventEmitter,
  ChangeDetectorRef,
  ViewChild,
  ViewContainerRef
} from '@angular/core';

import {
  NgSearchboxAddedFiltersWrapperTemplate
} from '../ng.templates';

import {
  NgSearchboxAddedFilter
} from './ng-searchbox-added-filter';

import {
  Search,
  ModifiedSearch
} from '../definitions/search';

import {
  FilteringService
} from '../services/filtering.service';

@Component({

  'selector': 'ng-searchbox-added-filters-wrapper',

  'template': NgSearchboxAddedFiltersWrapperTemplate,

  'entryComponents': [
    NgSearchboxAddedFilter
  ]

})

export class NgSearchboxAddedFiltersWrapper implements AfterViewInit {

  @ViewChild('ngSearchboxAddedFilters', { 'read': ViewContainerRef })

    public ngSearchboxAddedFiltersViewContainer: ViewContainerRef;

  @ViewChild('ngSearchboxAddedFilters')

    public ngSearchboxAddedFilters: NgSearchboxAddedFiltersWrapper;

  @Input('observer') observer: EventEmitter<Search.BindingEventChange> = null;

  public Filtering: FilteringService = null;

  constructor (
    public componentFactoryResolver: ComponentFactoryResolver,
    private changeDetectionRef: ChangeDetectorRef
  ) {

    return this;

  }

  ngAfterViewInit () {

    let self: NgSearchboxAddedFiltersWrapper = <NgSearchboxAddedFiltersWrapper>this;

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