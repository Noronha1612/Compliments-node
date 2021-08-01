import { Repository, EntityRepository } from 'typeorm';

import { Compliment } from '../entities';

@EntityRepository(Compliment)
export class ComplimentsRepository extends Repository<Compliment> {}
