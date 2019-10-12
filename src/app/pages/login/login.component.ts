import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {

  public title = "LOGIN";
  public user: User;
  public identity;
  public token;
  public errorMessage;

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
      correo: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required])
    });

    console.log(this.identity);
    console.log(this.token);
  }

  get correo() { return this.validatingForm.get('correo'); }
  get password() { return this.validatingForm.get('password'); }

  public onSubmit(){
    console.log(this.user);

    // Conseguir los datos del usuario identificado
    this._userService.signup(this.user).subscribe(
      response => {
        let identity = response.user;
        this.identity = identity;

        if(!this.identity._id){
          alert('El usuario no está correctamente identificado');
        }else{
          // Crear elemento en el localstorage para tener al usuario en sesión
          localStorage.setItem('identity', JSON.stringify(identity));
       
          // Conseguir el token para enviarlo a cada petición http
          this._userService.signup(this.user, 'true').subscribe(
           response => {
             let token = response.token;
             this.token = token;
    
             if(this.token.length <= 0){
               alert('El token no se ha generado correctamente');
             }else{
               // Crear elemento en el localstorage para tener token disponible
               localStorage.setItem('token', token);

               console.log(token);
               console.log(identity);
               this.router.navigate(['']);
             }
           },
           error => {
             var errorMessage = <any>error;
    
             if(errorMessage != null){
               this.errorMessage = error.error.message;
               console.log(error);
             }
           }
         );
        }
      },
      error => {
        var errorMessage = <any>error;

        if(errorMessage != null){
          this.errorMessage = error.error.message;
          console.log(error);
        }
      }
    );
  }

  logout(){
    localStorage.removeItem('identity');
    localStorage.removeItem('token');
    localStorage.clear();
    this.identity = null;
    this.token = null;
  }
}
