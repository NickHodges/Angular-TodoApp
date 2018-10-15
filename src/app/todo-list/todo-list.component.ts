import { Component, OnInit } from '@angular/core';
import { Todo } from '../todo';
import { TodoDataService } from '../todo-data.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  constructor(private todoDataService: TodoDataService) {}

  completetodos: Observable<Array<Todo>>;
  incompletetodos: Observable<Array<Todo>>;

  onAddTodo(todo: Todo) {
    console.log('onAddTodo called');
    this.todoDataService.addTodo(todo);
  }

  toggleTodoComplete(todo) {
    this.todoDataService.toggleTodoComplete(todo);
  }

  removeTodo(todo) {
    this.todoDataService.deleteTodoById(todo.id);
  }

  editTodo(todo: Todo) {
    todo.editMode = true;
  }

  updateTodo(todo: Todo, editInput) {
    todo.title = editInput.value;
    todo.editMode = false;
    this.todoDataService.updateTodoById(todo.id, todo);
  }

  allTasks(): Observable<Array<Todo>> {
    return this.todoDataService.getAllTodos();
  }

  completedTodos(): Observable<Array<Todo>> {
    return this.todoDataService.completedTodos();
  }

  incompletedToDos(): Observable<Array<Todo>> {
    return this.todoDataService.incompletedTodos();
  }

  ngOnInit() {
    this.completetodos = this.completedTodos();
    this.incompletetodos = this.incompletedToDos();
  }
}
