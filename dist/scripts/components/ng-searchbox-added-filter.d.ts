import { ElementRef } from '@angular/core';
import { FilteringService } from '../services/filtering.service';
import { UtilsService } from '../services/utils.service';
import { EventHandling } from '../services/event-handling.service';
import { ModifiedSearch } from '../definitions/search';
export declare class NgSearchboxAddedFilter {
    private utils;
    private window;
    ngSearchboxAddedFilter: ElementRef;
    Filtering: FilteringService;
    Event: EventHandling;
    filter: ModifiedSearch.ModifiedFilter;
    uuid: string;
    v: string;
    pv: string;
    private proxiedFunction;
    constructor(utils: UtilsService, window: Window);
    set(filteringSvc: FilteringService, eventSvc: EventHandling, filter: ModifiedSearch.ModifiedFilter): NgSearchboxAddedFilter;
    toggleActivation(force?: boolean): void;
    openFilter(): NgSearchboxAddedFilter;
    setFocus(): NgSearchboxAddedFilter;
    closeFilter(): NgSearchboxAddedFilter;
    valueChange(val: string): void;
    onKeyDown(event: any): void;
    onKeyUp(event: KeyboardEvent): void;
    windowClicked(event: MouseEvent): void;
    destroy(): void;
}
