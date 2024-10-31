import { Injectable } from '@angular/core';
import { AuthData } from '../../features/auth/models';
import { BehaviorSubject, map, Observable, of, throwError } from 'rxjs';
import { User } from '../../features/dashboard/users/models';
import { generateRandomString } from '../../shared/utils';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Store } from '@ngrx/store';
import { AuthActions } from '../../store/actions/auth.actions';
import { selectAutheticatedUser } from '../../store/selectors/auth.selectors';

@Injectable({ providedIn: 'root' })
export class AuthService {
  // private _authUser$ = new BehaviorSubject<null | User>(null);
  public authUser$: Observable<User | null>;

  private baseURL = environment.apiBaseURL;

  constructor(
    private router: Router,
    private httpClient: HttpClient,
    private store: Store
  ) {
    this.authUser$ = this.store.select(selectAutheticatedUser);
  }

  private handleAuthentication(users: User[]): User | null {
    if (!!users[0]) {
      this.store.dispatch(AuthActions.setAuthenticatedUser({ user: users[0] }));
      localStorage.setItem('token', users[0].token);
      return users[0];
    } else {
      return null;
    }
  }

  login(data: AuthData): Observable<User> {
    return this.httpClient
      .get<User[]>(
        `${this.baseURL}/users?email=${data.email}&password=${data.password}`
      )
      .pipe(
        map((users) => {
          const user = this.handleAuthentication(users);
          if (user) {
            return user;
          } else {
            throw new Error('Los datos son invalidos');
          }
        })
      );
  }

  logout() {
    this.store.dispatch(AuthActions.unsetAuthenticatedUser());
    localStorage.removeItem('token');
    this.router.navigate(['auth', 'login']);
  }

  verifyToken(): Observable<boolean> {
    return this.httpClient
      .get<User[]>(
        `${this.baseURL}/users?token=${localStorage.getItem('token')}`
      )
      .pipe(
        map((users) => {
          const user = this.handleAuthentication(users);
          return !!user;
        })
      );
  }
}
