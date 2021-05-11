import { Subject } from '../../domain/Subject';
import { SubjectRepoFactory } from '../../repository/factories/SubjectRepoFactory';

import { GetSubjects } from '../GetSubjects';

const subjects: Subject[] = [
  {
    code: 'Comp-101',
    description: 'Intro to information technology',
    preRequisites: [],
    semesterAvailable: 1,
    units: 3.0
  },
  {
    code: 'Eng-301',
    description: 'Reading in different disciplines',
    preRequisites: [],
    semesterAvailable: 2,
    units: 3.0
  },
  {
    code: 'Soc-101',
    description: 'Psychology 1',
    preRequisites: [],
    semesterAvailable: 1,
    units: 3.0
  },
  {
    code: 'Soc-102',
    description: 'Psychology 2',
    preRequisites: ['Soc-101'],
    semesterAvailable: 2,
    units: 3.0
  }
];

describe('Get Subjects', () => {
  afterEach((done) => {
    jest.clearAllMocks();

    done();
  });

  it('should return subjects details', async (done) => {
    jest.spyOn(SubjectRepoFactory, 'getInstanceByTenant').mockReturnValueOnce({
      getByIds: async (ids: string[]) => subjects.filter(item => ids.includes(item.code))
    });

    const subjectsResponse = await new GetSubjects()
      .execute({
        subjectCodes: ['Comp-101', 'Comp-102']
      });

    expect(subjectsResponse.length).toEqual(1);

    done();
  });
});