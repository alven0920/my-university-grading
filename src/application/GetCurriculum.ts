import { CurriculumRepoFactory } from '../repository/factories/CurriculumRepoFactory';
import { CurriculumYearRepoFactory } from '../repository/factories/CurriculumYearRepoFactory';
import IUseCase from '../shared/IUseCase';
import { MultiTenantReqDTO } from '../shared/MultiTenantReqDTO';

type RequestDTO = MultiTenantReqDTO & {
  curriculumId: string;
};

type ResponseDTO = {
  curriculumId: string;
  courseId: string;
  curriculumYears: string[];
};

export class GetCurriculum extends IUseCase<RequestDTO, ResponseDTO> {
  async execute(args: RequestDTO): Promise<ResponseDTO> {
    const { tenantId = '', curriculumId: id } = args;

    const curriculumDataSource = CurriculumRepoFactory.getInstanceByTenant(tenantId);

    const {
      curriculumId = '',
      courseId = '',
      curriculumYears = []
    } = await curriculumDataSource?.getById(id) || {};

    return {
      curriculumId,
      courseId,
      curriculumYears
    };
  }
}