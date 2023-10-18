import { AsyncLocalStorage } from 'node:async_hooks';
import { MissingContextException } from './utils';

type Store = {
    accessToken?: string;
}

export const asyncLocalStorage = new AsyncLocalStorage<Store>();

export function getStore(): Store {
    const store = asyncLocalStorage.getStore();

    if (!store) {
      throw new MissingContextException('store is not defined');
    }

    return store;
}