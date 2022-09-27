import Status from "src/enums/status";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Application {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    role: string

    @Column()
    location: string

    @Column()
    date: Date

    @Column()
    status: Status

    @ManyToOne(() => User, (user) => user.applications)
    user: User 
}