import { Router } from "express";
import * as path from 'path';
import { getUserDetails } from "./userDetails";
import { extractQueryParams, extractAccessToken } from "./utils";
import { asyncLocalStorage, getStore } from "./store";

export function v3ApiRoutes() {
    const router = Router();

    router.get(
      path.join('/', 'user-details'), async (req, res) => {

        asyncLocalStorage.run({}, async () => {
          const { id } = extractQueryParams(req);
          console.log(`requested id: ${id}`);
          const store = getStore();

          store.accessToken = await extractAccessToken(id);
          const userDetails = await getUserDetails();
          const response = `response id: ${id}, user details: ${JSON.stringify(userDetails)}`;
          
          console.log(response);
          res.send(response);
        });

      },
    );

    return router;
}