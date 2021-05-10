import { Nullable } from '../../common/types/Nullable';
import { SubjectRepository } from '../SubjectRepository';
import { semesterBindings } from './bindings';

export class SubjectRepoFactory {
  static getInstanceByTenant(id: string): Nullable<SubjectRepository> {
    const binding = semesterBindings[id];

    if (!binding) {
      return null;
    }

    const instance = <SubjectRepository> Object.create(binding.prototype);
    instance.constructor.apply(instance);

    return instance;
  }
}