import { CurriculumYearRepoFactory } from '../repository/factories/CurriculumYearRepoFactory';
import IUseCase from '../shared/IUseCase';
import { MultiTenantReqDTO } from '../shared/MultiTenantReqDTO';

type RequestDTO = MultiTenantReqDTO & {
  ids: string[];
};
type ResponseDTO = {
  id,
  semesters,
  year
}[];

export class GetCurriculumYears extends IUseCase<RequestDTO, ResponseDTO> {
  async execute(args: RequestDTO): Promise<ResponseDTO> {
    const { tenantId = '', ids = [] } = args;

    const dataSource = CurriculumYearRepoFactory.getInstanceByTenant(tenantId);

    const currYears = await dataSource?.getByIds(ids);

    return currYears?.map(({
      id,
      semesters,
      year
    }) => {
      return {
        id,
        semesters,
        year
      };
    }) as ResponseDTO;
  }
}
