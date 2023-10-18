
import express, { Application } from 'express';
import * as path from 'path';
import { v1ApiRoutes } from './v1/v1ApiRoutes';
import { v2ApiRoutes } from './v2/v2ApiRoutes';
import { v3ApiRoutes } from './v3/v3ApiRoutes';
import { v4ApiRoutes } from './v4/v4ApiRoutes';

const app: Application = express();
const port = 8000;

app.use(path.join('/', 'v1'), v1ApiRoutes());
app.use(path.join('/', 'v2'), v2ApiRoutes());
app.use(path.join('/', 'v3'), v3ApiRoutes());
app.use(path.join('/', 'v4'), v4ApiRoutes());

app.listen(port, () => {
    console.log(`Server is Fire at http://localhost:${port}`);
});