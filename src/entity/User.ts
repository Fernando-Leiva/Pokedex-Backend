import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('text', {nullable:true})
    name: string
    
    @Column('text',{nullable:true})
    nickname: string

    @Column('text',{nullable:true})
    region: string

    @Column('text',{nullable:true})
    gender: string;

    @Column('text',{nullable:true})
    email: string;

    @Column('text',{nullable:true})
    age: string;

    @Column('text',{nullable:true})
    trainerClass:string

}
