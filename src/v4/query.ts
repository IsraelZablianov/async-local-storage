import { getStore } from "./store";
import { delay } from "./utils";

type UserDetails = {
    id: string;
    name: string;
    email: string;
};

export type DBResponse = { 
    user: UserDetails;
    permissions?: string[];
    metadata?: string;
}

export async function queryUserDetails(): Promise<UserDetails> {
    await delay(Math.random() * 10000);
    const store = getStore();
    console.log(`queryUserDetails: ${store.accessToken}`);

    const dbRes = await queryDB();
    return dbRes.user;
}

export async function queryDB(): Promise<DBResponse> {
    const store = getStore();
    console.log(`queryDB: ${store.accessToken}`);
    await delay(1000);
    return {
        user: {
            id: store.accessToken?.split('_')[2] || '',
            name: 'John Doe',
            email: 'yo@john.doe'
        }
    }
}