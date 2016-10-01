import { EventEmitter } from '@angular/core';
import { ModifiedSearch, Search } from '../definitions/search';
import { API } from './api.service';
export declare class EventHandling {
    private api;
    emitter: EventEmitter<any>;
    constructor(api: API);
    init(): EventHandling;
    fire(type: string, data?: any): EventHandling;
    onChange(parameters: any): EventHandling;
    onQueryAdded(n: string, o: string): EventHandling;
    onQueryRemoved(n: string, o: string): EventHandling;
    onEraser(): EventHandling;
    onGarbage(): EventHandling;
    onFilterChanged(filter: ModifiedSearch.ModifiedFilter): EventHandling;
    onFilterSelectorChanged(selector: Search.Selector, filter: ModifiedSearch.ModifiedFilter): EventHandling;
    onOperatorChanged(operator: Search.Operator, filter: ModifiedSearch.ModifiedFilter): EventHandling;
}
