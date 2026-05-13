import { UserRepository } from "../repostories/user.repository";

export class UserService{
    private readonly _repository: UserRepository
    constructor(userRepository: UserRepository){
        this._repository = userRepository;
    }
}