export declare class MemoryService {
    private window;
    hash: string;
    storage: Storage;
    constructor(window: Window);
    getAndSet(key: string, value?: string): void;
    getAll(): any;
    removeAll(): any;
}
