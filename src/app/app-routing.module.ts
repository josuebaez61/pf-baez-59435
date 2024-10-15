import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './features/auth/auth.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { AuthModule } from './features/auth/auth.module';

const routes: Routes = [
  // {
  //   path: 'auth/login',
  //   component: LoginComponent,
  // },
  // {
  //   path: 'auth/register',
  //   component: RegisterComponent,
  // },
  {
    path: 'auth',
    component: AuthComponent,
    loadChildren: () => AuthModule,
    // loadChildren: () =>
    //   import('./features/auth/auth.module').then((m) => m.AuthModule),
    // children: [
    //   {
    //     path: 'login', // /auth/login
    //     component: LoginComponent,
    //   },
    //   {
    //     path: 'register', // /auth/register
    //     component: RegisterComponent,
    //   },
    // ],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  // {
  //   path: '**',
  //   redirectTo: 'auth',
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
