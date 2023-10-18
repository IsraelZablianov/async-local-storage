import { Router } from "express";
import * as path from 'path';
import { getUserDetails } from "./userDetails";
import { extractQueryParams, extractAccessToken } from "./utils";
import { store } from "./store";

export function v2ApiRoutes() {
    const router = Router();

    router.get(
      path.join('/', 'user-details'), async (req, res) => {

        const { id } = extractQueryParams(req);
        store.accessToken = await extractAccessToken(id);
        const userDetails = await getUserDetails();
        const response = `requested id: ${id}, user details: ${JSON.stringify(userDetails)}`;
        
        console.log(response);
        res.send(response);
      },
    );

    return router;
}