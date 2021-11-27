import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ServicioUsuarioService } from '../services/servicio-usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formularioLogin: FormGroup;
  formularioRegistro: FormGroup;
  constructor(private servicio:ServicioUsuarioService, private router: Router) { 

    this.formularioLogin=new FormGroup({
      emailUser: new FormControl('', [Validators.required,Validators.email,Validators.minLength(8)]),
      passUser: new FormControl('',[Validators.required, Validators.minLength(2),Validators.maxLength(20)]),
    });

    this.formularioRegistro=new FormGroup({
      nameUser1: new FormControl('', [Validators.required,Validators.minLength(2),Validators.maxLength(20)]),
      emailUser1: new FormControl('', [Validators.required,Validators.email,Validators.minLength(8)]),
      passUser1: new FormControl('',[Validators.required, Validators.minLength(2),Validators.maxLength(20)]),
    });
  }

  validarUsuario()
  {
    this.servicio.getUser(this.formularioLogin.value['emailUser']).subscribe((datos)=> {
      try {
        if (this.formularioLogin.value['passUser']==datos['usuario']['contrasena']){
          this.router.navigate(['/home'])
        }
      } catch (error) {
      }
    })
  }
 
  registrarUsuario(){

    var usuario={
      nombre: this.formularioRegistro.value['nameUser1'],
      mail: this.formularioRegistro.value['emailUser1'],
      contrasena: this.formularioRegistro.value['passUser1']
    }

    try {
      this.servicio.postUser(usuario).subscribe((datos)=> {
        console.log("funcionó")
    })
    } catch (error) {
      console.log("usuario existente")
    }

  }
  


  ngOnInit() {
  }

}
