import "reflect-metadata";

import AppDataSource from './db/dataSource.js';
import waitForPostgres from './db/waitForPostgres.js';
import initializeApp from './app.js';

import { ENV } from './constants/index.js';
import { logs, colors } from './utils/index.js';

(async function main() {
    await waitForPostgres(AppDataSource);

    const PORT = ENV.CRAWLER_PORT || 3001;

    const app = initializeApp();

    app.listen(PORT, () => {
        return logs.log({ color: colors.success, type: "HTTP", message: `CRAWLER: Listening on port ${PORT}` });
    });
})();