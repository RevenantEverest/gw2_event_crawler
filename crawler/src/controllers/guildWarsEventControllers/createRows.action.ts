import GuildWarsEvent from '../../entities/GuildWarsEvent.js';
import { EventData } from '../../types/eventData.js';

import { colors, logs, entities } from '../../utils/index.js';

async function createRows(eventData: EventData[]) {

    let duplicateAmount = 0;
    let successfulRows = 0;

    for(let i = 0; i < eventData.length; i++) {
        const event = eventData[i];

        const [eventInsert, err] = await entities.insert<GuildWarsEvent>(GuildWarsEvent, event);
        
        if(err) {
            if(err.toString() === 'QueryFailedError: duplicate key value violates unique constraint "UQ_64959e1d3a2948143338f4058f3"') {
                duplicateAmount += 1;
                continue;
            }
            logs.error({ color: colors.error, type: "DB", message: err.message, err });
            continue;
        }

        if(!eventInsert) {
            logs.error({ color: colors.warning, type: "DB", message: "No Return From Insert" });
            continue;
        }

        successfulRows += 1;
    };

    logs.log({ color: colors.banana, type: "DB", message: `${duplicateAmount} Duplicate Key(s)` });
    logs.log({ color: colors.success, type: "DB", message: `${successfulRows} New Row(s) Created` });
};

export default createRows;