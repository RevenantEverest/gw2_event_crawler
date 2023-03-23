import fs from 'fs';

import GuildWarsEvent from '../../entities/GuildWarsEvent.js';

import { colors, logs, entities } from '../../utils/index.js';

interface GuildWarsJsonFileEvent {
    title: string,
    times: string[]
};

interface GuildWarsJsonFile {
    category: string,
    events: GuildWarsJsonFileEvent[]
};

async function createJsonFile() {

    const [dbEvents, err] = await entities.index<GuildWarsEvent>(GuildWarsEvent, {
        limit: 1100
    });

    if(err || !dbEvents) {
        if(err) {
            return logs.error({ color: colors.error, type: "DB", message: err.message, err });
        }

        if(!dbEvents) {
            return logs.error({ color: colors.error, type: "DB", message: "No Events Returned" });
        }
    }

    const events: GuildWarsJsonFile[] = [];
    const categories = new Set(dbEvents.map((dbEvent) => dbEvent.category).sort());

    categories.forEach((category) => {
        if(events.filter((event) => event.category === category).length > 0) {
            return;
        }
        const categoryEvents = dbEvents.filter((dbEvent) => dbEvent.category === category).sort((a, b) => a.title.normalize().localeCompare(b.title.normalize()));

        const temp = [];

        for(let i = 0; i < categoryEvents.length; i++) {
            const categoryEvent = categoryEvents[i];

            if(temp.filter((el) => el.title === categoryEvent.title).length > 0) {
                continue;
            }
            
            temp.push({
                title: categoryEvent.title,
                times: dbEvents.filter((dbEvent) =>  dbEvent.title === categoryEvent.title).map((dbEvent) => dbEvent.time).sort()
            });
        };
        
        events.push({
            category: category,
            events: temp
        });
    });

    fs.writeFile("./output/guildwarsEvents.json", JSON.stringify(events, null, 4), (err) => {
        if(err) {
            return logs.error({ color: colors.error, type: "WriteFile", message: err.message, err });
        }

        logs.log({ color: colors.success, message: "File Saved!" });
    });
};

export default createJsonFile;