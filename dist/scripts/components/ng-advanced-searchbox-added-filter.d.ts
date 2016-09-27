import { ElementRef } from '@angular/core';
import { FilteringService } from '../services/filtering.service';
import { UtilsService } from '../services/utils.service';
import { EventHandling } from '../services/event-handling.service';
import { ModifiedSearch } from '../definitions/search';
export declare class NgAdvancedSearchboxAddedFilter {
    private utils;
    private window;
    ngAdvancedSearchboxAddedFilter: ElementRef;
    Filtering: FilteringService;
    Event: EventHandling;
    filter: ModifiedSearch.ModifiedFilter;
    uuid: string;
    v: string;
    pv: string;
    private proxiedFunction;
    constructor(utils: UtilsService, window: Window);
    set(filteringSvc: FilteringService, eventSvc: EventHandling, filter: ModifiedSearch.ModifiedFilter): NgAdvancedSearchboxAddedFilter;
    toggleActivation(force?: boolean): void;
    openFilter(): NgAdvancedSearchboxAddedFilter;
    setFocus(): NgAdvancedSearchboxAddedFilter;
    closeFilter(): NgAdvancedSearchboxAddedFilter;
    valueChange(val: string): void;
    onKeyDown(event: any): void;
    onKeyUp(event: KeyboardEvent): void;
    windowClicked(event: MouseEvent): void;
    destroy(): void;
}
