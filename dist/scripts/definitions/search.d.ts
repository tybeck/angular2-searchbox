import { ComponentRef } from '@angular/core';
import { NgAdvancedSearchboxAddedFilter } from '../components/ng-advanced-searchbox-added-filter';
export declare namespace Search {
    const FilteringChange: string;
    const FilteringServiceChange: string;
    interface BindingEventChange {
        name: string;
        data: any;
    }
    interface Selector {
        name?: string;
        key?: string;
        selected?: boolean;
        notAllowed?: string[];
    }
    interface Operator {
        name?: string;
        selected?: boolean;
    }
    interface Configuration {
        delay?: number;
        placeholders?: string[];
        placeholderInterval?: number;
        placeholderSpeedOutInterval?: number;
        placeholderSpeedInInterval?: number;
        store?: boolean;
        updateOnlyByEnterKey?: boolean;
        autoCompleteUrl?: string;
    }
    interface AvailableFilter {
        name: string;
        displayName?: string;
        middleware?: (Function | Function[]);
        multi?: boolean;
        validation?: string;
        suggestedValues?: (string | string[]);
        suggestedDataPoint?: string;
        restrictedSuggestedValues?: boolean;
        reloadOnCreate?: boolean;
        root?: string;
        child?: string;
    }
    interface Filter {
        condition: string;
        value: string;
        name: string;
        $$timestamp?: number;
        $$modified?: number;
        $$lastValue?: string;
    }
    interface Parameters {
        query: string;
        filters: ModifiedSearch.ModifiedFilter[];
    }
    interface RegisteredEvent {
        type: string;
        fn: Function;
    }
}
export declare namespace ModifiedSearch {
    interface ModifiedFilter extends Search.AvailableFilter {
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
export declare const SELECTORS: Search.Selector[];
export declare const OPERATORS: Search.Operator[];
