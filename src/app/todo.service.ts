import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';
// import {Observable, from } from 'rxjs';
import { Todo } from "./todo";
import { map} from 'rxjs/operators';
import { Observable,  of as observableOf } from 'rxjs';
// import { Myclass } from './myclass';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private geturl = '/api';
  private posturl = '/api';
  public myurl='/api';
  public isauth:boolean=false;
  public fetcheddata =new Todo();
  dbobj={};


  constructor(private http: HttpClient) { }
  gettodos():Observable<Todo[]>{
    return this.http.get<Todo[]>(this.geturl).pipe(map(res => res));
  }

  savetodos(todo):Observable<Todo[]>{
    return this.http.post<Todo[]>(this.posturl, todo).pipe(map(res => res));
  } //post todo

  get1todos():Observable<Todo[]>{
    return this.http.get<Todo[]>(this.geturl).pipe(map(res => res));
  }

  save1todos(todo):Observable<Todo[]>{
    return this.http.post<Todo[]>(this.posturl, todo).pipe(map(res => res));
  }

  

  checkauth(authmodel): Observable<boolean>{    
    this.http.post(this.myurl,authmodel).subscribe(res=>{
      if(res==null){
        this.isauth=false;
        console.log("Subscribe returned : "+ this.isauth);
      }
      else if(res!=null){
        this.dbobj=res;
        
        this.fetcheddata["name"] = this.dbobj["name"];
        this.fetcheddata["email"] = this.dbobj["email"];
        this.fetcheddata["phone"] = this.dbobj["phone"];
        this.isauth=true;
        console.log("Subscribe returned : "+ this.isauth);
      }
    });
    return observableOf(this.isauth);
  }

  getdata(){
    console.log(this.fetcheddata);
    return this.fetcheddata;
  }
  // logincheck(myclobj):Observable<Myclass[]> {
  //   console.log(myclobj);
  //  return this.http.get<Myclass[]>(this.myurl+'/'+myclobj).pipe(map(res=>res));
  // }
}
