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

  completetodos: Array<Todo>;
  incompletetodos: Array<Todo>;

  onAddTodo(todo: Todo) {
    console.log('onAddTodo called');
    this.todoDataService.addTodo(todo).subscribe(val => {
      this.incompletetodos.push(val);
    });
  }

  makeComplete(todo) {
    this.todoDataService.toggleTodoComplete(todo).subscribe(val => {
    const index = this.completetodos.findIndex(todo => todo.id === val.id);
      this.incompletetodos.splice(index, 1);
      val.complete = false;
      this.completetodos.push(val);
    });
  }

  makeIncomplete(todo) {
    this.todoDataService.toggleTodoComplete(todo).subscribe(val => {
      const index = this.incompletetodos.findIndex(todo => todo.id === val.id);
      this.completetodos.splice(index, 1);
      val.complete = false;
      this.incompletetodos.push(val);
    });
  }

  removeTodo(todo) {
    this.todoDataService.deleteTodoById(todo.id).subscribe(val => {
      const index = this.incompletetodos.findIndex(todo => todo.id === val.id);
      this.incompletetodos.splice(index, 1);
    });
  }

  editTodo(todo: Todo) {
    todo.editMode = true;
  }

  updateTodo(todo: Todo, editInput) {
    todo.title = editInput.value;
    todo.editMode = false;
    this.todoDataService.updateTodoById(todo.id, todo);
  }

  allTasks(): Array<Todo> {
    this.completedTodos();
    this.incompletedToDos();
    return this.completetodos.concat(this.incompletetodos);
  }

  completedTodos() {
    this.todoDataService
      .completedTodos()
      .subscribe(todos => (this.completetodos = todos));
  }

  incompletedToDos() {
    this.todoDataService
      .incompletedTodos()
      .subscribe(todos => (this.incompletetodos = todos));
  }

  ngOnInit() {
    this.RefreshTodos();
  }

  private RefreshTodos() {
    this.completedTodos();
    this.incompletedToDos();
  }
}
