import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {User} from "../entity/User";

export class UserController {

    private userRepository = getRepository(User);

    async all(request: Request, response: Response, next: NextFunction) {
        return this.userRepository.find();
    }

    async one(request: Request, response: Response, next: NextFunction) {
        //console.log('-----',await this.userRepository.findOne({where:{email:request.body.email}}))
        return this.userRepository.findOne({where:{email:request.body.email}});
    }

    async save(request: Request, response: Response, next: NextFunction) {
        return this.userRepository.save(request.body);
    }

    async edit(request:Request, response:Response, next:NextFunction){
        const user = await this.userRepository.find({where:{email:request.body.user.email}})
        user[0].age = request.body.user.age
        user[0].name = request.body.user.name
        user[0].gender = request.body.user.gender
        user[0].trainerClass = request.body.user.trainerClass
        user[0].region = request.body.user.region
        return this.userRepository.save(user[0])
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        let userToRemove = await this.userRepository.findOne(request.params.id);
        return this.userRepository.remove(userToRemove);
    }
    async login(request:Request,response:Response,next:NextFunction){
        const user = await this.userRepository.find({where:{email:request.body.email}});
        console.log(user)
        if(user.length>=1){
            return {status:'ok'}
        }else{
            return {status:'error'}
        }
    }
}