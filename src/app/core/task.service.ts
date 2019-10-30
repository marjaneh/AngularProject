import { Injectable } from '@angular/core';
import { TaskStatus } from '../dataModel/task-status.enum';
import { Task } from '../models/task';
import { TaskTrackerError } from '../models/TaskTrackerErrors';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }

  tasks: Task[] = [
    {
      id: 1,
      priority: 'P1',
      description: 'desc1desc1desc1 desc1desc1desc1desc1desc1',
      status: TaskStatus.Open,
      dueDate: new Date(2016, 3, 1)
    },
    {
      id: 2,
      priority: 'P2',
      description: 'desc2',
      status: TaskStatus.Closed,
      dueDate: new Date(2014, 3, 20)
    },
    {
      id: 3,
      priority: 'P3',
      description: 'desc3',
      status: TaskStatus.Open,
      dueDate: new Date(2018, 5, 20)
    }
  ];



  getTaskById(id: number): Observable<Task> {
    return this.http.get<Task>('/api/tasks/${id}', {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Authorization': 'my-token'
      })
    });
  }


  // getAllTasks(): Observable<Task[] | TaskTrackerError> {
  //   return this.http.get<Task[]>('/api/tasks')
  //     .pipe(
  //       catchError(err => this.handleHttpError(err))
  //     );
  // }
  // private handleHttpError(error: HttpErrorResponse): Observable<TaskTrackerError> {
  //   let dataError = new TaskTrackerError();
  //   dataError.errorNumber = 100;
  //   dataError.message = error.statusText;
  //   dataError.friendlyMessage = 'An error occurred retrieving data.';
  //   return throwError(dataError);
  // }

  getTasks(): Task[] {
    return this.tasks;
  }

  // addTask(newTask: Task) {
  //   this.tasks.push(newTask)
  // }

  addTask(newTask: Task): Observable<Task> {
    return this.http.post<Task>('/api/tasks', newTask, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  updateTask(updatedTask: Task): Observable<void> {
    return this.http.put<void>('/api/tasks/${updatedTask.taskID}', updatedTask, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  deleteTask(taskID: number): Observable<void> {
    return this.http.delete<void>('/api/tasks/${taskID}');
  }

}


