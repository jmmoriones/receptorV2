import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the Login provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class LoginProvider {
  constructor(public http: Http) {
  }
  validar(user:any){
  	console.log(user);
  	
  	return this.http.post("http://35.184.34.17/api/receiver/sign-in", user)
  	.map((response:Response)=>response.json());
  }

  getUsers(){	
  	return this.http.get("http://35.184.34.17/api/receivers")
  	.map((response:Response)=>response.json());
  }
  reposGithub(){
    return this.http.get("https://api.github.com/users/codigofacilito/repos");
  }
  validarCodeUser(code:any){
    console.log(code);
    
    return this.http.post("http://35.184.34.17/api/user-code", code)
    .map((response:Response)=>response.json());
  }
  createUser(user:any){
    
    return this.http.post("http://35.184.34.17/api/user", user)
    .map((response:Response)=>response.json());
  }
}
