import { ElementRef, AfterViewInit } from '@angular/core';
import { NgSearchboxAddedFilter } from './ng-searchbox-added-filter.component';
import { FilteringService } from '../services/filtering.service';
import { ModifiedSearch, Search } from '../definitions/search';
export declare class NgSearchboxFilterOperators implements AfterViewInit {
    private ngAddedFilter;
    private window;
    private element;
    filter: ModifiedSearch.ModifiedFilter;
    operators: Search.Operator[];
    selectedOperator: Search.Operator;
    Filtering: FilteringService;
    showOperators: boolean;
    hasOperator: boolean;
    private proxiedFunction;
    constructor(ngAddedFilter: NgSearchboxAddedFilter, window: Window, element: ElementRef);
    toggleOperators(show?: boolean): void;
    private windowClicked(event);
    takeOperator(operator: Search.Operator): void;
    getDefaultOperator(): NgSearchboxFilterOperators;
    addOperatorToFilter(): NgSearchboxFilterOperators;
    ngAfterViewInit(): void;
}
