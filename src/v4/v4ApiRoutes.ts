import { Router } from "express";
import * as path from 'path';
import { getUserDetails } from "./userDetails";
import { extractQueryParams, extractAccessToken } from "./utils";
import { getStore } from "./store";
import { runWithStoreMiddleware } from "./storeMiddleware";

export function v4ApiRoutes() {
    const router = Router();
    router.use(runWithStoreMiddleware);

    router.get(
      path.join('/', 'user-details'), async (req, res) => {

          const { id } = extractQueryParams(req);
          const store = getStore();

          store.accessToken = await extractAccessToken(id);
          const userDetails = await getUserDetails();
          const response = `requested id: ${id}, user details: ${JSON.stringify(userDetails)}`;
          
          console.log(response);
          res.send(response);

      },
    );

    return router;
}