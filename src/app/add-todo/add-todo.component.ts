import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Todo } from '../todo';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css']
})
export class AddTodoComponent implements OnInit {
  newTodo: Todo = new Todo();

  @Output() addTodoEvent: EventEmitter<Todo> = new EventEmitter();

  constructor() { }

  addTodo() {
    this.addTodoEvent.emit(this.newTodo);
    console.log('event emitted');
    this.newTodo = new Todo();
    console.log('new todo created');
  }

  ngOnInit() {
  }

}
