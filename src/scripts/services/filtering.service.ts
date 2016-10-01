'use strict';

import * as _ from 'lodash';

import {
  Injectable,
  ViewContainerRef,
  ComponentRef,
  EventEmitter
} from '@angular/core';

import {
  NgSearchboxComponent
} from '../components/ng-searchbox.component';

import {
  NgSearchboxAddedFiltersWrapper
} from '../components/ng-searchbox-added-filters-wrapper.component';

import {
  NgSearchboxAddedFilter
} from '../components/ng-searchbox-added-filter.component';

import {
  NgSearchboxFilterOperators
} from '../components/ng-searchbox-filter-operators.component';

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

let validation: ValidationService = <ValidationService>new ValidationService();

@Injectable()
export class FilteringService {

  public addedFilters: AddedFilter[] = [];

  public addedOperators: string[] = [];

  public hasFilters: boolean = false;

  public event: EventEmitter<ModifiedSearch.ModifiedFilter[]> = null;

  public params: ModifiedSearch.ModifiedFilter[] = null;

  public ngSearchboxAddedFilters: NgSearchboxAddedFiltersWrapper = null;

  public Event: EventHandling = null;

  public utils: UtilsService = null;

  constructor (
    public searchbox: NgSearchboxComponent
  ) {

    this.event = new EventEmitter<ModifiedSearch.ModifiedFilter[]>();

    this.ngSearchboxAddedFilters = this
      .searchbox
      .ngSearchboxAddedFiltersWrapper;

    this.Event = this
      .searchbox
      .Event;

    this.utils = this
      .searchbox
      .utils;

    return this;
    
  }

  public getPublisher (): EventEmitter<ModifiedSearch.ModifiedFilter[]> {

    return this.event;

  }

  public getFilterCount (): number {

    return this
      .addedFilters
      .length;

  }

  public addOperatorToFilter (
    operator: Search.Operator,
    filter: ModifiedSearch.ModifiedFilter,
    update: boolean = false
  ) {

    let self: FilteringService = <FilteringService>this;

    if (filter) {

      let index: number = null;

      _.each(self.addedFilters, (addedFilter: AddedFilter, addedIndex: number): void => {

        if (addedFilter.filter.uuid === filter.uuid) {

          index = addedIndex;

        }

      });

      if (index !== null) {

        let filterIndex: number = (index - 1);

        if (!self.addedOperators[filterIndex]) {

           self
             .addedOperators
             .push(
               operator.name
             );

        } else {

          self
            .addedOperators[
              filterIndex
            ] = operator.name;

        }

      }

    } else {

      self
        .addedOperators
        .push(
          operator.name
        );

    }

    if (update) {

      this
        .update();

    }

    console.log(self.addedOperators);

  }

  public hasOperatorAlready (filter: ModifiedSearch.ModifiedFilter): boolean {

    let operators: string[] = this.getOperators(),

      filters: AddedFilter[] = this.getFilters(),

      hasOperator: boolean = false;

    _.each(operators, (o: string, oIndex: number): void => {

      _.each(filters, (f: AddedFilter, fIndex: number): void => {

        if (f.filter.uuid === filter.uuid) {

          if ((fIndex - 1) === oIndex) {

            hasOperator = true;

          }

        }

      })

    });

    return hasOperator;

  }

  public getOperators (): string[] {

    return this.addedOperators;

  }

  public getFilters (): AddedFilter[] {

    return this.addedFilters;

  }

  public add (filter: Search.AvailableFilter): void {

    let factory = this
      .ngSearchboxAddedFilters
      .componentFactoryResolver
      .resolveComponentFactory(
        NgSearchboxAddedFilter
      ),

      cmpRef: ComponentRef<NgSearchboxAddedFilter> = this
        .ngSearchboxAddedFilters
        .ngSearchboxAddedFiltersViewContainer
        .createComponent(factory);

    let modifiedFilter: ModifiedSearch.ModifiedFilter =

      <ModifiedSearch.ModifiedFilter>_.clone(filter);

    modifiedFilter.uuid = this
      .utils
      .uuid();

    cmpRef
      .instance
      .set(
        this,
        this.searchbox,
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

  public removeByComponent (filter: NgSearchboxAddedFilter, options?: Search.RemoveOptions): void {

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
            .remove(addedFilter, options);

        }

      });

  }

  public setOperator (filter: ModifiedSearch.ModifiedFilter, op: NgSearchboxFilterOperators): void {

    this
      .addedFilters
      .slice()
      .reverse()
      .forEach((
        addedFilter: AddedFilter
      ): void => {

        if (addedFilter.filter.uuid === filter.uuid) {

          addedFilter.operator = op;

        }

      });

  }

  public getOperatorByFilterIndex (filter: ModifiedSearch.ModifiedFilter): string {

    let self: FilteringService = <FilteringService>this,

      index: number = null,

      oIndex: number = 0,

      op = null;

    _.each(self.addedFilters, (
      addedFilter: AddedFilter,
      addedIndex: number): void => {

      if (addedFilter.filter.uuid === filter.uuid) {

        index = addedIndex;

      }

    });

    oIndex = (index - 1);

    if (Math.sign(oIndex) !== -1) {

      op = self.addedOperators[oIndex];

      if (typeof op === 'undefined') {

        op = null;

      }

    }

    return op;

  }

  public remove (filter: AddedFilter, options?: Search.RemoveOptions): void {

    let self: FilteringService = <FilteringService>this,

      operators: Search.Operator[] = self.getOperators(),

      fIndex: number = null;

    self
      .addedFilters
      .forEach((sAddedFilter: AddedFilter, sAddedIndex: number): void => {

        if(sAddedFilter.filter.uuid === filter.filter.uuid) {

          fIndex = sAddedIndex;

        }

      });

    self
      .addedFilters
      .slice()
      .reverse()
      .forEach((
        addedFilter: AddedFilter,
        addedIndex: number,
        addedObject: any
      ): void => {

        if (addedFilter.component === filter.component) {

          if (operators && operators.length) {

            let oIndex: number = (fIndex - 1);

            if (Math.sign(oIndex) === -1) {

              let ffIndex: number = (fIndex + 1),

                nextFilter: AddedFilter = self.addedFilters[ffIndex];

              if (nextFilter && nextFilter.operator) {

                nextFilter
                  .operator
                  .hasOperator = false;

              }

              oIndex = 0;

            }

            self
              .addedOperators
              .splice(oIndex, 1);

          }

          self
            .addedFilters
            .splice(addedObject.length - 1 - addedIndex, 1);

          filter
            .component
            .destroy();

        }

      });

    console.log(self.addedOperators);

    if (this.addedFilters &&

      !this.addedFilters.length) {

        this.hasFilters = false;

    }

    if (!options || (options &&

      typeof options.update === 'boolean' && options.update)) {

        this.update();

    }

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

    let operator: string = this.getOperatorByFilterIndex(filter) || null;

    let _param: ModifiedSearch.ModifiedFilter = {

      'name': filter.name,

      'value': filter.value,

      'condition': filter.selector.key,

      '$$lastValue': filter.$$lastValue,

      '$$modified': filter.$$timestamp || null,

      '$$timestamp': filter.$$timestamp || null,

      '$$operator': operator

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
          .filter.uuid === filter.uuid) {

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