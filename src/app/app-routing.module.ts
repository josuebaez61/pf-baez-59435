import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './features/auth/auth.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';

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
    loadChildren: () =>
      import('./features/auth/auth.module').then((m) => m.AuthModule),
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
    loadChildren: () =>
      import('./features/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
  },
  {
    path: '**',
    redirectTo: 'auth',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
