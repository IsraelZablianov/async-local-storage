import async_hooks from "node:async_hooks";
import { count, createSimpleAsyncOperation, measure, runInParallel } from "./utils";

function setupWithAsyncHook() {
    return async_hooks.createHook({
        init(asyncId, type, triggerAsyncId, resource) { },
        before(asyncId) { },
        after(asyncId) { },
        destroy(asyncId) { },
        promiseResolve(asyncId) { },
    }).enable();
}

setupWithAsyncHook();

measure(() => runInParallel({
    callback: createSimpleAsyncOperation,
    count
}), "with-single-hook-performance-test");
