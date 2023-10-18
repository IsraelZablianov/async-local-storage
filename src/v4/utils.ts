import { Request } from 'express';

export async function checkPermissions(): Promise<boolean> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, 3000);
    });
}

export class NotPermittedException extends Error { }

type QueryParams = {
    id: string;
    timeout: number;
};

export async function extractAccessToken(id: string): Promise<string> { 
    return `access_token_${id}`;
}

export function extractQueryParams(req: Request): QueryParams {
    const { id, timeout } = req.query;

    return {
        id: id as string,
        timeout: Number(timeout) || 0,
    };
}

export function delay(ms = 0): Promise<void> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, ms);
    });
};
