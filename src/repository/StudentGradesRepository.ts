import { StudentGrades } from '../domain/StudentGrades';

export abstract class StudentGradesRepository {
  abstract getByStudentId(id: string): Promise<StudentGrades>;
}
