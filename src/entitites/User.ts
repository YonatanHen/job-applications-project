import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { Profile } from "./Profile"

@Entity()
export class User {
    
    @PrimaryGeneratedColumn()
    id: number
    
    @Column()
    username: string
    
    @Column()
    password: string

    @OneToOne(() => Profile)
    @JoinColumn()
    profile_id: Profile
}