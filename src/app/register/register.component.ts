import { Component, OnInit } from '@angular/core';
import { TodoService} from '../todo.service';
import { Todo } from '../todo'; 
import { from } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  todos : Todo[];

  constructor(private todoservice : TodoService) { }

  ngOnInit() {
    this.todoservice.gettodos().subscribe(restodo => this.todos = restodo);
  }

  addTodo($event,fname,ename,phone,pswd){
    var todoobj = {
      name:fname.value,
      email:ename.value,
      phone:phone.value,
      password:pswd.value,
    };
    var result = this.todoservice.savetodos(todoobj).subscribe(restodo => this.todos = restodo);
    fname.value = "";
    ename.value = "";
    phone.value = "";
    pswd.value = "";  
  }

}
