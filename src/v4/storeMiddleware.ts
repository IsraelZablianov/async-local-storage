import { Request, Response, NextFunction } from 'express';
import { asyncLocalStorage } from './store';

export function runWithStoreMiddleware(req: Request, res: Response, next: NextFunction) {
    asyncLocalStorage.run({}, next);
}