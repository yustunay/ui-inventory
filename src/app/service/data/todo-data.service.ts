import { Injectable } from '@angular/core';
import { HelloWorldBean } from './welcome-data.service';
import { HttpClient } from '@angular/common/http';
import { Todo } from 'src/app/list-todos/list-todos.component';
import { Constants } from 'src/app/app.constants';

@Injectable({
  providedIn: 'root'
})
export class TodoDataService {

  constructor(
    private http:HttpClient
  ) { }

  retrieveAllTodos(username) {
    return this.http.get<Todo[]>(`${Constants.API_URL}/users/${username}/todos`);
  }

  deleteTodo(username, id) {
    return this.http.delete(`${Constants.API_URL}/users/${username}/todos/${id}`)
  }

  retrieveTodo(username, id) {
    return this.http.get<Todo>(`${Constants.API_URL}/users/${username}/todos/${id}`)
  }

  updateTodo(username, id, todo) {
    return this.http.put(`${Constants.API_URL}/users/${username}/todos/${id}`
                         ,todo)
  }

  createTodo(username, todo) {
    return this.http.post(`${Constants.API_URL}/users/${username}/todos`
                         ,todo)
  }

}