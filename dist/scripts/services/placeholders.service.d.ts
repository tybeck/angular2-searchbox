import { NgSearchboxComponent } from '../components/ng-searchbox.component';
export declare class PlaceholdersService {
    private searchbox;
    private index;
    private position;
    private val;
    private timer;
    private config;
    constructor(searchbox: NgSearchboxComponent);
    setup(): PlaceholdersService;
    start(index: number): void;
    change(reverse?: boolean): void;
}
