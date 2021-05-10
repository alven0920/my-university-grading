import { Semester } from './constants';

export interface Subject {
  code?: string;
  description?: string;
  semesterAvailable?: Semester;
  units?: number;
  preRequisites?: string[];
}