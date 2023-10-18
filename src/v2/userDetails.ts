import { queryUserDetails } from "./query";
import { NotPermittedError, checkPermissions } from "./utils";

export async function getUserDetails() {
    const isPermitted = await checkPermissions();

    if (!isPermitted) {
        throw new NotPermittedError('Not permitted');
    }

    return queryUserDetails();
}

