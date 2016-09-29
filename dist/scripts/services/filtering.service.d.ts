import { EventEmitter } from '@angular/core';
import { NgSearchboxAddedFiltersWrapper } from '../components/ng-searchbox-added-filters-wrapper.component';
import { NgSearchboxAddedFilter } from '../components/ng-searchbox-added-filter';
import { EventHandling } from '../services/event-handling.service';
import { UtilsService } from '../services/utils.service';
import { Search, AddedFilter, ModifiedSearch } from '../definitions/search';
export declare class FilteringService {
    private eventSvc;
    private ngSearchboxAddedFilters;
    private utils;
    addedFilters: AddedFilter[];
    hasFilters: boolean;
    event: EventEmitter<ModifiedSearch.ModifiedFilter[]>;
    params: ModifiedSearch.ModifiedFilter[];
    constructor(eventSvc: EventHandling, ngSearchboxAddedFilters: NgSearchboxAddedFiltersWrapper, utils: UtilsService);
    getPublisher(): EventEmitter<ModifiedSearch.ModifiedFilter[]>;
    add(filter: Search.AvailableFilter): void;
    removeByComponent(filter: NgSearchboxAddedFilter, options?: Search.RemoveOptions): void;
    remove(filter: AddedFilter, options?: Search.RemoveOptions): void;
    removeAll(): void;
    buildExtendedParameter(filter: ModifiedSearch.ModifiedFilter): ModifiedSearch.ModifiedFilter;
    buildParameter(filter: ModifiedSearch.ModifiedFilter): ModifiedSearch.ModifiedFilter;
    update(filter?: ModifiedSearch.ModifiedFilter): void;
}
