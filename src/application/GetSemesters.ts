import { SemesterRepoFactory } from '../repository/factories/SemesterRepoFactory';
import IUseCase from '../shared/IUseCase';
import { MultiTenantReqDTO } from '../shared/MultiTenantReqDTO';

type RequestDTO = MultiTenantReqDTO & {
  ids: string[];
};

type ResponseDTO = {
  semesterId?: string;
  semester?: number;
  subjects?: string[];
};

export class GetSemesters extends IUseCase<RequestDTO, ResponseDTO[]> {
  async execute(args: RequestDTO): Promise<ResponseDTO[]> {
    const {
      tenantId = '',
      ids = []
    } = args;

    const dataSource = SemesterRepoFactory.getInstanceByTenant(tenantId);

    if (!dataSource) {
      throw new Error('Unknown Data Source Error Encountered');
    }

    const semesters = await dataSource.getByIds(ids);

    return semesters.map((sem) => ({
      semester: sem.semester,
      semesterId: sem.id,
      subjects: sem.subjects
    }));
  }
}
