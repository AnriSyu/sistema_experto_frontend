import { Student } from './student.model';

export class Metric {
  id?: number;
  exerciseNumber!: number;
  errors!: number;
  timeSpent!: number;
  attempts!: number;
  student?: Student;
}
