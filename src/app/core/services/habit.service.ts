import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  Habit,
  CreateHabitRequest,
  UpdateHabitRequest,
  CheckInRequest
} from '../models/habit.model';
import { ApiResponse } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class HabitService {
  private readonly API_URL = `${environment.apiUrl}/habits`;

  constructor(private http: HttpClient) {}

  /**
   * Get all habits
   */
  getHabits(includeArchived = false): Observable<ApiResponse<Habit[]>> {
    const options = includeArchived 
    ? { params: { includeArchived: 'true' } }
    : {};
    return this.http.get<ApiResponse<Habit[]>>(this.API_URL, options);
  }

  /**
   * Get a single habit by ID
   */
  getHabitById(habitId: string): Observable<ApiResponse<Habit>> {
    return this.http.get<ApiResponse<Habit>>(`${this.API_URL}/${habitId}`);
  }

  /**
   * Create a new habit
   */
  createHabit(request: CreateHabitRequest): Observable<ApiResponse<Habit>> {
    return this.http.post<ApiResponse<Habit>>(this.API_URL, request);
  }

  /**
   * Update a habit
   */
  updateHabit(habitId: string, request: UpdateHabitRequest): Observable<ApiResponse<Habit>> {
    return this.http.put<ApiResponse<Habit>>(`${this.API_URL}/${habitId}`, request);
  }

  /**
   * Delete (archive) a habit
   */
  deleteHabit(habitId: string): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.API_URL}/${habitId}`);
  }

  /**
   * Check-in a habit
   */
  checkIn(habitId: string, request: CheckInRequest = {}): Observable<ApiResponse<Habit>> {
    return this.http.post<ApiResponse<Habit>>(`${this.API_URL}/${habitId}/check-in`, request);
  }
}