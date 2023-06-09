import "reflect-metadata";

import cron from 'node-cron';
import puppeteer from 'puppeteer';
import dayjs from 'dayjs';

import AppDataSource from './db/dataSource.js';
import waitForPostgres from './db/waitForPostgres.js';

import * as guildWarsEventControllers from './controllers/guildWarsEventControllers/index.js';

import { colors, logs } from './utils/index.js';

async function handleCrawl() {
    const url = "https://wiki.guildwars2.com/wiki/Event_timers";
    const browser = await puppeteer.launch({
        executablePath: '/usr/bin/google-chrome',
        args: [
            "--disable-gpu",
            "--disable-dev-shm-usage",
            "--disable-setuid-sandbox",
            "--no-sandbox"
        ]
    });

    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle0' });

    const html = await page.content();
    
    const eventData = guildWarsEventControllers.parseEventBars(html);

    await page.close();
    await browser.close();

    return guildWarsEventControllers.createRows(eventData);
};

(async function main() {
    await waitForPostgres(AppDataSource);

    let hourCount = 0;

    logs.log({ color: colors.success, message: `Initial Crawl - ${dayjs().format("M/D/YY HH:mm:ss")}` });
    handleCrawl();

    const task = cron.schedule('0 */1 * * *', () => {
        hourCount += 1;
        logs.log({ color: colors.success, message: `Starting Crawl ${hourCount}/24 - ${dayjs().format("M/D/YY HH:mm:ss")}` });

        handleCrawl();

        if(hourCount >= 24) {
            task.emit("complete");
        }
    });

    task.start();

    task.on("complete", () => {
        task.stop();

        guildWarsEventControllers.createJsonFile();
    });
})();