import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [UserService]
})
export class RegisterComponent implements OnInit {

  public user: User;
  public identity;
  public token;
  public alertRegister;

  validatingForm: FormGroup;


  constructor( private _userService:UserService, private router: Router) {
    this.user = new User('','','','','','','','','','','ROLE_USER');
   }
  ngOnInit() {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();

    if (!this.identity) {
     
    } else if (this.identity.role == 'ROOT') {
     this.router.navigate(['root']); 
    } else if (this.identity.role == 'ROLE_CLIENT') {
      this.router.navigate(['']);
    } else if (this.identity.role == 'ROLE_SELLER') {
     this.router.navigate(['seller']);
   } else if (this.identity.role == 'ROLE_CATALOG_MANAGER') {
     this.router.navigate(['catalog-manager']);
   }

    this.validatingForm = new FormGroup({
      nombre: new FormControl(null, [Validators.required]),
      apellido: new FormControl (null, [Validators.required]),
      fecha_nacimiento: new FormControl (null, [Validators.required]),
      telefono: new FormControl (null, [Validators.required]),
      escuela: new FormControl (null, [Validators.required]),
      sucursal: new FormControl (null, [Validators.required]),
      confirm_password: new FormControl (null, [Validators.required]),
      correo: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required])
    });

    console.log(this.identity);
    console.log(this.token);

  }
  get nombre() {return this.validatingForm.get('nombre');}
  get apellido() {return this.validatingForm.get('apellido');}
  get fecha_nacimiento() {return this.validatingForm.get('fecha_nacimiento')}
  get escuela() {return this.validatingForm.get('escuela')}
  get sucursal() {return this.validatingForm.get('sucursal')}
  get confirm_password() {return this.validatingForm.get('confirm_password')}
  get correo() { return this.validatingForm.get('correo'); }
  get password() { return this.validatingForm.get('password'); }




  onSubmitRegister(){
    console.log(this.user);

    this._userService.register(this.user).subscribe(
      response => {

        let user = response.user;
        this.user = user;

        if(!user._id){
          this.alertRegister = 'Error al registrarse';
        }else{
          this.alertRegister = 'El registro se ha realizado correctamente';
          this.user = new User('','','','','','','','','','','ROLE_USER');
          alert('registro exitoso')
         /*  Swal.fire({
            position: 'top-end',
            type: 'success',
            title: 'El registro se ha realizado correctamente',
            showConfirmButton: false,
            timer: 1900
          }) */
         
          this.router.navigate(['/login']);
        }
      },
      error => {
        var errorMessage = <any>error;

        if(errorMessage != null){
           this.alertRegister = error.error.message;
           console.log(error);
        }
      }
    );  
  }


  }



