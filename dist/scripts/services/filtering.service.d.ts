import { EventEmitter } from '@angular/core';
import { NgSearchboxAddedFiltersWrapper } from '../components/ng-searchbox-added-filters-wrapper.component';
import { NgSearchboxAddedFilter } from '../components/ng-searchbox-added-filter';
import { EventHandling } from '../services/event-handling.service';
import { Search, AddedFilter, ModifiedSearch } from '../definitions/search';
export declare class FilteringService {
    private eventSvc;
    private ngSearchboxAddedFilters;
    addedFilters: AddedFilter[];
    hasFilters: boolean;
    event: EventEmitter<ModifiedSearch.ModifiedFilter[]>;
    params: ModifiedSearch.ModifiedFilter[];
    constructor(eventSvc: EventHandling, ngSearchboxAddedFilters: NgSearchboxAddedFiltersWrapper);
    getPublisher(): EventEmitter<ModifiedSearch.ModifiedFilter[]>;
    add(filter: Search.AvailableFilter): void;
    removeByComponent(filter: NgSearchboxAddedFilter): void;
    remove(filter: AddedFilter): void;
    removeAll(): void;
    buildExtendedParameter(filter: ModifiedSearch.ModifiedFilter): ModifiedSearch.ModifiedFilter;
    buildParameter(filter: ModifiedSearch.ModifiedFilter): ModifiedSearch.ModifiedFilter;
    update(filter?: ModifiedSearch.ModifiedFilter): void;
}
