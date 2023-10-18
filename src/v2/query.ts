import { store } from "./store";

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
    const dbRes = await queryDB();
    return dbRes.user;
}

export async function queryDB(): Promise<DBResponse> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                user: {
                    id: store.accessToken.split('_')[2],
                    name: 'John Doe',
                    email: 'yo@john.doe'
                }
            });
        }, 1000);
    });
}