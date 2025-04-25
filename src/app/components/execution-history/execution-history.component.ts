// src/app/components/execution-history/execution-history.component.ts
import { Component } from '@angular/core';

// In a real application, you would create an interface and service for execution history
interface ExecutionRecord {
  id: number;
  jobName: string;
  status: 'SUCCESS' | 'FAILED';
  executedAt: Date;
  duration: number; // in milliseconds
  message?: string;
}

@Component({
  selector: 'app-execution-history',
  templateUrl: './execution-history.component.html',
  styleUrls: ['./execution-history.component.scss'],
})
export class ExecutionHistoryComponent {
  // Mock data - in a real application, this would come from a service
  executionRecords: ExecutionRecord[] = [
    {
      id: 1,
      jobName: 'DataBase_backup',
      status: 'SUCCESS',
      executedAt: new Date(2025, 3, 24, 15, 0, 0),
      duration: 1520,
    },
    {
      id: 2,
      jobName: 'Email_reports',
      status: 'SUCCESS',
      executedAt: new Date(2025, 3, 24, 8, 0, 0),
      duration: 3250,
    },
    {
      id: 3,
      jobName: 'Log_cleanup',
      status: 'FAILED',
      executedAt: new Date(2025, 3, 21, 0, 0, 0),
      duration: 420,
      message: 'Permission denied',
    },
    {
      id: 4,
      jobName: 'Data_export',
      status: 'SUCCESS',
      executedAt: new Date(2025, 3, 24, 4, 0, 0),
      duration: 8750,
    },
  ];

  formatDuration(milliseconds: number): string {
    if (milliseconds < 1000) {
      return `${milliseconds}ms`;
    } else if (milliseconds < 60000) {
      return `${(milliseconds / 1000).toFixed(2)}s`;
    } else {
      const minutes = Math.floor(milliseconds / 60000);
      const seconds = ((milliseconds % 60000) / 1000).toFixed(2);
      return `${minutes}m ${seconds}s`;
    }
  }
}
