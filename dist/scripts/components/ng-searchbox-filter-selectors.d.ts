import { AfterViewInit, NgZone } from '@angular/core';
import { NgSearchboxAddedFilter } from '../components/ng-searchbox-added-filter';
import { Search, ModifiedSearch } from '../definitions/search';
export declare class NgSearchboxFilterSelectors implements AfterViewInit {
    private ngAddedFilter;
    private zone;
    filter: ModifiedSearch.ModifiedFilter;
    selectors: Search.Selector[];
    constructor(ngAddedFilter: NgSearchboxAddedFilter, zone: NgZone);
    takeSelector(selector: Search.Selector): void;
    getDefaultSelector(): NgSearchboxFilterSelectors;
    ngAfterViewInit(): void;
}
