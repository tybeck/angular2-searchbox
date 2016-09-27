'use strict';

import {
  Component,
  Input,
  Output,
  OnInit,
  OnChanges,
  AfterViewInit,
  EventEmitter,
  ViewChild,
  ViewContainerRef,
  ChangeDetectorRef
} from '@angular/core';

import {
  NgAdvancedSearchboxTemplate
} from '../ng.templates';

import {
  UtilsService
} from '../services/utils.service';

import {
  EventHandling
} from '../services/event-handling.service';

import {
  API
} from '../services/api.service';

import {
  FilteringService
} from '../services/filtering.service';

import {
  PlaceholdersService
} from '../services/placeholders.service';

import {
  Search,
  ModifiedSearch
} from '../definitions/search';

import {
  NgAdvancedSearchboxAddedFiltersWrapper
} from './ng-advanced-searchbox-added-filters-wrapper.component';

let Utils: UtilsService = new UtilsService();

@Component({

  'selector': 'ng-advanced-searchbox',

  'template': NgAdvancedSearchboxTemplate

})

export class NgAdvancedSearchboxComponent implements OnInit, OnChanges, AfterViewInit {

  @ViewChild('ngAdvancedSearchboxAddedFilters', { 'read': ViewContainerRef })

    ngAdvancedSearchboxAddedFiltersViewContainer: ViewContainerRef;

  @ViewChild('ngAdvancedSearchboxAddedFilters')

  ngAdvancedSearchboxAddedFilters: NgAdvancedSearchboxAddedFiltersWrapper;

  @Input('searchParams') searchParams: Search.Parameters = null;

  @Input('ngSearchBoxFiltering') ngSearchBoxFiltering: Search.AvailableFilter[] = null;

  @Input('ngSearchBoxConfig') ngSearchBoxConfig: any = null;

  @Input('ngSearchBoxAutoComplete') ngSearchBoxAutoComplete: any = null;

  @Input('ngSearchBoxCacheFilter') ngSearchBoxCacheFilter: any = null;

  @Input('ngSearchBoxEnableFilteringOperators') ngSearchBoxEnableFilteringOperators: any = null;

  @Input('ngSearchBoxFilterSelectors') ngSearchBoxFilterSelectors: any = null;

  @Input('ngSearchBoxFilterOperators') ngSearchBoxFilterOperators: any = null;

  @Input('placeholder') placeholder: string = '';

  @Output('onRegisterApi') onRegisterApi: EventEmitter<API> = new EventEmitter<API>();

  public onChange: EventEmitter<Search.BindingEventChange> = new EventEmitter<Search.BindingEventChange>();

  public Placeholding: PlaceholdersService = null;

  public Filtering: FilteringService = null;

  public Event: EventHandling = null;

  public Api: API = null;

  public query: string = <string>'';

  public previousQuery: string = <string>null;

  public hasQuery: boolean = <boolean>false;

  public sid: string = <string>Utils.uuid();

  public timer: any = null;

  public defaultParams: Search.Parameters = {

    'query': '',

    'filters': []

  };

  constructor (
    private changeDetectorRef: ChangeDetectorRef,
    private window: Window
  ) {

    return this;

  }

  ngOnInit () {

    this
      .configure();

  }

  ngAfterViewInit () {

    let self: NgAdvancedSearchboxComponent = <NgAdvancedSearchboxComponent>this;

    this.Api = new API();

    this.Event = new EventHandling(this.Api);

    this.Filtering = new FilteringService(
      this.Event,
      this.ngAdvancedSearchboxAddedFilters,
      this.ngAdvancedSearchboxAddedFiltersViewContainer
    );

    this.Placeholding = new PlaceholdersService(
      this
    );

    this
      .Filtering
      .getPublisher()
      .subscribe((filters: ModifiedSearch.ModifiedFilter[]): void => {

        if (self.timer) {

          self
            .window
            .clearTimeout(self.timer);

          self.timer = null;

        }

        self
          .searchParams
          .filters = filters;

        if (self.ngSearchBoxConfig && self.
          ngSearchBoxConfig
          .delay) {

            self.timer = self
              .window
              .setTimeout((): void => {

                self
                  .Event
                  .onChange(self.searchParams);

            }, self.ngSearchBoxConfig.delay);

        } else {

          self
            .Event
            .onChange(self.searchParams);

        }

      });

    this
      .emit(

        Search.FilteringChange,

        this.ngSearchBoxFiltering

      )
      .emit(

        Search.FilteringServiceChange,

        this.Filtering

      );

    this
      .register();

    this
      .changeDetectorRef
      .detectChanges();

  }

  ngOnChanges () {

  }

  public emit (name: string, data?: any): NgAdvancedSearchboxComponent  {

    this
      .onChange
      .emit({

        'name': name,

        'data': data

      });

    return this;

  }

  public queryChange (val: string): void {

    let self: NgAdvancedSearchboxComponent = <NgAdvancedSearchboxComponent>this;

    if (!val && !this.previousQuery && typeof val === 'string' &&

      typeof this.previousQuery === 'string') {

        return;

    }

    if (typeof val !== 'undefined') {

      self.hasQuery = (val && val.length) ? true : false;

      self
        .searchParams
        .query = val;

      if (self.timer) {

        self
          .window
          .clearTimeout(this.timer);

        self.timer = null;

      }

      if (self.ngSearchBoxConfig && self.
        ngSearchBoxConfig
        .delay) {

        self.timer = self
          .window
          .setTimeout((): void => {

            self
              .Event
              .onChange(self.searchParams)
              .onQueryAdded(val, this.previousQuery)
              .onQueryRemoved(val, this.previousQuery)

          }, self.ngSearchBoxConfig.delay);

      } else {

        self
          .Event
          .onChange(self.searchParams)
          .onQueryAdded(val, this.previousQuery)
          .onQueryRemoved(val, this.previousQuery)

      }

    }

  }

  public onKeyDown (event: any): void {

    this
      .previousQuery = event
        .target
      .value;

  }

  public configure (): NgAdvancedSearchboxComponent {

    this
      .searchParams = this.defaultParams;

    return this;

  }

  public register (): NgAdvancedSearchboxComponent {

    this
      .onRegisterApi
      .emit(this.Api);

    return this;

  }

  public eraseQuery (): void {

    this.previousQuery = null;

    this.query = '';

    this
      .queryChange(this.query);

  }

  public handleEraser (): void {

    if (this
      .searchParams
      .query) {

        this
          .eraseQuery();

        this
          .Event
          .onEraser();


    }

  }

  public handleGarbage(): void {

    if (this
      .searchParams
      .query || this.Filtering.hasFilters) {

        this
          .eraseQuery();

        this
          .Filtering
          .removeAll();

        this
          .Event
          .onGarbage();

    }

  }

}