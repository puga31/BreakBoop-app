import { Routes } from '@angular/router';
import { IndexComponent } from './components/index/index.component';
import { UsersComponent } from './components/users/users.component';
import { LayoutComponent } from './components/layout/layout.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { MovesComponent } from './pages/moves/moves.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CreateRoundComponent } from './components/create-round/create-round.component'; 

const routeConfig: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: IndexComponent },
      { path: 'login', component: LoginComponent, title: 'BreakBook - Login' },
      { path: 'register', component: RegisterComponent, title: 'BreakBook - Registro' },
      { path: 'users', component: UsersComponent },
      { path: 'add-user', component: AddUserComponent },
      { path: 'moves', component: MovesComponent, title: 'BreakBook - Lista de movimientos' },
      { path: 'crear-ronda', component: CreateRoundComponent, title: 'BreakBook - Crear Ronda' }  
    ],
  },
];

export default routeConfig;
