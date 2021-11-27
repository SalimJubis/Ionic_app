import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ServicioUsuarioService } from '../services/servicio-usuario.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  formularioActualizar: FormGroup;
  formularioEliminar: FormGroup;
  constructor(private servicio:ServicioUsuarioService, private router: Router) { 

    this.formularioActualizar=new FormGroup({
      nameUser: new FormControl('', [Validators.required,Validators.minLength(2),Validators.maxLength(20)]),
      emailUser: new FormControl('', [Validators.required,Validators.email,Validators.minLength(8)]),
      passUser: new FormControl('',[Validators.required, Validators.minLength(2),Validators.maxLength(20)])
    });
    this.formularioEliminar=new FormGroup({
      emailUser1: new FormControl('', [Validators.required,Validators.email,Validators.minLength(8)]),
    });
  }

  actualizarUsuario(){
    var usuario={
      nombre: this.formularioActualizar.value['nameUser'],
      mail: this.formularioActualizar.value['emailUser'],
      contrasena: this.formularioActualizar.value['passUser']
    }
    this.servicio.putUser(this.formularioActualizar.value['emailUser'],usuario).subscribe((datos)=> {
      console.log("funcionó")
    })
  }

  eliminarUsuario(){
    var usuario={
      nombre: this.formularioActualizar.value['nameUser'],
      mail: this.formularioActualizar.value['emailUser'],
      contrasena: this.formularioActualizar.value['passUser']
    }
    this.servicio.deleteUser(this.formularioEliminar.value['emailUser1']).subscribe((datos)=> {
      console.log("funcionó")
    })

  }

  ngOnInit() {
  }
}

