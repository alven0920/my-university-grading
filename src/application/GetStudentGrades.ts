import { StudentGradesRepoFactory } from '../repository/factories/StudentGradesRepoFactory';
import IUseCase from '../shared/IUseCase';
import { MultiTenantReqDTO } from '../shared/MultiTenantReqDTO';

type RequestDTO = MultiTenantReqDTO & {
  studentId: string;
};

type ResponseDTO = {
  subjects: {
    code: string;
    grade: number;
  }[];
};

export class GetStudentGrades extends IUseCase<RequestDTO, ResponseDTO> {
  async execute(args: RequestDTO): Promise<ResponseDTO> {
    const { tenantId = '', studentId = '' } = args;

    const dataSource = StudentGradesRepoFactory.getInstanceByTenant(tenantId);

    if (!dataSource) {
      throw new Error('Unknown Data Source Encountered.');
    }

    const subjects = await dataSource.getByStudentId(studentId);

    return {
      subjects: subjects.subjectGrades.map(grade => ({
        code: grade.subjectCode,
        grade: grade.generalGrade
      }))
    };
  }
}
