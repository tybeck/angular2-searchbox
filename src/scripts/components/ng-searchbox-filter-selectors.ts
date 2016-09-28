'use strict';

import * as _ from 'lodash';

import {
  Component,
  Input,
  Inject,
  forwardRef,
  ChangeDetectorRef,
  AfterViewInit,
  NgZone
} from '@angular/core';

import {
  NgSearchboxAddedFilter
} from '../components/ng-searchbox-added-filter';

import {
  NgSearchboxFilterSelectorsTemplate
} from '../ng.templates';

import {
  SELECTORS,
  Search,
  ModifiedSearch
} from '../definitions/search';

@Component({

  'selector': 'ng-searchbox-filter-selectors',

  'template': NgSearchboxFilterSelectorsTemplate

})

export class NgSearchboxFilterSelectors implements AfterViewInit {

  @Input('filter') filter: ModifiedSearch.ModifiedFilter = null;

  public selectors: Search.Selector[] = _.clone(SELECTORS);

  constructor (
    @Inject(forwardRef(() => NgSearchboxAddedFilter)) private ngAddedFilter: NgSearchboxAddedFilter,
    private zone: NgZone
  ) {

    return this;

  }

  public takeSelector (selector: Search.Selector): void {

    let self: NgSearchboxFilterSelectors = this;

    self
      .selectors
      .forEach((selector: Search.Selector): void => {

        selector.selected = false;

    });

    self
      .filter
      .selector = selector;

    selector.selected = true;

    if(self
      .filter
      .value) {

        this
          .ngAddedFilter
          .Filtering
          .update();

      this.ngAddedFilter.Event.onFilterSelectorChanged(
        selector, self.filter
      );

    }

    this
      .ngAddedFilter
      .setFocus();

  }

  public getDefaultSelector(): NgSearchboxFilterSelectors {

    let self: NgSearchboxFilterSelectors = this;

    setTimeout((): void => {

      if (!self
          .filter
          .selector) {

        self
          .selectors
          .forEach((selector: Search.Selector): void => {

            if (selector.selected) {

              self
                .filter
                .selector = selector;

            }

          });

        if (!self.filter.selector

          && self.selectors.length) {

          let selector: Search.Selector = self
            .selectors[0];

          selector.selected = true;

          self
            .filter
            .selector = selector;

        }

      } else {

        self
          .selectors
          .forEach((selector: Search.Selector): void => {

            selector.selected = (selector.key === self
              .filter
              .selector
              .key);

          });

      }

    }, 0);

    return this;

  }

  ngAfterViewInit () {

    this
      .getDefaultSelector();

  }

}