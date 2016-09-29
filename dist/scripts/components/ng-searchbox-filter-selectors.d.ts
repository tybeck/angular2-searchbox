import { AfterViewInit } from '@angular/core';
import { NgSearchboxAddedFilter } from '../components/ng-searchbox-added-filter';
import { Search, ModifiedSearch } from '../definitions/search';
export declare class NgSearchboxFilterSelectors implements AfterViewInit {
    private ngAddedFilter;
    filter: ModifiedSearch.ModifiedFilter;
    selectors: Search.Selector[];
    constructor(ngAddedFilter: NgSearchboxAddedFilter);
    takeSelector(selector: Search.Selector): void;
    getDefaultSelector(): NgSearchboxFilterSelectors;
    ngAfterViewInit(): void;
}
