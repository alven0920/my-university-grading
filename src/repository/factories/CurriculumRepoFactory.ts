import { Nullable } from '../../common/types/Nullable';
import { CurriculumRepository } from '../CurriculumRepository';
import { curriculumBinding } from './bindings';

export class CurriculumRepoFactory {
  static getInstanceByTenant(id: string): Nullable<CurriculumRepository> {
    const binding = curriculumBinding[id];

    if (!binding) {
      return null;
    }

    const instance = <CurriculumRepository> Object.create(binding.prototype);
    instance.constructor.apply(instance);

    return instance;
  }
}
