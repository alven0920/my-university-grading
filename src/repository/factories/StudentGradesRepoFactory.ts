import { Nullable } from '../../common/types/Nullable';
import { StudentGradesRepository } from '../StudentGradesRepository';
import { studentGradesBindings } from './bindings';

export class StudentGradesRepoFactory {
  static getInstanceByTenant(id: string): Nullable<StudentGradesRepository> {
    const binding = studentGradesBindings[id];

    if (!binding) {
      return null;
    }

    const instance = <StudentGradesRepository> Object.create(binding.prototype);
    instance.constructor.apply(instance);

    return instance;
  }
}
