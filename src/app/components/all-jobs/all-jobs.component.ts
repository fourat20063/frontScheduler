// src/app/components/all-jobs/all-jobs.component.ts
import { Component, OnInit } from '@angular/core';
import { JobService } from '../../services/job.service';
import { Job } from '../../models/job';

@Component({
  selector: 'app-all-jobs',
  templateUrl: './all-jobs.component.html',
  styleUrls: ['./all-jobs.component.scss'],
})
export class AllJobsComponent implements OnInit {
  jobs: Job[] = [];
  totalJobs = 0;
  currentPage = 1;
  itemsPerPage = 10;

  constructor(private jobService: JobService) {}

  ngOnInit(): void {
    this.loadJobs();
  }

  loadJobs(): void {
    this.jobService.getAllJobs().subscribe({
      next: (jobs) => {
        this.jobs = jobs.map((job) => ({
          ...job,
          humanReadableSchedule: this.jobService.parseCronToHumanReadable(
            job.cronExpression
          ),
        }));
        this.totalJobs = jobs.length;
      },
      error: (error) => {
        console.error('Error loading jobs', error);
      },
    });
  }

  executeJob(jobName: string): void {
    // In a real app, you would implement job execution logic here
    console.log(`Executing job: ${jobName}`);
  }

  editJob(job: Job): void {
    // In a real app, you would implement edit logic here
    console.log(`Editing job: ${job.jobName}`);
  }

  deleteJob(jobName: string): void {
    if (confirm(`Are you sure you want to delete the job "${jobName}"?`)) {
      this.jobService.deleteJob(jobName).subscribe({
        next: () => {
          this.loadJobs();
        },
        error: (error) => {
          console.error('Error deleting job', error);
        },
      });
    }
  }

  changePage(page: number): void {
    this.currentPage = page;
  }
}
