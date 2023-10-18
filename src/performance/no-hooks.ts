import { measure, runInParallel, count, createSimpleAsyncOperation } from "./utils";

export function noHooksAction() {
    return createSimpleAsyncOperation();
}

measure(() => runInParallel({
    callback: noHooksAction,
    count
}), "no-hooks-performance-test");