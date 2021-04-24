import {EntityRepository, Repository} from 'typeorm';
import {Command} from "../entity/command.entity";

@EntityRepository(Command)
export class CommandRepository extends Repository<Command> {

    constructor() {
        super();
    }

}
