import { AfterViewInit, NgZone } from '@angular/core';
import { NgAdvancedSearchboxAddedFilter } from '../components/ng-advanced-searchbox-added-filter';
import { Search, ModifiedSearch } from '../definitions/search';
export declare class NgAdvancedSearchboxFilterSelectors implements AfterViewInit {
    private ngAddedFilter;
    private zone;
    filter: ModifiedSearch.ModifiedFilter;
    selectors: Search.Selector[];
    constructor(ngAddedFilter: NgAdvancedSearchboxAddedFilter, zone: NgZone);
    takeSelector(selector: Search.Selector): void;
    getDefaultSelector(): NgAdvancedSearchboxFilterSelectors;
    ngAfterViewInit(): void;
}
