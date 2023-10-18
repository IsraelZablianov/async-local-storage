import { queryUserDetails } from "./query";
import { NotPermittedError, checkPermissions } from "./utils";

export async function getUserDetails(accessToken: string) {
    const isPermitted = await checkPermissions(accessToken);
    if (!isPermitted) {
        throw new NotPermittedError('Not permitted');
    }

    return queryUserDetails(accessToken);
}

