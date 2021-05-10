import { Curriculum, CurriculumSemester } from '../domain/Curriculum';

export abstract class CurriculumRepository {
  abstract getUniqueId(): Promise<string>;
  abstract getById(id: string): Promise<Curriculum>;
  abstract add(curriculum: Curriculum): Promise<boolean | Error>;
  abstract update(curriculum: Curriculum): Promise<boolean | Error>;
}