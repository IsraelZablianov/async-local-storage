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

export async function queryUserDetails(accessToken: string): Promise<UserDetails> {
    const dbRes = await queryDB(accessToken);
    return dbRes.user;
}

export async function queryDB(accessToken: string): Promise<DBResponse> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                user: {
                    id: accessToken.split('_')[2],
                    name: 'John Doe',
                    email: 'yo@john.doe'
                }
            });
        }, 1000);
    });
}