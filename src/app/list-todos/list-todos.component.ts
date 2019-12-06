import { Component, OnInit } from '@angular/core';
import { TodoDataService } from '../service/data/todo-data.service';
import { Router } from '@angular/router';

export class Todo {
  constructor(
    public id: number, 
    public description: string,
    public done: boolean,
    public targetDate: Date 
    ){

    }
}

@Component({
  selector: 'app-list-todos',
  templateUrl: './list-todos.component.html',
  styleUrls: ['./list-todos.component.css']
})

export class ListTodosComponent implements OnInit {

   todos: Todo[]

   message: string
 //     new Todo(1, "Learn to dance",false,new Date()),
 //     new Todo(2,"Become an Expert at Angular",false,new Date()),
 //     new Todo(3, "Visit India",false,new Date()) 
 //  ]

  constructor(
    private todoService:TodoDataService,
    private router:Router
  ) { }

  ngOnInit() {
    this.refreshTodos()
  }

  refreshTodos(){
    this.todoService.retrieveAllTodos('in28minutes').subscribe(
      response => {
        console.log(response);
        this.todos = response;
      }
    )
  }

  deleteTodo(id){
    console.log(`Delete todo ${id}`)
    this.todoService.deleteTodo('in28minutes', id).subscribe(
      response => {
        console.log(response);
        this.message = `Delete of Todo ${id} successful!`
        this.refreshTodos()
      }
    )
  }

  updateTodo(id){
    console.log(`update ${id}`)
    this.router.navigate(["todos",id])
  }

  addTodo(){
    this.router.navigate(['todos',-1])
  }

}
