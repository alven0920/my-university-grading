export interface StudentGrades {
  studentId: string;
  subjectGrades: SubjectGrade[]; 
}

export interface SubjectGrade {
  subjectCode: string;
  generalGrade: number;
}
