// src/app/components/deleted-jobs/deleted-jobs.component.ts
import { Component } from '@angular/core';

// Mock data - in a real application, this would come from a service
interface DeletedJob {
  jobName: string;
  cronExpression: string;
  url: string;
  deletedAt: Date;
}

@Component({
  selector: 'app-deleted-jobs',
  templateUrl: './deleted-jobs.component.html',
  styleUrls: ['./deleted-jobs.component.scss'],
})
export class DeletedJobsComponent {
  // Mock data
  deletedJobs: DeletedJob[] = [
    {
      jobName: 'OldBackup_Job',
      cronExpression: '0 0 * * *',
      url: 'http://localhost:8083/api/executeOldBackup',
      deletedAt: new Date(2025, 3, 22, 14, 30, 0),
    },
    {
      jobName: 'WeeklyReport',
      cronExpression: '0 9 * * 1',
      url: 'http://localhost:8083/api/executeWeeklyReport',
      deletedAt: new Date(2025, 3, 20, 11, 45, 0),
    },
  ];

  restoreJob(jobName: string): void {
    // In a real application, this would call a service method to restore the job
    console.log(`Restoring job: ${jobName}`);
    // Remove the job from the deleted jobs list (mock implementation)
    this.deletedJobs = this.deletedJobs.filter(
      (job) => job.jobName !== jobName
    );
  }
}
