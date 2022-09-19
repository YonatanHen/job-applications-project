import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Profile {
    
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    first_name: string

    @Column()
    last_name: string

    @Column()
    birth_date: string

    @Column()
    email: string

}