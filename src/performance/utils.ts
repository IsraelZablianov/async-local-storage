import { PerformanceObserver, performance } from "node:perf_hooks"

export const count = 500000;

export function setupMeasurePerformanceObserver() {
  const perfObserver = new PerformanceObserver((items) => {
    items.getEntries().forEach((entry) => {
      console.log(entry);
    })
  })
  
  perfObserver.observe({ entryTypes: ["measure"], buffered: true });
}

export function createSimpleAsyncOperation() {
  return new Promise((resolve) => {
    setTimeout(() => {
        resolve("done")
    })
  })
}

export async function measure(callback: () => Promise<unknown>, label = "hooks-performance-test") {
  setupMeasurePerformanceObserver();
  performance.mark("performance-test-start")
  await callback()
  performance.mark("performance-test-end")
  performance.measure(label, "performance-test-start", "performance-test-end")
}

interface RepeatedCallback { 
  callback: () => Promise<unknown>;
  count: number;
}

export function runInParallel({ callback, count}: RepeatedCallback) {
  const promises = Array.from({ length: count }).map(() => callback())
  return Promise.all(promises)
}

export function runInSequence({ callback, count}: RepeatedCallback) {
  return Array.from({ length: count }).reduce<Promise<unknown>>((promise, _) => promise.then(callback), Promise.resolve())
}