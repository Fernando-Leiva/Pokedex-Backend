import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {User} from "../entity/User";

export class UserController {

    private userRepository = getRepository(User);

    async all(request: Request, response: Response, next: NextFunction) {
        return this.userRepository.find();
    }

    async one(request: Request, response: Response, next: NextFunction) {
        console.log('-----',await this.userRepository.findOne({where:{email:request.body.email}}))
        return this.userRepository.findOne({where:{email:request.body.email}});
    }

    async save(request: Request, response: Response, next: NextFunction) {
        return this.userRepository.save(request.body);
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