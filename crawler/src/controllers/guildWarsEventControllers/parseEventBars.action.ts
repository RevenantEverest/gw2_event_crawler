import * as cheerio from 'cheerio';

import { EventData } from '../../types/eventData.js';

function parseEventBars(html: string): EventData[] {

    const $ = cheerio.load(html);
    const eventBarSegments = $(".event-bar-segment").toArray();

    const eventData: EventData[] = [];

    eventBarSegments.slice(15, eventBarSegments.length).forEach((event, index) => {
        if(event.type !== "tag") return;

        const titleAttrib = event.attributes.filter((attribute) =>  attribute.name === "title")[0];

        const category = titleAttrib.value.match(/.+?(?=\n)/g);
        const title = titleAttrib.value.match(/(?<=-\s).*/g);
        const time = titleAttrib.value.match(/(?<=\n).*(?=\s-)/g);

        if(!category || !title || !time) {
            return;
        }

        const data: EventData = {
            category: category[0],
            title: title[0],
            time: time[0],
            timezone: "UTC"
        };
        
        eventData.push(data);
    });

    return eventData;
};

export default parseEventBars;