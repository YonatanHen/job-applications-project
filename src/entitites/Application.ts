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
    date: string

    @Column({ type: "enum", enum: Status, default: Status.Q })
    status: Status

    @ManyToOne(() => User, (user) => user.applications, { eager: true, cascade: true })
    user: User
}