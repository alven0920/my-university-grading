import { SemesterRepoFactory } from '../repository/factories/SemesterRepoFactory';
import IUseCase from '../shared/IUseCase';
import { MultiTenantReqDTO } from '../shared/MultiTenantReqDTO';

type RequestDTO = MultiTenantReqDTO & {
  id: string;
};

type ResponseDTO = {
  semesterId?: string;
  semester?: number;
  subjects?: string[];
};

export class GetSemester extends IUseCase<RequestDTO, ResponseDTO> {
  async execute(args: RequestDTO): Promise<ResponseDTO> {
    const {
      tenantId = '',
      id = ''
    } = args;

    const dataSource = SemesterRepoFactory.getInstanceByTenant(tenantId);

    if (!dataSource) {
      throw new Error('Unknown Data Source Error Encountered');
    }

    const {
      id: semesterId,
      semester,
      subjects
    } = await dataSource.getById(id);

    return {
      semesterId,
      semester,
      subjects
    };
  }
}
