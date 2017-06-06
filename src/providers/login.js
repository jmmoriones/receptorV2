"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
//import { SQLite } from 'ionic-native';
var sqlite_1 = require('@ionic-native/sqlite');
require('rxjs/add/operator/map');
var LoginProvider = (function () {
    function LoginProvider(http) {
        this.http = http;
        this.db = null;
        this.open = null;
        this.db = new sqlite_1.SQLite();
    }
    LoginProvider.prototype.validar = function (user) {
        console.log(user);
        return this.http.post("http://35.184.34.17/api/receiver/sign-in", user)
            .map(function (response) { return response.json(); });
    };
    LoginProvider.prototype.createTransaction = function (transaction) {
        console.log(transaction);
        return this.http.post("http://35.184.34.17/api/transaction", transaction)
            .map(function (response) { return response.json(); });
    };
    LoginProvider.prototype.updateTransaction = function (transaction) {
        console.log(transaction);
        return this.http.put("http://35.184.34.17/api/transaction", transaction)
            .map(function (response) { return response.json(); });
    };
    LoginProvider.prototype.getUsers = function () {
        return this.http.get("http://35.184.34.17/api/receivers")
            .map(function (response) { return response.json(); });
    };
    LoginProvider.prototype.reposGithub = function () {
        return this.http.get("https://api.github.com/users/codigofacilito/repos");
    };
    LoginProvider.prototype.validarCodeUser = function (code) {
        console.log(code);
        return this.http.post("http://35.184.34.17/api/user-code", code)
            .map(function (response) { return response.json(); });
    };
    LoginProvider.prototype.createUser = function (user) {
        return this.http.post("http://35.184.34.17/api/user", user)
            .map(function (response) { return response.json(); });
    };
    LoginProvider.prototype.openDataBase = function () {
        var _this = this;
        return this.db.create({
            name: 'data.db',
            location: 'default' // the location field is required
        }).then(function (db) {
            _this.open = db;
            db.executeSql('CREATE TABLE IF NOT EXISTS users(id TEXT PRIMARY KEY,name VARCHAR(32), images VARCHAR(15), email VARCHAR(25))', {})
                .then(function () { return console.log('Executed SQL'); })
                .catch(function (e) { return console.log(e); });
        }, function (err) {
            console.error('Unable to open database: ', err);
        });
    };
    LoginProvider.prototype.saveUser = function (user) {
        this.db.create({
            name: 'data.db',
            location: 'default' // the location field is required
        }).then(function (db) {
            console.log('Se Creo el usuario');
            console.log(user);
            db.executeSql('INSERT OR REPLACE INTO users(id,name,email,images)  VALUES (?,?,?,?)', [user._id, user.name, user.img, user.email])
                .then(function () { return console.log('Executed SQL'); })
                .catch(function (e) { return console.log(e); });
        }, function (err) {
            console.error('Unable to open database: ', err);
        });
    };
    LoginProvider.prototype.checkUser = function () {
        return this.db.create({
            name: 'data.db',
            location: 'default' // the location field is required
        }).then(function (db) {
            return db.executeSql('SELECT * FROM users ORDER BY id ASC LIMIT 1', [])
                .then(function (user) {
                if (user.rows.length > 0) {
                    return Promise.resolve(true);
                }
                else {
                    return Promise.resolve(false);
                }
            });
        }, function (err) {
            console.error('Unable to open database: ', err);
        });
    };
    LoginProvider.prototype.currentUser = function () {
        return this.db.create({
            name: 'data.db',
            location: 'default' // the location field is required
        }).then(function (db) {
            return db.executeSql('SELECT * FROM users ORDER BY id ASC LIMIT 1', [])
                .then(function (user) {
                if (user.rows.length > 0) {
                    console.log(user.rows.item(0));
                    return Promise.resolve(user.rows.item(0));
                }
                else {
                    return Promise.resolve({});
                }
            });
        }, function (err) {
            console.error('Unable to open database: ', err);
        });
    };
    LoginProvider.prototype.closeSesion = function () {
        return this.db.create({
            name: 'data.db',
            location: 'default' // the location field is required
        }).then(function (db) {
            return db.executeSql('DELETE FROM users', []);
        });
    };
    LoginProvider.prototype.getTransaction = function () {
        return this.http.get("http://35.184.34.17/api/transactions")
            .map(function (res) { return res.json(); });
    };
    LoginProvider = __decorate([
        core_1.Injectable()
    ], LoginProvider);
    return LoginProvider;
}());
exports.LoginProvider = LoginProvider;
