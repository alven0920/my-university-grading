import { Subject } from '../domain/Subject';

export abstract class SubjectRepository {
  abstract getByIds(id: string[]): Promise<Subject[]>;
}