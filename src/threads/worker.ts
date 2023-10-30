import { Worker, isMainThread, parentPort, threadId } from 'worker_threads';
console.log(`Hello from thread ${threadId}`);

if (!(globalThis as any).threads?.length) {
    (globalThis as any).threads = [];
}

if (isMainThread) {
  console.log(`inside main thread thread ${threadId}`);
  (globalThis as any).threads.push(threadId);
  const worker = new Worker(__dirname);
  
  // receive messages from the worker thread
  worker.once('message', (message) => {
    console.log(message + ' received from the worker thread!');
  });

  // send a ping message to the spawned worker thread 
  worker.postMessage('ping');
} else {
  (globalThis as any).threads.push(threadId);
  console.log(`inside else thread ${threadId}`);

  // when a ping message is received, send a pong message back.
  parentPort?.once('message', (message) => {
    console.log(message + ' received from the parent thread!');
    parentPort?.postMessage('pong');
  });
}

console.log(`thread id ${threadId} threads: ${(globalThis as any).threads.join(', ')}`);