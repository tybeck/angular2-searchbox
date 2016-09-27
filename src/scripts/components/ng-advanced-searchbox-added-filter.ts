'use strict';

import {
  Component,
  ViewChild,
  ElementRef
} from '@angular/core';

import {
  FilteringService
} from '../services/filtering.service';

import {
  UtilsService
} from '../services/utils.service';

import {
  EventHandling
} from '../services/event-handling.service';

import {
  NgAdvancedSearchboxAddedFilterTemplate
} from '../ng.templates';

import {
  ModifiedSearch
} from '../definitions/search';

@Component({

  'selector': 'ng-advanced-searchbox-added-filter',

  'template': NgAdvancedSearchboxAddedFilterTemplate,

  'providers': [
    UtilsService
  ]

})

export class NgAdvancedSearchboxAddedFilter {

  @ViewChild('ngAdvancedSearchboxAddedFilter') ngAdvancedSearchboxAddedFilter: ElementRef;

  public Filtering: FilteringService = null

  public Event: EventHandling = null;

  public filter: ModifiedSearch.ModifiedFilter = null;

  public uuid: string = null;

  public v: string = '';

  public pv: string = '';

  private proxiedFunction: EventListenerOrEventListenerObject;

  constructor (
    private utils: UtilsService,
    private window: Window
  ) {

    this.uuid = this
      .utils
      .uuid();

    return this;

  }

  public set (
    filteringSvc: FilteringService,
    eventSvc: EventHandling,
    filter: ModifiedSearch.ModifiedFilter
  ): NgAdvancedSearchboxAddedFilter {

    this.Filtering = filteringSvc;

    this.Event = eventSvc;

    this.filter = filter;

    this
      .toggleActivation();

    return this;

  }

  public toggleActivation (force?: boolean): void {

    let self: NgAdvancedSearchboxAddedFilter = <NgAdvancedSearchboxAddedFilter>this;

    if (typeof this
      .filter
      .active === 'undefined') {

        this
          .filter
          .active = true;

        this
          .filter
          .editing = true;

    } else {

      if (typeof force !== 'undefined') {

        this
          .filter
          .active = force;

      } else {

        this
          .filter
          .active = !this
            .filter
            .active;

      }

    }

    if (this.filter.active) {

      setTimeout((): void => {

        self.proxiedFunction = (event: MouseEvent): void => {

          this
            .windowClicked
            .apply(self, [event])

        };

        self
          .window
          .addEventListener('click', self.proxiedFunction);

      }, 25);

      self
        .setFocus();

    } else {

      self
        .window
        .removeEventListener('click', this.proxiedFunction);

      self.closeFilter();

    }

  }

  public openFilter (): NgAdvancedSearchboxAddedFilter {

    if (!this.filter.editing) {

      this
        .filter
        .editing = true;

      this
        .window
        .addEventListener('click', this.proxiedFunction);

      this
        .setFocus();

    }

    return this;

  }

  public setFocus (): NgAdvancedSearchboxAddedFilter {

    let self: NgAdvancedSearchboxAddedFilter = this;

    setTimeout(function () {

      let input = self
        .ngAdvancedSearchboxAddedFilter
        .nativeElement
        .querySelector('input');

      if (input) {

        input
          .focus();

      }

    }, 25);

    return this;

  }

  public closeFilter (): NgAdvancedSearchboxAddedFilter {

    if (!this.filter.value) {

      this
        .Filtering
        .removeByComponent(this);

    } else {

      this
        .filter
        .editing = false;

    }

    return this;

  }

  public valueChange (val: string): void {

    this
      .filter
      .value = val;

    if (val !== this.pv) {

      this
        .Event
        .onFilterChanged(
          this.filter
        );

      this
        .Filtering
        .update(
          this.filter
        );

    }

  }

  public onKeyDown (event: any): void {

    this
      .pv = event
      .target
      .value;

    this
      .filter
      .$$lastValue = this
        .pv;

  }

  public onKeyUp (event: KeyboardEvent): void {

    if(event.keyCode === 13) {

      this
        .closeFilter();

    }

  }

  public windowClicked (event: MouseEvent): void {

    let target = <HTMLElement>event.target,

      element: HTMLElement = this
        .ngAdvancedSearchboxAddedFilter
        .nativeElement;

    if (!element.contains(target)) {

      this
        .window
        .removeEventListener('click', this.proxiedFunction);

      this
        .toggleActivation(false);

      this
        .closeFilter();

    }

  }

  public destroy () {

    this
      .Filtering
      .removeByComponent(this);

  }

}