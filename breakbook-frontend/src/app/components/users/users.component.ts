import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';


declare var bootstrap: any;

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    SharedModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  form: FormGroup;
  users: any[] = [];
  dataSource = new MatTableDataSource<any>();
  displayedColumns = ['iduser', 'name', 'email', 'role', 'actions'];
  roles = ['USER', 'ADMIN'];
  isAdmin = false;

  showAddUser = false;  // <-- Controlamos la opci´´on de mostrar/ocultar formulario

  private userIdToDelete: number | null = null;
  private deleteModal: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['USER', Validators.required]
    });
  }

  ngOnInit(): void {
    this.isAdmin = this.authService.getCurrentUser()?.role === 'ADMIN';
    if (this.isAdmin) {
      this.loadUsers();
    }

    // Con esto iniciamos un modal de bootstrap
    const modalElement = document.getElementById('confirmDeleteModal');
    if (modalElement) {
      this.deleteModal = new bootstrap.Modal(modalElement);
    }
  }

  loadUsers() {
    this.userService.getAll().subscribe({
      next: data => {
        this.users = data;
        this.dataSource.data = data;

        // Configura filtro para las columnas
        this.dataSource.filterPredicate = (data, filter) => {
          const searchStr = filter.toLowerCase();
          return data.name.toLowerCase().includes(searchStr) ||
                 data.email.toLowerCase().includes(searchStr) ||
                 data.role.toLowerCase().includes(searchStr);
        };

        // Asignar paginator y sort para la tabla
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        });
      },
      error: err => {
        console.error('Error al cargar los usuarios:', err);
        this.snackBar.open('Error al cargar los usuarios', 'Cerrar', { duration: 3000 });
      }
    });
  }

  addUser() {
    if (this.form.invalid) {
      this.snackBar.open('Por favor, complete correctamente el formulario.', 'Cerrar', { duration: 3000 });
      return;
    }

    this.userService.addUser(this.form.value).subscribe({
      next: user => {
        this.users.push(user);
        this.dataSource.data = [...this.users];
        this.snackBar.open('Usuario agregado correctamente', 'Cerrar', { duration: 3000 });
        this.form.reset({ role: 'USER' });

        this.showAddUser = false;  
      },
      error: err => {
        console.error('Error al agregar el usuario:', err);
        this.snackBar.open('Hubo un problema al agregar el usuario.', 'Cerrar', { duration: 3000 });
      }
    });
  }

  // Filtra la tabla según el texrto que escribamos
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDeleteModal(userId: number) {
    this.userIdToDelete = userId;
    this.deleteModal?.show();
  }

  closeModal() {
    this.deleteModal?.hide();
    this.userIdToDelete = null;
  }

  confirmDelete() {
    if (this.userIdToDelete === null) return;

    this.userService.deleteUser(this.userIdToDelete).subscribe({
      next: () => {
        this.users = this.users.filter(user => user.iduser !== this.userIdToDelete);
        this.dataSource.data = [...this.users];
        this.snackBar.open('Usuario eliminado', 'Cerrar', { duration: 3000 });
        this.closeModal();
      },
      error: err => {
        console.error('Error al eliminar el usuario:', err);
        this.snackBar.open('Error al eliminar el usuario', 'Cerrar', { duration: 3000 });
        this.closeModal();
      }
    });
  }
}
