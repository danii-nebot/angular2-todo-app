/* tslint:disable:no-unused-variable */

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';
import { TodoService } from './todo.service';
import { Todo } from './todo';

describe('Todo Service', () => {
  beforeEachProviders(() => [TodoService]);

  describe('getAllTodos()', () => {
    it('should return an empty array by default', inject([TodoService], (service:TodoService) => {
      expect(service.getAllTodos()).toEqual([]);
    }));

    it('should return all todos', inject([TodoService], (service:TodoService) => {
      let todo1 = new Todo({title: 'todo1', complete: false});
      let todo2 = new Todo({title: 'todo2', complete: true});
      service.addTodo(todo1);
      service.addTodo(todo2);
      expect(service.getAllTodos()).toEqual([todo1, todo2]);
    }));
  }); // end getAllTodos testing

  describe('getTodoById(id)', () => {
    it('should fetch newly created todos by their automatically assigned id', inject([TodoService], (service:TodoService) => {
      let todo1 = new Todo({title: 'todo1', complete: false});
      let todo2 = new Todo({title: 'todo2', complete: true});
      service.addTodo(todo1);
      service.addTodo(todo2);
      expect(service.getTodoById(todo1.id)).toEqual(todo1);
      expect(service.getTodoById(todo2.id)).toEqual(todo2);

    }));
  }); // end getTodoById testing

  describe('deleteTodoById(id)', () => {
    it('should remove the todo with the corresponding id', inject([TodoService], (service:TodoService) => {
      let todo1 = new Todo({title: 'todo1', complete: false});
      let todo2 = new Todo({title: 'todo2', complete: true});
      service.addTodo(todo1);
      service.addTodo(todo2);
      service.deleteTodoById(todo1.id);
      expect(service.getAllTodos()).toEqual([todo2]);
      service.deleteTodoById(todo2.id);
      expect(service.getAllTodos()).toEqual([]);
    }));

    it('should not remove anything if the id is not found', inject([TodoService], (service:TodoService) => {
      let todo1 = new Todo({title: 'todo1', complete: false});
      let todo2 = new Todo({title: 'todo2', complete: true});
      service.addTodo(todo1);
      service.addTodo(todo2);
      service.deleteTodoById(12345); // foo id
      expect(service.getAllTodos()).toEqual([todo1, todo2]);
    }));
  }); // end getTodoById testing

  describe('updateTodoById(id, values)', () => {
    it('should update todo in list', inject([TodoService], (service:TodoService) => {
      let todo1 = new Todo({title: 'todo1', complete: false});
      service.addTodo(todo1);
      service.updateTodoById(todo1.id, {title: 'updated title'});
      expect(service.getTodoById(todo1.id).title).toEqual('updated title');
    }));

    it('should return todo with same id and updated data', inject([TodoService], (service:TodoService) => {
      let todo1 = new Todo({title: 'todo1', complete: false});
      service.addTodo(todo1);
      let updatedTodo = service.updateTodoById(todo1.id, {title: 'updated title'});
      expect(updatedTodo.title).toEqual('updated title');
    }));

    it('should return null if the id is not found', inject([TodoService], (service:TodoService) => {
      let notFoundUpdate = service.updateTodoById(12345, {title: 'updated title'});
      expect(notFoundUpdate).toEqual(null);
    }));
  }); // end updateTodoById testing

  describe('toggleTodoComplete(todo)', () => {
    it('should return the updated todo with inverse complete status', inject([TodoService], (service:TodoService) => {
      let todo1 = new Todo({title: 'todo1', complete: false});
      service.addTodo(todo1);
      service.toggleTodoComplete(todo1);
      expect(service.getTodoById(todo1.id).complete).toEqual(true);
      service.toggleTodoComplete(todo1);
      expect(service.getTodoById(todo1.id).complete).toEqual(false);
    }));
  }); // end getTodoById testing

});
