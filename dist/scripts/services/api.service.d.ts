import { Search } from '../definitions/search';
export declare class API {
    $$registeredEvents: Search.RegisteredEvent[];
    $$allowedEvents: string[];
    constructor();
    on(type: string, fn: Function): API;
    off(type: string, fn: Function): API;
    offAll(): API;
}
