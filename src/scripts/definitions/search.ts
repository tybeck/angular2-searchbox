'use strict';

import {
  ComponentRef
} from '@angular/core';

import {
  NgAdvancedSearchboxAddedFilter
} from '../components/ng-advanced-searchbox-added-filter';

export namespace Search {

  export const FilteringChange: string = 'filteringChange';

  export const FilteringServiceChange: string = 'filteringServiceChange';

  export interface BindingEventChange {

    name: string;

    data: any;

  }

  export interface Selector {

    name?: string;

    key?: string;

    selected?: boolean;

    notAllowed?: string[];

  }

  export interface Operator {

    name?: string;

    selected?: boolean;

  }

  export interface Configuration {

    delay?: number;

    placeholders?: string[];

    placeholderInterval?: number;

    placeholderSpeedOutInterval?: number;

    placeholderSpeedInInterval?: number;

    store?: boolean;

    updateOnlyByEnterKey?: boolean;

    autoCompleteUrl?: string;

  }

  export interface AvailableFilter {

    name: string;

    displayName?: string;

    middleware?: (Function|Function[]);

    multi?: boolean;

    validation?: string;

    suggestedValues?: (string|string[]);

    suggestedDataPoint?: string;

    restrictedSuggestedValues?: boolean;

    reloadOnCreate?: boolean;

    root?: string;

    child?: string;

  }

  export interface Filter {

    condition: string;

    value: string;

    name: string;

    $$timestamp?: number;

    $$modified?: number;

    $$lastValue?: string;

  }

  export interface Parameters {

    query: string;

    filters: ModifiedSearch.ModifiedFilter[];

  }

  export interface RegisteredEvent {

    type: string;

    fn: Function;

  }

}

export namespace ModifiedSearch {

  export interface ModifiedFilter extends Search.AvailableFilter {

    $$lastValue?: string;

    $$timestamp?: number;

    $$modified?: number;

    notFiltered?: boolean;

    active?: boolean;

    value?: string;

    editing?: boolean;

    uuid?: string;

    condition?: string;

    selector?: Search.Selector;

  }

}

export interface AddedFilter {

  component: ComponentRef<NgAdvancedSearchboxAddedFilter>;

  filter: ModifiedSearch.ModifiedFilter;

}

export const SELECTORS: Search.Selector[] = [
  {
    "name": "Contains",
    "key": "contains",
    "selected": true,
    "notAllowed": [
      "restrictedSuggestedValues"
    ]
  },
  {
    "name": "Does not contain",
    "key": "doesNotContain",
    "notAllowed": [
      "restrictedSuggestedValues"
    ]
  },
  {
    "name": "Is Equal To",
    "key": "isEqualTo"
  },
  {
    "name": "Is Not Equal To",
    "key": "isNotEqualTo"
  },
  {
    "name": "Starts with",
    "key": "startsWith"
  },
  {
    "name": "Ends with",
    "key": "endsWith"
  },
  {
    "name": "Similiarity",
    "key": "similiarity"
  }
];

export const OPERATORS: Search.Operator[] = [
  {
    "name": "AND",
    "selected": true
  }, {
    "name": "OR"
  }
];