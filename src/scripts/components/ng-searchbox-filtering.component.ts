'use strict';

import {
  Component,
  Input,
  EventEmitter,
  AfterViewInit,
  ChangeDetectorRef
} from '@angular/core';

import {
  NgSearchboxFilteringTemplate
} from '../ng.templates';

import {
  NgSearchboxFilteringStyle
} from '../ng.styles';

import {
  Search,
  ModifiedSearch
} from '../definitions/search';

import {
  FilteringService
} from '../services/filtering.service';

@Component({

  'selector': 'ng-searchbox-filtering',

  'template': NgSearchboxFilteringTemplate,

  'styles': NgSearchboxFilteringStyle

})

export class NgSearchboxFilteringComponent implements AfterViewInit {

  @Input('observer') observer: EventEmitter<Search.BindingEventChange> = null;

  public Filtering: FilteringService = null;

  public availableFilters: Search.AvailableFilter[];

  public active: boolean = false;

  constructor (
    private changeDetectionRef: ChangeDetectorRef
  ) {

    return this;

  }

  public toggleFilters () {

    this.active = !this.active;

  }

  ngAfterViewInit () {

    let self: NgSearchboxFilteringComponent = <NgSearchboxFilteringComponent>this;

    this
      .observer
      .subscribe((change: Search.BindingEventChange): void => {

        switch (change.name) {

          case Search.FilteringChange:

            self
              .availableFilters = <Search.AvailableFilter[]>change.data;

          break;

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

  public addFilterAndClose (filter: ModifiedSearch.ModifiedFilter): void {

    this.active = false;

    this
      .Filtering
      .add(filter);

    return

  }

  public addFilter(event: MouseEvent, name: string): void {

    let self: NgSearchboxFilteringComponent = <NgSearchboxFilteringComponent>this;

    if (this.availableFilters) {

      this
        .availableFilters
        .forEach((filter: Search.AvailableFilter): void => {

          let modifiedFilter: ModifiedSearch.ModifiedFilter = <ModifiedSearch.ModifiedFilter>filter;

          if (modifiedFilter.name === name) {

            if(modifiedFilter.restrictedSuggestedValues) {

              self.addFilterAndClose(modifiedFilter);

            } else {

              if(!modifiedFilter.multi) {

                modifiedFilter.notFiltered = !modifiedFilter.notFiltered;

                if(!modifiedFilter.notFiltered) {

                  self.addFilterAndClose(modifiedFilter);

                }

              } else {

                self.addFilterAndClose(modifiedFilter);

              }

            }

          }

        });

    }

  }

}