import { Nullable } from '../../common/types/Nullable';
import { CurriculumYearRepository } from '../CurriculumYearRepository';
import { curriculumYearsBindings } from './bindings';

export class CurriculumYearRepoFactory {
  static getInstanceByTenant(id: string): Nullable<CurriculumYearRepository> {
    const binding = curriculumYearsBindings[id];

    if (!binding) {
      return null;
    }

    const instance = <CurriculumYearRepository> Object.create(binding.prototype);
    instance.constructor.apply(instance);

    return instance;
  }
}
