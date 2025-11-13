import { Student } from './student.model';

export class Diagnosis {
  id?: number;
  difficultyLevel!: string;
  recommendation!: string;
  createdAt?: Date;
  student?: Student;
}
