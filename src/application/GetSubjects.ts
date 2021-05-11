import { SubjectRepoFactory } from '../repository/factories/SubjectRepoFactory';
import IUseCase from '../shared/IUseCase';
import { MultiTenantReqDTO } from '../shared/MultiTenantReqDTO';

type RequestDTO = MultiTenantReqDTO & {
  subjectCodes: string[];
};

type ResponseDTO = {
  subjectCode: string;
  description: string;
  noOfUnits: number;
  semester: number;
  preRequisites: string[];
};

export class GetSubjects extends IUseCase<RequestDTO, ResponseDTO[]> {
  async execute(args: RequestDTO): Promise<ResponseDTO[]> {
    const { tenantId = '', subjectCodes = [] } = args;
    const dataSource = SubjectRepoFactory.getInstanceByTenant(tenantId);

    if (!dataSource) {
      throw new Error('Unknown data source encountered');
    }

    const subjects = await dataSource.getByIds(subjectCodes);

    return subjects.map(subject => ({
      description: subject.description,
      noOfUnits: subject.units,
      preRequisites: subject.preRequisites,
      semester: subject.semesterAvailable,
      subjectCode: subject.code
    }));
  }
}