import {Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable} from "typeorm";
import { Pokemon } from "./Pokemon";

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
    @ManyToMany(()=>Pokemon, pokemon => pokemon.name,{nullable:true})
    @JoinTable()
    pokemons: Pokemon[]

}
