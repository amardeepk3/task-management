import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { authGuard } from './guard/auth.guard';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { RegisterComponent } from './components/register/register.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'tasks', component: TaskListComponent, canActivate: [authGuard]},
  { path: 'tasks/add', component: TaskFormComponent, canActivate: [authGuard]},
  { path: 'tasks/edit/:id', component: TaskFormComponent, canActivate: [authGuard]},


];
