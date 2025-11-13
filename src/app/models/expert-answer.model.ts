export interface ExpertAnswer {
  exerciseNumber: number;
  answer: 'yes' | 'no';
}

export interface ExpertFormPayload {
  studentId: number;
  answers: ExpertAnswer[];
}
