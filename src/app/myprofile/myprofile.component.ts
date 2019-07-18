import { Component, OnInit } from '@angular/core';
import { TodoService } from '../todo.service';
import { Todo } from '../todo';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.css']
})
export class MyprofileComponent implements OnInit {
  public name="";
  public phone;
  public email="";
  public password="";
  public localobj=new Todo();
  
  constructor(private todos:TodoService) {
    // this.name=this.todos.fetcheddata["name"];
    // console.log(this.todos.fetcheddata);
   }

  ngOnInit() {
    this.localobj=this.todos.getdata();//this.name mein getdata() jo return kara h fetchdata wo jara h
    this.name=this.localobj.name;
    this.email=this.localobj.email;
    this.phone=this.localobj.phone;
    // console.log(this.todos.getdata());
    
  }

}
