import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import { Pokemon } from "../entity/Pokemon";
import { User } from "../entity/User";

export class PokemonController {
    private pokemonRepository = getRepository(Pokemon)
    private userRepository = getRepository(User)
    

    async all(request: Request, response: Response, next: NextFunction) {
        return this.pokemonRepository.find();
    }

    async getMyPokemon(request:Request, response:Response, next:NextFunction){
        const user = await this.userRepository.find({where:{email:request.body.email}})
       // const myPokemons = await this.pokemonRepository.find({where:{user:user}})
        return this.pokemonRepository.find({where:{user:user}})
    }

    async saveToPokedex(request: Request, response: Response, next: NextFunction) {
        const user = await this.userRepository.find({where:{email:request.body.email}})
        const pokemon =  await this.pokemonRepository.find({where:{name:request.body.name}})
        return this.pokemonRepository.update({id:user[0].id},{ users : pokemon[0].users.concat(user) });
    }
    async save(data) {
        return this.pokemonRepository.save(data);
    }


}