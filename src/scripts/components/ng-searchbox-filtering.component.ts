'use strict';

import {
  Component,
  Input,
  EventEmitter,
  AfterViewInit,
  ChangeDetectorRef,
  ViewChild,
  ElementRef,
  NgZone,
  HostListener
} from '@angular/core';

import {
  NgSearchboxFilteringTemplate
} from '../ng.templates';

import {
  NgSearchboxFilteringStyle
} from '../ng.styles';

import {
  NgSearchboxComponent
} from '../components/ng-searchbox.component';

import {
  Search,
  ModifiedSearch
} from '../definitions/search';

import {
  FilteringService
} from '../services/filtering.service';

import {
  UtilsService
} from '../services/utils.service';

@Component({

  'selector': 'ng-searchbox-filtering',

  'template': NgSearchboxFilteringTemplate,

  'styles': NgSearchboxFilteringStyle,

  'providers': [
    UtilsService
  ]

})

export class NgSearchboxFilteringComponent implements AfterViewInit {

  @ViewChild('ngSearchboxFilteringList') ngSearchboxFilteringList: ElementRef;

  @Input('observer') observer: EventEmitter<Search.BindingEventChange> = null;

  public Filtering: FilteringService = null;

  public availableFilters: Search.AvailableFilter[];

  public active: boolean = false;

  public searchbox: NgSearchboxComponent = null;

  private proxiedFunction: EventListenerOrEventListenerObject;

  constructor (
    private changeDetectionRef: ChangeDetectorRef,
    private utils: UtilsService,
    private zone: NgZone
  ) {

    return this;

  }

  @HostListener('window:resize', ['$event'])
  handleResize (): void {

    if (this.active) {

      this.setPosition();

    }

  }

  public toggleFilters (active?: boolean) {

    let self: NgSearchboxFilteringComponent = <NgSearchboxFilteringComponent>this;

    if (typeof active !== 'undefined') {

      this.active = active;

    } else {

      this.active = !this.active;

    }

    this
      .zone
      .run((): void => {

        if (self.active) {

          self.setPosition();

        }

    });

  }

  public setPosition (): void {

    let self: NgSearchboxFilteringComponent = <NgSearchboxFilteringComponent>this;

    let h: number = self
      .utils
      .getHeightOf(
        self
          .searchbox
          .element
      ),

      w: number = self
        .utils
        .getWidthOf(
          self
            .searchbox
            .element
        );

    self
      .ngSearchboxFilteringList
      .nativeElement
      .style
      .top = h + 'px';

    self
      .ngSearchboxFilteringList
      .nativeElement
      .style
      .width = w + 'px';

  }

  ngAfterViewInit () {

    let self: NgSearchboxFilteringComponent = <NgSearchboxFilteringComponent>this;

    this
      .observer
      .subscribe((change: Search.BindingEventChange): void => {

        switch (change.name) {

          case Search.InformationChange:

            let data: Search.SearchBoxInformationExchange = <Search.SearchBoxInformationExchange>change.data;

            self.searchbox = data.component;

            if (self.searchbox) {

              self.availableFilters = self
                .searchbox
                .ngSearchBoxFiltering;

              self.Filtering = self
                .searchbox
                .Filtering;

            }

          break;

        }

        self
          .changeDetectionRef
          .detectChanges();

      });

  }

  public addFilterAndClose (filter: ModifiedSearch.ModifiedFilter): void {

    this.toggleFilters(false);

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