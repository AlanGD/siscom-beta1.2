import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-recover',
  templateUrl: './recover.component.html',
  styleUrls: ['./recover.component.scss'],
  providers: [UserService]
})
export class RecoverComponent implements OnInit {

  public user: User;
  public alertPasswordRecovery;

  validatingForm: FormGroup;

  constructor(private _userService:UserService, private router: Router) {
    this.user = new User('','','','','','','','','','','ROLE_USER');
   }

  ngOnInit() {
    this.validatingForm = new FormGroup({
      correo: new FormControl(null, [Validators.required, Validators.email])
    });
  }
  get correo() { return this.validatingForm.get('correo'); }
 
  
  onSubmitPasswordRecovery() {
    console.log(this.user);

    this._userService.passwordRecovery(this.user).subscribe(
      response => {

        let user = response.user;
        this.user = user;

        if(!user._id){
          this.alertPasswordRecovery = 'Error al enviar';
        }else{
          this.alertPasswordRecovery = '';
          this.user = new User('','','','','','','','','','','ROLE_USER');
          alert('Por favor, revise su E-Mail: '+ user.correo +' para continuar con el proceso.');
          this.router.navigate(['/login']);
        }

      },
      error => {
        var errorMessage = <any>error;

        if(errorMessage != null){
           this.alertPasswordRecovery = error.error.message;
           console.log(error);
        }
      }
    );
  }

}
