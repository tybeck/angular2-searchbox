import { ElementRef } from '@angular/core';
export declare class UtilsService {
    private window;
    constructor(window: Window);
    uuid(): string;
    isJson(str: any): boolean;
    removeObjectProperties(obj: any, props: any): void;
    getScrollbarWidth(): number;
    isURL(url: string): boolean;
    getCSSProperty(element: ElementRef, property: string): any;
    getHeightOf(element: ElementRef): number;
    getWidthOf(element: ElementRef): number;
}
