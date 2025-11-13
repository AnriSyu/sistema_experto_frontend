import { Metric } from './metric.model';
import { Diagnosis } from './diagnosis.model';

export class Student {
  id?: number;
  name!: string;
  email!: string;
  metrics?: Metric[];
  diagnoses?: Diagnosis[];
}
