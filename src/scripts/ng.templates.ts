'use strict';

export const NgSearchboxAddedFilterTemplate: string = `<div class="ng-searchbox-added-filter" #ngSearchboxAddedFilter=""><div class="ng-searchbox-added-filter-contents" (click)="openFilter();"><span class="ng-searchbox-filter-name" [innerText]="filter.displayName + ':'"></span><template [ngIf]="filter &amp;&amp; filter.selector"><span class="selector-type" [innerText]="filter.selector.name"></span></template><template [ngIf]="filter &amp;&amp; filter.value"><span class="filter-value" [innerText]="filter.value"></span></template></div><template [ngIf]="filter &amp;&amp; filter.editing"><input type="text" [(ngModel)]="v" (ngModelChange)="valueChange($event);" (keydown)="onKeyDown($event);" (keyup)="onKeyUp($event);"/></template><ng-searchbox-filter-selectors [filter]="filter"></ng-searchbox-filter-selectors><i class="fa fa-times" (click)="destroy();"></i></div>`;
export const NgSearchboxAddedFiltersWrapperTemplate: string = `<div class="ng-searchbox-added-filters" #ngSearchboxAddedFilters=""></div>`;
export const NgSearchboxTemplate: string = `<div class="ng-searchbox"><template [ngIf]="ngSearchBoxFiltering"><ng-searchbox-filtering [observer]="onChange"></ng-searchbox-filtering></template><div class="ng-searchbox-wrapper"><input [id]="sid" type="text" [(ngModel)]="query" (ngModelChange)="queryChange($event);" (keydown)="onKeyDown($event);" [placeholder]="placeholder"/><div class="ng-searchbox-buttons"><template [ngIf]="hasQuery"><i class="fa fa-eraser" (click)="handleEraser();"></i></template><template [ngIf]="(hasQuery || (Filtering &amp;&amp; Filtering.hasFilters))"><i class="fa fa-trash" (click)="handleGarbage();"></i></template><i class="fa fa-search" (click)="handleSearch();"></i></div></div><ng-searchbox-added-filters-wrapper [observer]="onChange" #ngSearchboxAddedFiltersWrapper=""></ng-searchbox-added-filters-wrapper></div>`;
export const NgSearchboxFilterSelectorsTemplate: string = `<div class="ng-searchbox-filter-selectors" [hidden]="!filter.editing"><ul class="ng-searchbox-selectors-list"><li *ngFor="let selector of selectors" [ngClass]="{ 'active': selector.selected }" (click)="takeSelector(selector);"><span [innerText]="selector.name"></span></li></ul></div>`;
export const NgSearchboxFilteringTemplate: string = `<div class="ng-filtering clearfix" (click)="toggleFilters();"><span [ngClass]="{ 'active': active }"><i class="fa fa-filter"></i></span><ul [hidden]="!active"><li *ngFor="let filter of availableFilters" [ngClass]="{ 'child-filter': filter.child, 'root-filter': filter.root }" (click)="addFilter($event, filter.name);"><i class="fa fa-filter"></i><span class="ng-filter-display-name" [innerText]="filter.displayName"></span><span class="ng-filtered-from"></span></li></ul></div>`;
