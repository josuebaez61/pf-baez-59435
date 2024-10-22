import { Injectable } from '@angular/core';
import { AuthData } from '../../features/auth/models';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { User } from '../../features/dashboard/users/models';
import { generateRandomString } from '../../shared/utils';
import { Router } from '@angular/router';

const FAKE_USER: User = {
  email: 'admin@mail.com',
  firstName: 'admin',
  lastName: 'admin',
  id: generateRandomString(4),
  createdAt: new Date(),
  password: '123456',
};

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _authUser$ = new BehaviorSubject<null | User>(null);

  public authUser$ = this._authUser$.asObservable();

  constructor(private router: Router) {}

  login(data: AuthData): Observable<User> {
    if (data.email != FAKE_USER.email || data.password != FAKE_USER.password) {
      return throwError(() => new Error('Los datos son invalidos'));
    }

    this._authUser$.next(FAKE_USER);

    return of(FAKE_USER);
  }

  logout() {
    this._authUser$.next(null);
    this.router.navigate(['auth', 'login']);
  }
}
