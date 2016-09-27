import { ComponentFactoryResolver, AfterViewInit, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { Search } from '../definitions/search';
import { FilteringService } from '../services/filtering.service';
export declare class NgAdvancedSearchboxAddedFiltersWrapper implements AfterViewInit {
    componentFactoryResolver: ComponentFactoryResolver;
    private changeDetectionRef;
    observer: EventEmitter<Search.BindingEventChange>;
    Filtering: FilteringService;
    constructor(componentFactoryResolver: ComponentFactoryResolver, changeDetectionRef: ChangeDetectorRef);
    ngAfterViewInit(): void;
}
