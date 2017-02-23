import { ComponentRef } from '@angular/core';
import { NgSearchboxAddedFilter } from '../components/ng-searchbox-added-filter.component';
import { NgSearchboxComponent } from '../components/ng-searchbox.component';
import { NgSearchboxFilterOperators } from '../components/ng-searchbox-filter-operators.component';
export declare namespace Search {
    const InformationChange: string;
    interface BindingEventChange {
        name: string;
        data: any;
    }
    interface SearchBoxInformationExchange {
        component?: NgSearchboxComponent;
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
    interface RemoveOptions {
        update?: boolean;
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
        excluded?: boolean;
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
        operators?: string[];
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
        $$operator?: string;
        notFiltered?: boolean;
        active?: boolean;
        value?: string;
        editing?: boolean;
        uuid?: string;
        condition?: string;
        selector?: Search.Selector;
        operator?: Search.Operator;
    }
}
export interface AddedFilter {
    component: ComponentRef<NgSearchboxAddedFilter>;
    operator?: NgSearchboxFilterOperators;
    filter: ModifiedSearch.ModifiedFilter;
}
export declare const SELECTORS: Search.Selector[];
export declare const OPERATORS: Search.Operator[];
