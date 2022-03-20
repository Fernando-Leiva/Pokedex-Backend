import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn, ManyToMany, JoinTable } from "typeorm"
import { Move } from "./Move"
import { User } from "./User"

@Entity()
export class Pokemon{
    @PrimaryColumn()
    id: number
    
    @Column('text',{nullable:true})
    name: string

    @Column('text',{nullable:true})
    nickname: string

    @Column('text',{nullable:true})
    gender: string

    @ManyToMany(()=>Move, (move)=>move.moveName)
    @JoinTable()
    moves: Move[]

    @Column("text",{nullable:true})
    picture: string

    @ManyToMany(()=>User, user => user.id ,{nullable:true})
    @JoinTable()
    users: User[]
}