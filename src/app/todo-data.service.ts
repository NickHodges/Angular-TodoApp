import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Todo } from './todo';
import { isNull } from 'util';
import { ViewContainerData } from '@angular/core/src/view';

@Injectable()
export class TodoDataService {
  constructor(private aHttpService: HttpClient) {}

  // Create/Post todo
  addTodo(todo: Todo): void {
    this.aHttpService.post<Todo>(`http://localhost:3000/todos`, todo).subscribe(
      val => {
        console.log('POST call successful value returned in body', val);
      },
      response => {
        console.log('POST call in error', response);
      },
      () => {
        console.log('The POST observable is now completed.');
      }
    );
  }

  // Delete todo
  deleteTodoById(id: number): void {
    this.aHttpService.delete(`http://localhost:3000/todos/${id}`).subscribe(
      val => {
        console.log('DELETE call successful value returned in body', val);
      },
      response => {
        console.log('DELETE call in error', response);
      },
      () => {
        console.log('The DELETE observable is now completed.');
      }
    );
  }

  // Read/Get All todos
  getAllTodos(): Observable<Array<Todo>> {
    return this.aHttpService.get<Array<Todo>>(`http://localhost:3000/todos`);
  }

  // Read/Get single todo
  getTodoById(id: number): Observable<Todo> {
    return this.aHttpService.get<Todo>(`http://localhost:3000/todos/${id}`);
  }

  // Update/Put todo
  updateTodoById(id: number, newTodo: Todo): void {
    this.aHttpService
      .put<Todo>(`http://localhost:3000/todos/${id}`, newTodo)
      .subscribe(
        val => {
          console.log('PUT call successful value returned in body', val);
        },
        response => {
          console.log('PUT call in error', response);
        },
        () => {
          console.log('The PUT observable is now completed.');
        }
      );
  }

  // Complete function
  toggleTodoComplete(todo: Todo): void {
    todo.complete = !todo.complete;
    this.updateTodoById(todo.id, todo);
  }

  // Get all completed tasks
  completedTodos(): Observable<Array<Todo>> {
    return this.aHttpService.get<Array<Todo>>(
      `http://localhost:3000/todos?complete=true`
    );
  }

  // Get all incomplete tasks
  incompletedTodos(): Observable<Array<Todo>> {
    return this.aHttpService.get<Array<Todo>>(
      `http://localhost:3000/todos?complete=false`
    );
  }
}
