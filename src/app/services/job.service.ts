// src/app/services/job.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Job } from '../models/job';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  private baseUrl = 'http://localhost:8083/jobs';

  constructor(private http: HttpClient) {}

  getAllJobs(): Observable<Job[]> {
    return this.http.get<Job[]>(this.baseUrl);
  }

  getJob(jobName: string): Observable<Job> {
    return this.http.get<Job>(`${this.baseUrl}/get/${jobName}`);
  }

  scheduleJob(
    jobName: string,
    url: string,
    cronExpression: string
  ): Observable<string> {
    const params = new HttpParams()
      .set('jobName', jobName)
      .set('url', url)
      .set('cronExpression', cronExpression);

    return this.http.post<string>(`${this.baseUrl}/schedule`, null, { params });
  }

  updateCron(jobName: string, cronExpression: string): Observable<string> {
    const params = new HttpParams()
      .set('jobName', jobName)
      .set('cronExpression', cronExpression);

    return this.http.put<string>(`${this.baseUrl}/updateCron`, null, {
      params,
    });
  }

  updateUrl(jobName: string, url: string): Observable<string> {
    const params = new HttpParams().set('jobName', jobName).set('url', url);

    return this.http.put<string>(`${this.baseUrl}/updateUrl`, null, { params });
  }

  deleteJob(jobName: string): Observable<string> {
    const params = new HttpParams().set('jobName', jobName);

    return this.http.delete<string>(`${this.baseUrl}/delete`, { params });
  }

  parseCronToHumanReadable(cronExpression: string): string {
    // This is a simplified implementation
    // In a real app, you might want to use a library like 'cron-parser'
    const parts = cronExpression.split(' ');

    if (
      parts[0] === '0' &&
      parts[1] === '*' &&
      parts[2] === '*' &&
      parts[3] === '*' &&
      parts[4] === '*'
    ) {
      return 'Every hour';
    } else if (
      parts[0] === '0' &&
      parts[1] === '8' &&
      parts[2] === '*' &&
      parts[3] === '*' &&
      parts[4] === '1-5'
    ) {
      return 'Weekdays at 8:00 AM';
    } else if (
      parts[0] === '0' &&
      parts[1] === '0' &&
      parts[2] === '*' &&
      parts[3] === '*' &&
      parts[4] === '0'
    ) {
      return 'Weekly on Sunday';
    } else if (
      parts[0] === '0' &&
      parts[1] === '4' &&
      parts[2] === '*' &&
      parts[3] === '*' &&
      parts[4] === '*'
    ) {
      return 'Daily at 4:00 AM';
    }

    return cronExpression;
  }
}
