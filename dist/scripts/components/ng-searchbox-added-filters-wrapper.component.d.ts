import { ComponentFactoryResolver, AfterViewInit, EventEmitter, ChangeDetectorRef, ViewContainerRef } from '@angular/core';
import { NgSearchboxComponent } from './ng-searchbox.component';
import { Search } from '../definitions/search';
import { FilteringService } from '../services/filtering.service';
export declare class NgSearchboxAddedFiltersWrapper implements AfterViewInit {
    componentFactoryResolver: ComponentFactoryResolver;
    private changeDetectionRef;
    ngSearchboxAddedFiltersViewContainer: ViewContainerRef;
    ngSearchboxAddedFilters: NgSearchboxAddedFiltersWrapper;
    observer: EventEmitter<Search.BindingEventChange>;
    Filtering: FilteringService;
    searchbox: NgSearchboxComponent;
    constructor(componentFactoryResolver: ComponentFactoryResolver, changeDetectionRef: ChangeDetectorRef);
    ngAfterViewInit(): void;
}
