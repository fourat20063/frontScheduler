export interface Job {
  jobName: string;
  cronExpression: string;
  url: string;
  humanReadableSchedule?: string; // For displaying in a user-friendly format
}
