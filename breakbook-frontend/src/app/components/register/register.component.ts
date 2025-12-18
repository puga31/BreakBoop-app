import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  loading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    //Definimos los campos del formulario de registro con validaciones
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: ['USER']
    });
  }

  get f() {
    return this.registerForm.controls;
  }
//Validamos si el formulario es valido
  onSubmit() {
    if (this.registerForm.invalid) {
      this.errorMessage = 'Por favor, completa el formulario correctamente.';
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    this.userService.addUser(this.registerForm.value).subscribe({
      next: () => {
        this.loading = false;
        alert('Usuario registrado con éxito');
        this.router.navigate(['/login']);
      },
      error: err => {
        this.loading = false;
        this.errorMessage = 'Error al registrar usuario.';
        console.error(err);
      }
    });
  }
}
