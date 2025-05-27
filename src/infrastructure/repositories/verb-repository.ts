import { IReposity } from "src/application/repositories/IReposity";
import { VerbEntity } from "src/domain/verb/entities/verb.entity";

export class VerbRepository implements IReposity<VerbEntity> {

    
    create(entity: VerbEntity): Promise<VerbEntity> {
        throw new Error('Method not implemented.');
    }
    findById(id: number): Promise<VerbEntity> {
        throw new Error('Method not implemented.');
    }
    findAll(): Promise<VerbEntity[]> {
        throw new Error('Method not implemented.');
    }
}