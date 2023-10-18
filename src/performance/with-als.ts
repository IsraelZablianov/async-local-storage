import {AsyncLocalStorage} from "node:async_hooks";
import { count, createSimpleAsyncOperation, measure, runInParallel } from "./utils";
export const asyncLocalStorage = new AsyncLocalStorage<any>();

export function withALS() {
    return asyncLocalStorage.run({}, () => {
        return createSimpleAsyncOperation();
    });
}

measure(() => runInParallel({
    callback: withALS,
    count
}), "with-als-performance-test");
