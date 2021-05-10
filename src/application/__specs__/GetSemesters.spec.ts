import { CurriculumYear } from '../../domain/Curriculum';
import { CurriculumYearRepoFactory } from '../../repository/factories/CurriculumYearRepoFactory';
import { GetCurriculumYears } from '../GetCurriculumYears';

import { CurriculumSemester } from '../../domain/Curriculum';

import { GetSemesters } from '../GetSemesters';
import { Semester } from '../../domain/constants';
import { SemesterRepoFactory } from '../../repository/factories/SemesterRepoFactory';

const cSemester: CurriculumSemester[] = [
  {
    id: 'SEM-001',
    semester: Semester.First,
    subjects: [
      'Comp 101',
      'Eng 101'
    ]
  },
  {
    id: 'SEM-002',
    semester: Semester.Second,
    subjects: [
      'Comp 107',
      'Eng 102'
    ]
  }
];

describe('Get Curriculum Year', () => {
  afterEach((done) => {
    jest.clearAllMocks();

    done();
  });

  it('should get a particular curriculum year', async (done) => {
    jest.spyOn(SemesterRepoFactory, 'getInstanceByTenant').mockReturnValueOnce({
      getUniqueId: async () => '12345',
      add: async (cy: CurriculumSemester) => true,
      update: async (cy: CurriculumSemester) => true,
      getById: async (id: string) => cSemester.find(({ id: semId }) =>  semId === id) || {},
      getByIds: async (id: string[]) => cSemester
    });

    const getSemesters = await new GetSemesters()
      .execute({
        ids: [
          'SEM-001',
          'SEM-002'
        ]
      });

    expect(getSemesters.length).toBeGreaterThan(1);

    done();
  });
});