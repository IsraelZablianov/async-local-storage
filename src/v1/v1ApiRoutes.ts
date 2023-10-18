import { Router } from "express";
import { getUserDetails } from "./userDetails";
import { extractQueryParams, extractAccessToken } from "./utils";
import * as path from 'path';

export function v1ApiRoutes() {
    const router = Router();

    router.get(
      path.join('/', 'user-details'), async (req, res) => {

        const { id } = extractQueryParams(req);
        const accessToken = await extractAccessToken(id);
        const userDetails = await getUserDetails(accessToken);
        const response = `requested id: ${id}, user details: ${JSON.stringify(userDetails)}`;
        
        console.log(response);
        res.send(response);
      },
    );

    return router;
}