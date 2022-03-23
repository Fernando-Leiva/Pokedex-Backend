import "reflect-metadata";
import {createConnection} from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import {Request, Response} from "express";
import {Routes} from "./routes";
import {User} from "./entity/User";
import { UserController } from "./controller/UserController";
import { PokemonController } from './controller/PokemonController'


var cors = require("cors")

createConnection().then(async connection => {
    
    const app = express();
    
    app.use(cors())
    app.use(express.json());
    app.use(express.json({limit: '50mb'}));
    app.use(express.urlencoded({limit: '50mb', extended: true}));
   // app.use(express.urlencoded({ extended: false }));
    const controller = new UserController()
    const pokemonController = new PokemonController()
   

    app.post('/user',(req:Request, res:Response, next:Function)=>{
        //console.log('Si llegamos')
        controller.one(req,res,next)
        .then(result => res.json(result))
        .catch(error => console.log(error))
    })

    app.post('/users',(req: Request, res: Response, next: Function)=>{
        controller.save(req, res, next)
        .then(result => res.json(result))
        .catch(error => console.error(error))
    })
    app.post('/login',  (req: Request, res: Response, next: Function)=>{
        controller.login(req, res, next)
        .then(result => res.json(result))
        .catch(error => console.error(error))
    })
    
    app.get('/users',(req: Request, res: Response, next: Function)=>{
        controller.all(req, res, next)
        .then(result => res.json(result))
        .catch(error => console.error(error))
    })
    app.put('/user',(req:Request, res:Response, next:Function)=>{
        controller.edit(req,res,next)
        .then(result=>res.json(result))
        .catch(error=>console.log(error))
    })
    app.get('/pokemon',(req:Request, res:Response, next:Function)=>{
        pokemonController.all(req,res,next)
        .then(result => res.json(result))
        .catch(error => console.error(error))
    })
    app.post('/myPokedex',(req:Request,res:Response,next:Function)=>{
        //console.log('Pokedex')
        pokemonController.getMyPokemon(req,res,next)
        .then(result => res.json(result))
        .catch(error => console.log(error))
    })

    app.put('/pokemon',(req:Request,res:Response,next:Function)=>{
        pokemonController.saveToPokedex(req,res,next)
        .then(resul => res.json(resul))
        .catch(error => console.error(error))
    })
    

    app.listen(4000);
    
    console.log("Express server has started on port 4000.");
    
}).catch(error => console.log(error));

