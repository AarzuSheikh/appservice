import { Component, OnInit } from '@angular/core';
import { TodoService} from '../todo.service';
import { Todo } from '../todo'; 
import { Router } from '@angular/router';
// import { AuthModel } from './authmodel';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  todos : Todo[];
  public myModal;
  // public authmodel = new AuthModel();
  public isauth:boolean=false;
 
  // myclass:Myclass[];
  constructor(private todoservice : TodoService, private router:Router) { }


  ngOnInit() {
    this.todoservice.get1todos().subscribe(restodo => this.todos = restodo);
  }
  ver(nam,pwd){
    var todoobj = {
      name:nam,
      password:pwd,
    };
    var result = this.todoservice.checkauth(todoobj).toPromise().then(dt=> this.isauth=dt);
    if(this.isauth){
      alert("Login Successfull... Please Wait redirecting to myprofile");
      // window.location.href = "/myprofile";
      this.router.navigateByUrl("myprofile");
    }
    else{
      alert("Invalid login Password");
    }
      // {
      //   this.todos = restodo;
        
      //   window.location.href="/myprofile";
      // }
      // );
    // nam.value = "";
    // pwd.value = "";
}
}
