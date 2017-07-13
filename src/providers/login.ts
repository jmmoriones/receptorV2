import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
//import { SQLite } from 'ionic-native';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import 'rxjs/add/operator/map';
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
	createTransaction(transaction){
		console.log(transaction);
		
		return this.http.post("http://35.184.34.17/api/transaction", transaction)
		.map((response:Response)=>response.json());
	}
	updateTransaction(transaction){
		console.log(transaction);
		
		return this.http.put("http://35.184.34.17/api/transaction", transaction)
		.map((response:Response)=>response.json());
	}
	getUsers(){	
		return this.http.get("http://35.184.34.17/api/receivers")
		.map((response:Response)=>response.json());
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
			db.executeSql('CREATE TABLE IF NOT EXISTS users(id TEXT PRIMARY KEY,name VARCHAR(32), images VARCHAR(15), email VARCHAR(25), phone VARCHAR(15))', {})
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
			db.executeSql('INSERT OR REPLACE INTO users(id,name,email,images, phone)  VALUES (?,?,?,?,?)', [user._id,user.name, user.email, user.img, user.phone])
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
	currentUser(){
		return this.db.create({
			name: 'data.db',
			location: 'default' // the location field is required
		}).then((db: SQLiteObject) => {
			 return db.executeSql('SELECT * FROM users ORDER BY id ASC LIMIT 1',[])
				.then(user=> {
					if(user.rows.length>0) { 
					console.log(user.rows.item(0));           
						return Promise.resolve(user.rows.item(0));
					}else{
						return Promise.resolve({});
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
	getTransaction(num){
		return this.http.get("http://35.184.34.17/api/transactions/"+num)
			.map((res: Response)=>res.json());
	}
	editUser(data){
		console.log(data)
		return this.http.put("http://35.184.34.17/api/receiver",data)
			.map((response:Response)=>response.json());
	}
	editUserTable(user:any){
		this.db.create({
			name: 'data.db',
			location: 'default' // the location field is required
		}).then((db: SQLiteObject) => {
			 console.log('Se Creo el usuario');
			 console.log(user);
			db.executeSql('UPDATE users SET name = ?,email = ?,images = ?, phone = ? WHERE id = ?', [user.name, user.email, user.img, user.phone, user._id] )
				.catch(e => console.log(e));
		}, (err) => {
			console.error('Unable to open database: ', err);
		});
	}
	getUsersTransaction(num){
		return this.http.get('http://35.184.34.17/api/users/'+num)
			.map((response:Response)=>response.json());
	}
	searchTransaction(text:any){
		return this.http.post("http://35.184.34.17/api/transactions/search/", text)
		.map((response:Response)=>response.json());
	}
	searchUsers(user:any){
		return this.http.post("http://35.184.34.17/api/users/search/",user)		.map((response:Response)=>response.json());
	}
	print(value:any){
		return this.http.post("http://35.184.34.17/api/print/", value)
			.map((response:Response)=>response.json());
	}
}