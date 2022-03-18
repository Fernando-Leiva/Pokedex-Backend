import {Entity,  PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class Move {
    
    @PrimaryGeneratedColumn()
    id: number

    @Column('text',{nullable:true})
    moveName: string

}