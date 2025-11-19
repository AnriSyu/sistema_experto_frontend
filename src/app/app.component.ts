import { Component, computed, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { DiagnosisService } from './services/diagnosis.service';
import { Diagnosis } from './models/diagnosis.model';

interface ExpertQuestionOption {
  label: string;
  value: string;
}

interface ExpertQuestion {
  id: string;
  label: string;
  type: 'radio' | 'text' | 'textarea' | 'select';
  placeholder?: string;
  options?: ExpertQuestionOption[];
  sectionLabel?: string;
}

const YES_NO_OPTIONS: ExpertQuestionOption[] = [
  { label: 'Sí', value: 'yes' },
  { label: 'No', value: 'no' }
];

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Sistema Experto - Diagnóstico de Estudiantes';

  readonly questions: ExpertQuestion[] = [
    { id: 'syntaxLogicErrors', label: '¿Cometiste el mismo tipo de error sintáctico o lógico en 3 o más ejercicios consecutivos?', type: 'radio', options: YES_NO_OPTIONS },
    { id: 'activityMotivation', label: '¿No completaste más del 50 % de las actividades prácticas en las últimas 2 semanas?', type: 'radio', options: YES_NO_OPTIONS },
    { id: 'resolutionTime', label: '¿El tiempo promedio que tardas en resolver ejercicios básicos supera el 200 % del promedio del grupo?', type: 'radio', options: YES_NO_OPTIONS },
    { id: 'progressBetweenAttempts', label: '¿Mejoras progresivamente tus resultados entre intentos?', type: 'radio', options: YES_NO_OPTIONS },
    { id: 'experimentationPattern', label: '¿El número de intentos por ejercicio es alto, pero los errores son distintos en cada uno?', type: 'radio', options: YES_NO_OPTIONS },
    { id: 'practiceVsTheory', label: '¿Tienes excelente desempeño práctico pero bajo puntaje en teoría?', type: 'radio', options: YES_NO_OPTIONS },
    { id: 'evaluationAnxiety', label: '¿Comprendes la teoría pero presentas errores por ansiedad o nerviosismo en pruebas cronometradas?', type: 'radio', options: YES_NO_OPTIONS },
    { id: 'noProgress', label: '¿Has tenido progreso nulo durante 3 semanas consecutivas a pesar de tutorías previas?', type: 'radio', options: YES_NO_OPTIONS }
  ];

  readonly expertForm: FormGroup = this.buildForm();
  readonly isSubmitting = signal(false);
  readonly submitError = signal<string | null>(null);
  readonly diagnoses = signal<Diagnosis[] | null>(null);
  readonly hasResult = computed(() => !!this.diagnoses());

  constructor(
      private readonly fb: FormBuilder,
      private readonly diagnosisService: DiagnosisService
  ) {}

  private buildForm(): FormGroup {
    const controls: Record<string, unknown> = { studentId: ['', [Validators.required, Validators.min(1)]] };
    this.questions.forEach(q => controls[q.id] = ['', Validators.required]);
    return this.fb.group(controls);
  }

  onSubmit(): void {
    this.submitError.set(null);
    this.diagnoses.set(null); // Resetear resultados anteriores

    if (this.expertForm.invalid) {
      this.expertForm.markAllAsTouched();
      this.submitError.set('Completa todas las preguntas antes de enviar.');
      return;
    }

    // Construimos el payload exacto que Spring espera
    const answersPayload = this.questions.map((q, index) => ({
      exerciseNumber: index + 1, // o tu mapping real
      answer: this.expertForm.value[q.id] // 'yes' o 'no'
    }));

    const studentId = Number(this.expertForm.value.studentId);

    console.log('Payload a enviar:', { studentId, answers: answersPayload });

    this.isSubmitting.set(true);

    this.diagnosisService.submitExpertAnswers(studentId, answersPayload).subscribe({
      next: (response: Diagnosis[]) => {
        console.log('Respuesta del servidor:', response);
        this.diagnoses.set(response);
        this.isSubmitting.set(false);
      },
      error: (err) => {
        console.error('Error al enviar formulario:', err);
        this.submitError.set('No se pudo enviar el formulario. Intenta nuevamente.');
        this.isSubmitting.set(false);
      }
    });
  }




  trackByQuestion(index: number, question: ExpertQuestion): string {
    return question.id;
  }
}
