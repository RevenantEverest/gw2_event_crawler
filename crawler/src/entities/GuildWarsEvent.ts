import {
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
    Column,
    Unique
} from 'typeorm';

@Entity('guild_wars_events')
@Unique(['title', 'time'])
class GuildWarsEvent extends BaseEntity {

    constructor(
        id: number,
        category: string,
        title: string,
        time: string,
        timezone: string
    ) {
        super();
        this.id = id;
        this.category = category;
        this.title = title;
        this.time = time;
        this.timezone = timezone;
    };

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 255 })
    category: string;

    @Column({ type: "varchar", length: 255 })
    title: string;

    @Column({ type: "varchar", length: 10 })
    time: string;

    @Column({ type: "varchar", length: 3 })
    timezone: string;
};

export default GuildWarsEvent;