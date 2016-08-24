import { Injectable } from '@angular/core';
import { Todo } from './todo';

@Injectable()
export class TodoService {

  // Placeholder for last id so we can simulate
  // automatic incrementing of id's
  lastId: number = 0;

  // Placeholder for todo's
  todos: Todo[] = [];

  constructor() {}

  // Simulate POST /todos
  addTodo(todo: Todo): TodoService {
    if (!todo.id) {
      this.lastId++;
      todo.id = this.lastId;
    }
    this.todos.push(todo);
    return this;
  }

  // Simulate DELETE /todos/:id
  deleteTodoById(id:number): TodoService {
    this.todos = this.todos
      .filter(todo => todo.id != id);
    return this;
  }

  // Simulate GET /todos/:id
  getTodoById(id:number): Todo {
      return this.todos
        .filter(todo => todo.id === id)
        .pop();
  }

  // Simulate GET /todos
  getAllTodos():Todo[] {
    return this.todos;
  }

  // Simulate PUT /todos/:id
  updateTodoById(id: number, values: Object = {}): Todo {
    let todo = this.getTodoById(id);
    if(!todo) {
      return null;
    }
    Object.assign(todo, values);
    return todo;
  }

  // Toggle todo complete
  toggleTodoComplete(todo: Todo): Todo {
    let updateTodo = this.updateTodoById(todo.id, {
      complete: !todo.complete
    });
    return updateTodo;
  }

}
