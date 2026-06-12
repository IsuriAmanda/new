import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import {
  JobTicket,
  JobStageLog,
  Machine,
  ConvertToJobRequest,
  CreateDirectJobRequest
} from '../models/job.models';

@Injectable({ providedIn: 'root' })
export class JobService {

  private http    = inject(HttpClient);
  private apiUrl  = 'http://localhost:3000/api/jobs';

  // ── Signals ────────────────────────────────────────────────
  private jobsSignal    = signal<JobTicket[]>([]);
  private machinesSignal = signal<Machine[]>([]);

  jobs     = this.jobsSignal.asReadonly();
  machines = this.machinesSignal.asReadonly();

  // ── READ ───────────────────────────────────────────────────

  getAll(): Observable<JobTicket[]> {
    return this.http.get<JobTicket[]>(this.apiUrl).pipe(
      tap(data => this.jobsSignal.set(data))
    );
  }

  getJobById(id: number): Observable<JobTicket> {
    return this.http.get<JobTicket>(`${this.apiUrl}/${id}`);
  }

  getJobLogs(id: number): Observable<JobStageLog[]> {
    return this.http.get<JobStageLog[]>(`${this.apiUrl}/${id}/logs`);
  }

  getMachines(): Observable<Machine[]> {
    return this.http.get<Machine[]>(`${this.apiUrl}/machines`).pipe(
      tap(data => this.machinesSignal.set(data))
    );
  }

  // ── CREATE ─────────────────────────────────────────────────

  // Convert confirmed quotation to job
  convertToJob(payload: ConvertToJobRequest): Observable<JobTicket> {
    return this.http.post<JobTicket>(`${this.apiUrl}/convert`, payload).pipe(
      tap(created =>
        this.jobsSignal.update(list => [created, ...list])
      )
    );
  }

  // Create job directly without quotation
  createDirectJob(payload: CreateDirectJobRequest): Observable<JobTicket> {
    return this.http.post<JobTicket>(`${this.apiUrl}/direct`, payload).pipe(
      tap(created =>
        this.jobsSignal.update(list => [created, ...list])
      )
    );
  }

  // ── UPDATE ─────────────────────────────────────────────────

  updateStatus(
    id: number,
    status: string,
    remarks?: string
  ): Observable<JobTicket> {
    return this.http.patch<JobTicket>(
      `${this.apiUrl}/${id}/status`,
      { status, remarks }
    ).pipe(
      tap(updated =>
        this.jobsSignal.update(list =>
          list.map(j => j.job_id === updated.job_id ? updated : j)
        )
      )
    );
  }

  assignMachine(id: number, machineId: number): Observable<JobTicket> {
    return this.http.patch<JobTicket>(
      `${this.apiUrl}/${id}/machine`,
      { machine_id: machineId }
    ).pipe(
      tap(updated =>
        this.jobsSignal.update(list =>
          list.map(j => j.job_id === updated.job_id ? updated : j)
        )
      )
    );
  }

  // ── DELETE ─────────────────────────────────────────────────

  deleteJob(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() =>
        this.jobsSignal.update(list =>
          list.filter(j => j.job_id !== id)
        )
      )
    );
  }
}