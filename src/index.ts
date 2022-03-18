import "reflect-metadata";
import {createConnection} from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import {Request, Response} from "express";
import {Routes} from "./routes";
import {User} from "./entity/User";
import { UserController } from "./controller/UserController";
var cors = require("cors")

createConnection().then(async connection => {

    const app = express();

    app.use(cors())
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    const controller = new UserController()
    

    // register express routes from defined application routes
    /* Routes.forEach(route => {
        (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
            const result = (new (route.controller as any))[route.action](req, res, next);
            console.log("Resul",result)
            if (result instanceof Promise) {
                result.then(result => result !== null && result !== undefined ? res.json(result) : undefined);

            } else if (result !== null && result !== undefined) {
                res.json(result);
            }
        });
    }); */
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

    // start express server
    app.listen(4000);

   /*  // insert new users for test
    await connection.manager.save(connection.manager.create(User, {
        firstName: "Timber",
        lastName: "Saw",
        age: 27
    }));
    await connection.manager.save(connection.manager.create(User, {
        firstName: "Phantom",
        lastName: "Assassin",
        age: 24
    }));
 */
    console.log("Express server has started on port 3000. Open http://localhost:4000/users to see results");

}).catch(error => console.log(error));
