import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
//import { SQLite } from 'ionic-native';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import 'rxjs/add/operator/map';

/*
  Generated class for the Login provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
//http://35.184.34.17/api/transactions
@Injectable()
export class LoginProvider {
  db:SQLite=null;
  open:any=null;
  constructor(public http: Http) {
    this.db= new SQLite();
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
  openDataBase(){
    return this.db.create({

      name: 'data.db',
      location: 'default' // the location field is required
    }).then((db: SQLiteObject) => {
      this.open=db;
      db.executeSql('CREATE TABLE IF NOT EXISTS users(id INTEGER PRIMARY KEY AUTOINCREMENT,name VARCHAR(32), images VARCHAR(15), email VARCHAR(25))', {})
        .then(() => console.log('Executed SQL'))
        .catch(e => console.log(e));
    }, (err) => {
      console.error('Unable to open database: ', err);
    });
  }
  saveUser(user:any){
    this.db.create({
      name: 'data.db',
      location: 'default' // the location field is required
    }).then((db: SQLiteObject) => {
       console.log('Se Creo el usuario');
       console.log(user);
      db.executeSql('INSERT OR REPLACE INTO users(name,email,images)  VALUES (?,?,?)', [user.name, user.img, user.email])
        .then(() => console.log('Executed SQL'))
        .catch(e => console.log(e));
    }, (err) => {
      console.error('Unable to open database: ', err);
    });
  }
  checkUser(){
    return this.db.create({
      name: 'data.db',
      location: 'default' // the location field is required
    }).then((db: SQLiteObject) => {
       return db.executeSql('SELECT * FROM users ORDER BY id ASC LIMIT 1',[])
        .then(user=> {
          if(user.rows.length>0) {            
            return Promise.resolve(true);
          }else{
            return Promise.resolve(false);
          }
        });
    }, (err) => {
      console.error('Unable to open database: ', err);
    });
  }
  closeSesion(){
    return this.db.create({
      name: 'data.db',
      location: 'default' // the location field is required
    }).then((db: SQLiteObject) => {
      return db.executeSql('DELETE FROM users',[]);
    })
  }
}