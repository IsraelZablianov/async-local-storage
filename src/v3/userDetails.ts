import { queryUserDetails } from "./query";
import { NotPermittedException, checkPermissions } from "./utils";

export async function getUserDetails() {
    const isPermitted = await checkPermissions();

    if (!isPermitted) {
        throw new NotPermittedException('Not permitted');
    }

    return queryUserDetails();
}

