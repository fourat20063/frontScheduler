// src/app/components/add-job/add-job.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JobService } from '../../services/job.service';

@Component({
  selector: 'app-add-job',
  templateUrl: './add-job.component.html',
  styleUrls: ['./add-job.component.scss'],
})
export class AddJobComponent {
  jobForm: FormGroup;
  submitting = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private jobService: JobService
  ) {
    this.jobForm = this.fb.group({
      jobName: [
        '',
        [Validators.required, Validators.pattern(/^[a-zA-Z0-9_]+$/)],
      ],
      url: ['', [Validators.required, Validators.pattern(/^https?:\/\/.+/)]],
      cronExpression: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^[0-9*\/-,]+\s[0-9*\/-,]+\s[0-9*\/-,]+\s[0-9*\/-,]+\s[0-9*\/-,]+$/
          ),
        ],
      ],
    });
  }

  onSubmit(): void {
    if (this.jobForm.invalid) {
      return;
    }

    this.submitting = true;
    const formValue = this.jobForm.value;

    this.jobService
      .scheduleJob(formValue.jobName, formValue.url, formValue.cronExpression)
      .subscribe({
        next: () => {
          this.router.navigate(['/jobs']);
        },
        error: (error) => {
          console.error('Error scheduling job', error);
          this.submitting = false;
        },
      });
  }

  onCancel(): void {
    this.router.navigate(['/jobs']);
  }
}
