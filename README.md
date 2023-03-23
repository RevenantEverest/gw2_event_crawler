# Guild Wars 2 - Event Crawler

A web crawler that parses event information from the [Event Wiki](https://wiki.guildwars2.com/wiki/Event_timers)

---

### Environment Variables

Create a `.env` file in the root directory and inside the `./crawler` directory

```
ENVIRONMENT=DEV
CRAWLER_PORT=3001

DOCKER_REGISTRY=localhost

DB_TYPE=postgres
DB_HOST=db
DB_USERNAME=[desired username]
DB_PASSWORD=[desired password]
DB_NAME=gw2_crawler
DB_PORT=5432
```

### Scripts

- `crawler_shell.sh` - opens shell for the crawler container to run commands
- `clean_dist.sh` - deletes the existing `/dist/` directories for fresh builds from SWC and TypeScript
- `db_shell.sh` - opens the shell for the main database to run commands
- `start_dev.sh` - docker compose command to build and start the development server

### Startup

Run the `start_dev.sh` script in the `/scripts/` directory

A complete crawl consists of 24 hours of crawling to get all different times an event can occur. Exports data to `crawler/output/guildwarsEvents.json`

### Technologies Used

- TypeScript
- SWC
- Puppeteer
- Cheerio
- Docker
- Postgres
- PgAdmin
