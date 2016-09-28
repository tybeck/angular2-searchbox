import { ComponentFactoryResolver, AfterViewInit, EventEmitter, ChangeDetectorRef, ViewContainerRef } from '@angular/core';
import { Search } from '../definitions/search';
import { FilteringService } from '../services/filtering.service';
export declare class NgSearchboxAddedFiltersWrapper implements AfterViewInit {
    componentFactoryResolver: ComponentFactoryResolver;
    private changeDetectionRef;
    ngSearchboxAddedFiltersViewContainer: ViewContainerRef;
    ngSearchboxAddedFilters: NgSearchboxAddedFiltersWrapper;
    observer: EventEmitter<Search.BindingEventChange>;
    Filtering: FilteringService;
    constructor(componentFactoryResolver: ComponentFactoryResolver, changeDetectionRef: ChangeDetectorRef);
    ngAfterViewInit(): void;
}
