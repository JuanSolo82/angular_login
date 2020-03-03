import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.model';
import { map } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	private url 	= 'https://identitytoolkit.googleapis.com/v1/accounts:';
	private apikey 	= 'AIzaSyA1tvqPPxI56DXpvKn7VmsHn3cLp9JPjJY';
	userToken: string;
	// para crear usuario
	// https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]

	// para hacer login con email registrado
	// https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]


	constructor(private http: HttpClient) { 
		this.leerToken();
	 }

	logout(){}

	login(usuario: UsuarioModel){
		const authData = {
			...usuario,
			returnSecureToken: true
		};
		return this.http.post(
			`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.apikey}`,
			authData
		).pipe(
			map(resp => {
				this.guardarToken(resp['idToken']);
				return resp;
			})
		);
	}

	nuevoUsuario(usuario: UsuarioModel){
		// forma fácil pero se puede resumir
		/*const authData = {
			email: usuario.email,
			password: usuario.password,
			returnSecureToken: true
		};*/

		// forma resumida de la declaración anterior
		const authData = {
			...usuario,
			returnSecureToken: true
		};
		return this.http.post(
			`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.apikey}`,
			authData
		).pipe(
			map( resp =>{
				this.guardarToken(resp['idToken']);
				return resp;
			})
		);
	}

	private guardarToken(idToken: string){
		this.userToken = idToken;
		localStorage.setItem('token', idToken);
	}
	leerToken(){
		if (localStorage.getItem('token')){
			this.userToken = localStorage.getItem('token');
		} else {
			this.userToken = '';
		}
		return this.userToken;
	}
}
