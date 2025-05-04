import { IReposity } from "src/application/repositories/IReposity";
import { VerbEntity } from "src/domain/verb/entities/verb.entity";

export class GetVerbsUseCase {
    constructor(private repository: IReposity<VerbEntity>) { }

    async execute(): Promise<VerbEntity[]> {
        return await this.repository.findAll();
    }
}