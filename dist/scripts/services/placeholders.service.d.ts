import { NgAdvancedSearchboxComponent } from '../components/ng-advanced-searchbox.component';
export declare class PlaceholdersService {
    private searchbox;
    private index;
    private position;
    private val;
    private timer;
    private config;
    constructor(searchbox: NgAdvancedSearchboxComponent);
    setup(): PlaceholdersService;
    start(index: number): void;
    change(reverse?: boolean): void;
}
