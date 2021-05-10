import { CurriculumYear } from '../domain/Curriculum';

export abstract class CurriculumYearRepository {
  abstract getUniqueId(): Promise<string>;
  abstract getByIds(ids: string[]): Promise<CurriculumYear[]>;
  abstract getById(id: string): Promise<CurriculumYear>;
  abstract add(curriYear: CurriculumYear): Promise<boolean | Error>;
  abstract update(curriYear: CurriculumYear): Promise<boolean | Error>;
}
