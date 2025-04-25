// src/app/components/dashboard/dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { JobService } from '../../services/job.service';
import { Job } from '../../models/job';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  totalJobs = 0;
  recentJobs: Job[] = [];

  constructor(private jobService: JobService) {}

  ngOnInit(): void {
    this.loadDashboard();
  }

  loadDashboard(): void {
    this.jobService.getAllJobs().subscribe({
      next: (jobs) => {
        this.totalJobs = jobs.length;
        // Get the 5 most recently added jobs
        this.recentJobs = jobs.slice(0, 5).map((job) => ({
          ...job,
          humanReadableSchedule: this.jobService.parseCronToHumanReadable(
            job.cronExpression
          ),
        }));
      },
      error: (error) => {
        console.error('Error loading dashboard data', error);
      },
    });
  }
}
