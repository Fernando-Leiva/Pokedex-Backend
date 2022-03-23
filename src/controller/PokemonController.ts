import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import { Pokemon } from "../entity/Pokemon";
import { User } from "../entity/User";



export class PokemonController {
    private pokemonRepository = getRepository(Pokemon)
    private userRepository = getRepository(User)
    
    // Function that gets all pokemon in DB.
    async all(request: Request, response: Response, next: NextFunction) {
        return this.pokemonRepository.find();
    }

    //Function that gets all pokemon from my owernship.
    async getMyPokemon(request:Request, response:Response, next:NextFunction){
        return this.userRepository.find({where:{email:request.body.email},relations:['pokemons']})
    }

    // Function that saves a pokemon as my owned.
    async saveToPokedex(request: Request, response: Response, next: NextFunction) {
        const user = await this.userRepository.find({where:{email:request.body.email},relations:['pokemons']})
        const pokemon =  await this.pokemonRepository.find({where:{name:request.body.pokemon.name}})

        if(pokemon.length >= 1){
            user[0].pokemons = user[0].pokemons.concat(pokemon)
        }
        else{
            const newPokemonToDB = await this.pokemonRepository.save(request.body.pokemon);
            const pokemon =  await this.pokemonRepository.find({where:{name:newPokemonToDB.name}})
            console.log(pokemon)
            user[0].pokemons = user[0].pokemons.concat(pokemon)
        }
        return this.userRepository.save(user[0]) 
   
    }
    // Function that saves the pokemon in the DB.
    async save(data) {
        return this.pokemonRepository.save(data);
    }

}