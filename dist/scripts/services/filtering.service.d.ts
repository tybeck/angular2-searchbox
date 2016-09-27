import { ViewContainerRef, EventEmitter } from '@angular/core';
import { NgAdvancedSearchboxAddedFiltersWrapper } from '../components/ng-advanced-searchbox-added-filters-wrapper.component';
import { NgAdvancedSearchboxAddedFilter } from '../components/ng-advanced-searchbox-added-filter';
import { EventHandling } from '../services/event-handling.service';
import { Search, AddedFilter, ModifiedSearch } from '../definitions/search';
export declare class FilteringService {
    private eventSvc;
    private tybAdvancedSearchboxAddedFilters;
    private viewContainer;
    addedFilters: AddedFilter[];
    hasFilters: boolean;
    event: EventEmitter<ModifiedSearch.ModifiedFilter[]>;
    params: ModifiedSearch.ModifiedFilter[];
    constructor(eventSvc: EventHandling, tybAdvancedSearchboxAddedFilters: NgAdvancedSearchboxAddedFiltersWrapper, viewContainer: ViewContainerRef);
    getPublisher(): EventEmitter<ModifiedSearch.ModifiedFilter[]>;
    add(filter: Search.AvailableFilter): void;
    removeByComponent(filter: NgAdvancedSearchboxAddedFilter): void;
    remove(filter: AddedFilter): void;
    removeAll(): void;
    buildExtendedParameter(filter: ModifiedSearch.ModifiedFilter): ModifiedSearch.ModifiedFilter;
    buildParameter(filter: ModifiedSearch.ModifiedFilter): ModifiedSearch.ModifiedFilter;
    update(filter?: ModifiedSearch.ModifiedFilter): void;
}
