import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, Unique } from "typeorm"
import { Profile } from "./Profile"

@Entity()
export class User {
    
    @PrimaryGeneratedColumn()
    id: number
    
    @Column({ unique: true })
    username: string
    
    @Column()
    password: string

    @OneToOne(() => Profile, { eager: true, cascade: true })
    @JoinColumn()
    profile: Profile
}