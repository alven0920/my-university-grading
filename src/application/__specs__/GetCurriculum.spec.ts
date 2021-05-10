import { Curriculum } from '../../domain/Curriculum';
import { CurriculumRepoFactory } from '../../repository/factories/CurriculumRepoFactory';

import { GetCurriculum } from '../../application/GetCurriculum';

const curriculum: Curriculum = {
  courseId: 'BCS',
  curriculumId: '12345',
  curriculumYears: ['1111', '2222', '3333']
};

describe('Get Registration Service', () => {
  afterEach((done) => {
    jest.clearAllMocks();

    done();
  });

  it('should return basic info of the curriculum', async (done) => {
    jest.spyOn(CurriculumRepoFactory, 'getInstanceByTenant').mockReturnValueOnce({
      getUniqueId: async () => '12345',
      add: async (curr: Curriculum) => true,
      getById: async (id: string) => curriculum,
      update: async (curr: Curriculum) => true,
    });

    const getUseCase = new GetCurriculum();
    const result = await getUseCase.execute({
      curriculumId: '12345'
    });

    expect(typeof result.courseId).toBe('string');
    expect(result.curriculumId).toEqual('12345');
    expect(result.curriculumYears).toEqual(['1111', '2222', '3333']);

    done();
  });
});