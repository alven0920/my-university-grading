import { Nullable } from '../../common/types/Nullable';
import { SemesterRepository } from '../SemesterRepository';
import { semesterBindings } from './bindings';

export class SemesterRepoFactory {
  static getInstanceByTenant(id: string): Nullable<SemesterRepository> {
    const binding = semesterBindings[id];

    if (!binding) {
      return null;
    }

    const instance = <SemesterRepository> Object.create(binding.prototype);
    instance.constructor.apply(instance);

    return instance;
  }
}