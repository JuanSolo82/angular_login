import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/service/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	usuario: UsuarioModel = new UsuarioModel();
	
	constructor(private auth: AuthService,
				private router: Router) { }

	ngOnInit() {}

	login(form: NgForm){
		if (form.invalid){
			console.log("inválido");
			return;
		}
		Swal.fire({
			allowOutsideClick: false,
			title: 'Aviso',
			text: 'Espere por favor...'
		});
		Swal.showLoading();


		this.auth.login( this.usuario )
			.subscribe(resp => {
				console.log(resp);
				Swal.close();
				this.router.navigateByUrl('/home')
			}, (err) => {
				Swal.fire({
					icon: 'error',
					title: 'Error al autenticar',
					text: err.error.error.message
				});
				console.log(err.error);
			});
	}

}
