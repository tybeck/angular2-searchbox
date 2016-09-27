'use strict';

import * as _ from 'lodash';

import {
  Injectable,
  ViewContainerRef,
  ComponentRef,
  EventEmitter
} from '@angular/core';

import {
  NgAdvancedSearchboxAddedFiltersWrapper
} from '../components/ng-advanced-searchbox-added-filters-wrapper.component';

import {
  NgAdvancedSearchboxAddedFilter
} from '../components/ng-advanced-searchbox-added-filter';

import {
  EventHandling
} from '../services/event-handling.service';

import {
  ValidationService
} from '../services/validation.service';

import {
  UtilsService
} from '../services/utils.service';

import {
  Search,
  AddedFilter,
  ModifiedSearch
} from '../definitions/search';

let validation: ValidationService = <ValidationService>new ValidationService(),

  utils: UtilsService = <UtilsService>new UtilsService();

@Injectable()
export class FilteringService {

  public addedFilters: AddedFilter[] = [];

  public hasFilters: boolean = false;

  public event: EventEmitter<ModifiedSearch.ModifiedFilter[]> = null;

  public params: ModifiedSearch.ModifiedFilter[] = null;

  constructor (
    private eventSvc: EventHandling,
    private tybAdvancedSearchboxAddedFilters: NgAdvancedSearchboxAddedFiltersWrapper,
    private viewContainer: ViewContainerRef
  ) {

    this.event = new EventEmitter<ModifiedSearch.ModifiedFilter[]>();

    return this;
    
  }

  public getPublisher (): EventEmitter<ModifiedSearch.ModifiedFilter[]> {

    return this.event;

  }

  public add (filter: Search.AvailableFilter): void {

    let factory = this
      .tybAdvancedSearchboxAddedFilters
      .componentFactoryResolver
      .resolveComponentFactory(
        NgAdvancedSearchboxAddedFilter
      ),

      cmpRef: ComponentRef<NgAdvancedSearchboxAddedFilter> = this
        .viewContainer
        .createComponent(factory);

    let modifiedFilter: ModifiedSearch.ModifiedFilter =

      <ModifiedSearch.ModifiedFilter>_.clone(filter);

    modifiedFilter.uuid = utils.uuid();

    cmpRef
      .instance
      .set(
        this,
        this.eventSvc,
        modifiedFilter
      );

    this
      .addedFilters
      .push({

        'component': cmpRef,

        'filter': modifiedFilter

      });

    if (this.addedFilters &&

      this.addedFilters.length) {

        this.hasFilters = true;

    }

  }

  public removeByComponent (filter: NgAdvancedSearchboxAddedFilter): void {

    let self: FilteringService = <FilteringService>this;

    this
      .addedFilters
      .slice()
      .reverse()
      .forEach((
        addedFilter: AddedFilter
      ): void => {

        if (addedFilter.component.instance === filter) {

          return self
            .remove(addedFilter);

        }

      });

  }

  public remove (filter: AddedFilter): void {

    let self: FilteringService = <FilteringService>this;

    this
      .addedFilters
      .slice()
      .reverse()
      .forEach((
        addedFilter: AddedFilter,
        addedIndex: number,
        addedObject: any
      ): void => {

        if (addedFilter.component === filter.component) {

          self
            .addedFilters
            .splice(addedObject.length - 1 - addedIndex, 1);

          filter
            .component
            .destroy();

        }

      });

    if (this.addedFilters &&

      !this.addedFilters.length) {

        this.hasFilters = false;

    }

    this.update();

  }

  public removeAll(): void {

    let self: FilteringService = <FilteringService>this;

    this
      .addedFilters
      .slice()
      .reverse()
      .forEach((filter: AddedFilter): void => {

        return self
          .remove(filter);

      });

  }

  public buildExtendedParameter (
    filter: ModifiedSearch.ModifiedFilter
  ): ModifiedSearch.ModifiedFilter {

    if (filter && !filter.$$timestamp) {

      filter.$$timestamp = new Date().getTime();

    }

    filter.$$modified = new Date().getTime();

    return filter;

  }

  public buildParameter (filter: ModifiedSearch.ModifiedFilter): ModifiedSearch.ModifiedFilter {

    let _param: ModifiedSearch.ModifiedFilter = {

      'name': filter.name,

      'value': filter.value,

      'condition': filter.selector.key,

      '$$lastValue': filter.$$lastValue,

      '$$modified': filter.$$timestamp || null,

      '$$timestamp': filter.$$timestamp || null

    };

    return(this.buildExtendedParameter(
      _param
    ));

  }

  public update (
    filter?: ModifiedSearch.ModifiedFilter
  ): void {

    let self: FilteringService = <FilteringService>this,

      params: ModifiedSearch.ModifiedFilter[] = [];

    console.log('update...');

    self
      .addedFilters
      .forEach((addedFilter: AddedFilter): void => {

        if (filter && addedFilter
          .filter
          .uuid === filter.uuid) {

            addedFilter.filter = filter;

        }

        let modifiedFilter: ModifiedSearch.ModifiedFilter = self.buildParameter(
          addedFilter.filter
        );

        _.extend(addedFilter.filter, {

          '$$timestamp': modifiedFilter.$$timestamp,

          '$$modified': modifiedFilter.$$modified,

          '$$lastValue': modifiedFilter.$$lastValue

        });

        params.push(
          modifiedFilter
        );

      });

    if (this.params !== params) {

      this
        .event
        .emit(params);

    }

    this.params = params;

  }

}