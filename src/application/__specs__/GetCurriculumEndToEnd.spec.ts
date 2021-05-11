import { Curriculum, CurriculumYear, CurriculumSemester } from '../../domain/Curriculum';

import { CurriculumRepoFactory } from '../../repository/factories/CurriculumRepoFactory';
import { CurriculumYearRepoFactory } from '../../repository/factories/CurriculumYearRepoFactory';
import { SemesterRepoFactory } from '../../repository/factories/SemesterRepoFactory';

import { GetCurriculumYears } from '../GetCurriculumYears';
import { GetSemesters } from '../GetSemesters';
import { GetCurriculum } from '../GetCurriculum';

import { SubjectRepoFactory } from '../../repository/factories/SubjectRepoFactory';

import { GetSubjects } from '../GetSubjects';

import { Semester } from '../../domain/constants';
import { Subject } from '../../domain/Subject';

const curriculum: Curriculum = {
  courseId: 'BCS',
  curriculumId: '12345',
  curriculumYears: ['12345', '45678']
};

const cyears: CurriculumYear[] = [
  {
    id: '12345',
    semesters: [
      'SEM-1-001',
      'SEM-1-002'
    ],
    year: 1
  },
  {
    id: '45678',
    semesters: [
      'SEM-2-001',
      'SEM-2-002'
    ],
    year: 2
  }
];

const cSemester: CurriculumSemester[] = [
  {
    id: 'SEM-1-001',
    semester: Semester.First,
    subjects: [
      'Comp-101',
      'Eng 101'
    ]
  },
  {
    id: 'SEM-1-002',
    semester: Semester.Second,
    subjects: [
      'Comp-107',
      'Eng 102'
    ]
  },
  {
    id: 'SEM-2-001',
    semester: Semester.First,
    subjects: [
      'Comp-201',
      'Eng-201'
    ]
  }
];

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
  },
  {
    code: 'Comp-107',
    description: 'Data Structures',
    preRequisites: [],
    semesterAvailable: 2,
    units: 3.0
  },
  {
    code: 'Comp-201',
    description: 'Programming Language 2',
    preRequisites: ['Comp-101'],
    semesterAvailable: 2,
    units: 3.0
  },
  {
    code: 'Eng-301',
    description: 'Writing in the discipline',
    preRequisites: [],
    semesterAvailable: 2,
    units: 3.0
  }
];

describe('Get Curriculum End-to-end', () => {
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

    jest.spyOn(CurriculumYearRepoFactory, 'getInstanceByTenant').mockReturnValueOnce({
      getUniqueId: async () => '12345',
      add: async (cy: CurriculumYear) => true,
      update: async (cy: CurriculumYear) => true,
      getById: async (id: string) => cyears.find(({ id: yearId }) =>  yearId === id) || {},
      getByIds: async (id: string[]) => cyears.filter(({ id = '' }) => curriculum?.curriculumYears?.includes(id))
    });

    jest.spyOn(SemesterRepoFactory, 'getInstanceByTenant').mockReturnValue({
      getUniqueId: async () => '12345',
      add: async (cy: CurriculumSemester) => true,
      update: async (cy: CurriculumSemester) => true,
      getById: async (id: string) => cSemester.find(({ id: semId }) =>  semId === id) || {},
      getByIds: async (ids: string[]) => cSemester.filter(({ id = '' }) => ids.includes(id))
    });

    jest.spyOn(SubjectRepoFactory, 'getInstanceByTenant').mockReturnValue({
      getByIds: async (ids: string[]) => subjects.filter(item => ids.includes(item.code))
    });

    const getCurriculumResponse = await new GetCurriculum()
      .execute({
        curriculumId: '12345'
      });

    const { curriculumYears } = getCurriculumResponse;

    const curriculumYearsResponse = await new GetCurriculumYears()
      .execute({
        ids: curriculumYears
      });

    for (const key in curriculumYearsResponse) {
      const { semesters = [] } = curriculumYearsResponse[key];

      const semestersResponse = await new GetSemesters()
        .execute({
          ids: semesters
        });

      expect(semestersResponse.length).toBeGreaterThanOrEqual(1);

      for (const semKey in semestersResponse) {
        const { subjects = [] } = semestersResponse[semKey];

        const subjectDetails = await new GetSubjects()
          .execute({ subjectCodes: subjects });

        expect(subjectDetails.length).toBeGreaterThanOrEqual(1);
      }
    }

    done();
  });
});