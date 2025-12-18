// Nuestro componente para añadir usuarios
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';  

@Component({
  selector: 'app-add-user',
  standalone: true,  
  imports: [SharedModule],  
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    //Con esto cremos el formulario
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  ngOnInit(): void {}

  addUser() {
    console.log("Método addUser llamado");
    if (this.form.invalid) {
      return;
    }

    this.userService.addUser(this.form.value).subscribe(
      (user) => {
        console.log('Usuario agregado:', user);
        this.router.navigate(['/users']);  
      },
      (error) => {
        console.error('Error al agregar el usuario:', error);
      }
    );
  }
}
