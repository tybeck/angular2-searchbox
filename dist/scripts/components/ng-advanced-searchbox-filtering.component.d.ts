import { EventEmitter, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Search, ModifiedSearch } from '../definitions/search';
import { FilteringService } from '../services/filtering.service';
export declare class NgAdvancedSearchboxFilteringComponent implements AfterViewInit {
    private changeDetectionRef;
    observer: EventEmitter<Search.BindingEventChange>;
    Filtering: FilteringService;
    availableFilters: Search.AvailableFilter[];
    active: boolean;
    constructor(changeDetectionRef: ChangeDetectorRef);
    toggleFilters(): void;
    ngAfterViewInit(): void;
    addFilterAndClose(filter: ModifiedSearch.ModifiedFilter): void;
    addFilter(event: MouseEvent, name: string): void;
}
