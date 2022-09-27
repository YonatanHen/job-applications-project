import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { Application } from "./Application"
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

    @OneToMany(() => Application, (application) => application.user)
    applications: Application[]
}